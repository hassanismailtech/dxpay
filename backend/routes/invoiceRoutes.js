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

module.exports = router;