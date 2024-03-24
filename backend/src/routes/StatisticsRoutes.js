// backend/src/routes/StatisticsRoutes.js

const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction'); // Update the import path

// Get statistics for the selected month
router.get('/statistics', async (req, res) => {
  try {
    const { month } = req.query;

    // Calculate statistics based on the selected month
    const totalSaleAmount = await Transaction.aggregate([
      {
        $match: { dateOfSale: { $regex: new RegExp(month, 'i') } }
      },
      {
        $group: {
          _id: null,
          totalSaleAmount: { $sum: '$price' }
        }
      }
    ]);

    // Similar aggregation queries for other statistics

    res.status(200).json({
      totalSaleAmount: totalSaleAmount.length ? totalSaleAmount[0].totalSaleAmount : 0
      // Add other statistics here
    });
  } catch (error) {
    console.error('Error calculating statistics:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;
