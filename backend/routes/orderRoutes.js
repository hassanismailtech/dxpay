const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.post('/', async (req, res) => {
    const { patient_name, test_ids } = req.body;

    // Basic validation
    if (!patient_name || !test_ids || !Array.isArray(test_ids) || test_ids.length === 0) {
        return res.status(400).json({ error: 'Patient name and an array of test_ids are required.' });
    }

    // Grab a dedicated client from the pool for our transaction
    const client = await pool.connect();

    try {
        await client.query('BEGIN'); // Start the transaction

        // 1. Fetch the prices and provider info for the requested tests
        // Using ANY($1::int[]) is a clean way to query an array of IDs in Postgres
        const testQuery = `SELECT id, price, provider_id FROM Tests WHERE id = ANY($1::int[])`;
        const testResult = await client.query(testQuery, [test_ids]);

        if (testResult.rows.length !== test_ids.length) {
            throw new Error('One or more invalid test IDs provided.');
        }

        // 2. Calculate the aggregated bill total
        const total_amount = testResult.rows.reduce((sum, test) => sum + parseFloat(test.price), 0);

        // 3. Create the parent Order record
        // Generating a simple unique ID for the hackathon
        const order_id = `ORD-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;

        const orderQuery = `
      INSERT INTO Orders (id, patient_name, total_amount)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
        await client.query(orderQuery, [order_id, patient_name, total_amount]);

        // 4. Create the individual Order Items (connecting the tests to the order)
        for (const test of testResult.rows) {
            const itemQuery = `
        INSERT INTO OrderItems (order_id, test_id, provider_id, price)
        VALUES ($1, $2, $3, $4)
      `;
            await client.query(itemQuery, [order_id, test.id, test.provider_id, test.price]);
        }

        await client.query('COMMIT'); // Everything succeeded, save the data!

        // 5. Return the response exactly as the PRD requests
        res.status(201).json({
            order_id: order_id,
            total_amount: total_amount
        });

    } catch (error) {
        await client.query('ROLLBACK'); // Something broke, undo everything
        console.error('Transaction Error:', error);
        res.status(500).json({ error: error.message || 'Internal server error while creating order.' });
    } finally {
        client.release(); // Always return the client back to the pool
    }
});

module.exports = router;