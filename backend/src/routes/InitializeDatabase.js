// backend/src/routes/InitializeDatabase.js

const express = require('express');
const router = express.Router();
const axios = require('axios');
const Transaction = require('../models/Transaction'); // Update the import path

// Initialize database with seed data from third-party API
router.post('/initialize', async (req, res) => {
  try {
    // Fetch data from third-party API
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const transactions = response.data;

    // Insert transactions into the database
    await Transaction.insertMany(transactions);

    res.status(200).json({ message: 'Database initialized successfully.' });
  } catch (error) {
    console.error('Error initializing database:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;
