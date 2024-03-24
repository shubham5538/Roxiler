// backend/src/routes/PieChartRoutes.js

const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction'); // Update the import path

// API to find unique categories and the number of items from each category for the selected month
router.get('/piechart', async (req, res) => {
  try {
    const { month } = req.query;

    // Aggregate data to find unique categories and their counts
    const categoryCounts = await Transaction.aggregate([
      { $match: { dateOfSale: { $regex: new RegExp(month, 'i') } } },
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    res.status(200).json(categoryCounts);
  } catch (error) {
    console.error('Error generating pie chart data:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;
