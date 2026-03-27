// backend/routes/invoiceRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db');
// We will import the Interswitch Auth utility here if we need server-to-server calls later
// const { getInterswitchToken } = require('../utils/interswitchAuth');

router.post('/', async (req, res) => {
    const { order_id } = req.body;

    if (!order_id) {
        return res.status(400).json({ error: 'order_id is required.' });
    }

    try {
        // 1. Verify the order exists and get the total amount
        const orderQuery = `SELECT id, patient_name, total_amount FROM Orders WHERE id = $1`;
        const orderResult = await pool.query(orderQuery, [order_id]);

        if (orderResult.rows.length === 0) {
            return res.status(404).json({ error: 'Order not found.' });
        }

        const order = orderResult.rows[0];

        // 2. Generate a unique transaction reference (This acts as the Invoice ID)
        const transaction_reference = `TXN-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

        // 3. Insert the new transaction record into the database
        const txnQuery = `
      INSERT INTO Transactions (id, order_id, transaction_reference, amount, payment_status)
      VALUES ($1, $2, $3, $4, 'pending')
      RETURNING *;
    `;

        // We can use the transaction_reference as the primary ID for simplicity
        await pool.query(txnQuery, [transaction_reference, order.id, transaction_reference, order.total_amount]);

        // 4. Construct the payment link 
        // For the hackathon demo, this points to Simbiat's frontend checkout page, 
        // passing the transaction reference so her page knows what to charge via Interswitch.
        const frontendBaseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
        const payment_link = `${frontendBaseUrl}/pay/${transaction_reference}`;

        // 5. Return the expected PRD response
        res.status(201).json({
            invoice_id: transaction_reference,
            payment_link: payment_link,
            amount: order.total_amount, // Sending amount as a helpful extra for the frontend
            patient_name: order.patient_name
        });

    } catch (error) {
        console.error('Error generating invoice:', error);
        res.status(500).json({ error: 'Internal server error while generating invoice.' });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const query = `
            SELECT 
                t.id,
                t.amount,
                t.transaction_reference,
                o.patient_name,
                o.created_at,
                json_agg(json_build_object('name', ts.name, 'price', ts.price)) AS tests
            FROM Transactions t
            JOIN Orders o ON t.order_id = o.id
            JOIN OrderItems oi ON oi.order_id = o.id
            JOIN Tests ts ON ts.id = oi.test_id
            WHERE t.id = $1
            GROUP BY t.id, t.amount, t.transaction_reference, o.patient_name, o.created_at
        `;
        const result = await pool.query(query, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Invoice not found.' });
        }
        const row = result.rows[0];
        res.status(200).json({
            id: row.id,
            patient_name: row.patient_name,
            provider_name: 'Lagos General Hospital',
            invoice_number: row.transaction_reference,
            date: new Date(row.created_at).toLocaleDateString('en-NG', { 
                day: '2-digit', month: 'short', year: 'numeric' 
            }),
            tests: row.tests,
            subtotal: parseFloat(row.amount),
            total: parseFloat(row.amount)
        });
    } catch (error) {
        console.error('Error fetching invoice:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

module.exports = router;