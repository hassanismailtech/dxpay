const pool = require('./config/db');

const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import modular routers
const orderRoutes = require('./routes/orderRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
// const testRoutes = require('./routes/testRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Mount the router to a specific base path
// Any route defined in orderRoutes.js will automatically be prefixed with '/api/orders'
app.use('/api/orders', orderRoutes);
app.use('/api/invoices', invoiceRoutes);
// app.use('/api/tests', testRoutes);

// --- Core API Routes ---

// Create Diagnostic Test
app.post('/api/tests', (req, res) => {
    // TODO: Implement test creation logic
    res.status(201).json({ message: 'Test created' });
});

// Create Diagnostic Order
app.post('/api/orders', (req, res) => {
    // Expected response: order_id, total_amount
    res.status(201).json({ order_id: 'mock_order_123', total_amount: 0 });
});

// Generate Invoice
app.post('/api/invoices', (req, res) => {
    // Expected response: invoice_id, payment_link
    res.status(201).json({ invoice_id: 'mock_inv_123', payment_link: 'http://mocklink.com' });
});

// Verify Payment
app.get('/api/payment/verify', (req, res) => {
    // Expected response: payment_status
    res.status(200).json({ payment_status: 'success' });
});

// Get Dashboard Data
app.get('/api/dashboard', (req, res) => {
    // Expected response: total_revenue, number_of_tests, transactions
    res.status(200).json({ total_revenue: 0, number_of_tests: 0, transactions: [] });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));