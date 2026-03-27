const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// POST: Create a new diagnostic test
router.post('/', async (req, res) => {
  const { name, price, provider_id } = req.body;

  if (!name || !price || !provider_id) {
    return res.status(400).json({ error: 'name, price, and provider_id are required.' });
  }

  try {
    const query = `
      INSERT INTO Tests (name, price, provider_id)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const result = await pool.query(query, [name, price, provider_id]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating test:', error);
    res.status(500).json({ error: 'Internal server error while creating test.' });
  }
});

// GET: Fetch all available tests (Simbiat will need this for the UI catalog!)
router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT t.id, t.name, t.price, p.name AS provider_name 
      FROM Tests t
      JOIN Providers p ON t.provider_id = p.id
      ORDER BY t.id ASC
    `;
    const result = await pool.query(query);
    
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching tests:', error);
    res.status(500).json({ error: 'Internal server error while fetching tests.' });
  }
});

module.exports = router;