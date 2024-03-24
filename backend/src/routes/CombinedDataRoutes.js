// backend/src/routes/CombinedDataRoutes.js

const express = require('express');
const router = express.Router();
const axios = require('axios');

// Fetch data from all the APIs and combine responses
router.get('/combineddata', async (req, res) => {
  try {
    const { month } = req.query;

    // Fetch data from each API endpoint
    const [transactionsResponse, statisticsResponse, barChartDataResponse, pieChartDataResponse] = await Promise.all([
      axios.get(`http://localhost:5000/api/transactions?month=${month}`),
      axios.get(`http://localhost:5000/api/statistics?month=${month}`),
      axios.get(`http://localhost:5000/api/barchart?month=${month}`),
      axios.get(`http://localhost:5000/api/piechart?month=${month}`)
    ]);

    // Combine responses into a single object
    const combinedData = {
      transactions: transactionsResponse.data,
      statistics: statisticsResponse.data,
      barChartData: barChartDataResponse.data,
      pieChartData: pieChartDataResponse.data
    };

    res.status(200).json(combinedData);
  } catch (error) {
    console.error('Error fetching combined data:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;
