// backend/src/routes/BarChartRoutes.js

const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction'); // Update the import path

// API endpoint to generate data for a bar chart showing price ranges and the number of items in each range for the selected month
router.get('/barchart', async (req, res) => {
  try {
    const { month } = req.query;

    // Aggregate data to calculate price range and number of items in each range
    const priceRanges = [
      { min: 0, max: 100 },
      { min: 101, max: 200 },
      { min: 201, max: 300 },
      { min: 301, max: 400 },
      { min: 401, max: 500 },
      { min: 501, max: 600 },
      { min: 601, max: 700 },
      { min: 701, max: 800 },
      { min: 801, max: 900 },
      { min: 901, max: Infinity }
    ];

    const barChartData = [];

    for (const range of priceRanges) {
      const count = await Transaction.countDocuments({
        dateOfSale: { $regex: new RegExp(month, 'i') },
        price: { $gte: range.min, $lte: range.max }
      });
      barChartData.push({ range: `${range.min}-${range.max}`, count });
    }

    res.status(200).json(barChartData);
  } catch (error) {
    console.error('Error generating bar chart data:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;
