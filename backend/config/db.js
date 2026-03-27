const { Pool } = require('pg');
require('dotenv').config();

// The Hybrid Setup: 
// If DATABASE_URL exists (Render/Neon), use it with SSL.
// Otherwise, fall back to the individual local variables.
const poolConfig = process.env.DATABASE_URL 
  ? { 
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false } // Crucial for Neon cloud connections
    }
  : {
      user: process.env.PGUSER,
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      port: process.env.PGPORT,
    };

const pool = new Pool(poolConfig);

// Test the connection immediately (Keeping the original logs)
pool.on('connect', () => {
    console.log('Connected to the PostgreSQL database successfully.');
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

module.exports = pool;