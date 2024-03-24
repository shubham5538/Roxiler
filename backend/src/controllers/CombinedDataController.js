// CombinedDataController.js

const { generateBarChartData } = require('./BarChartController');
const { generatePieChartData } = require('./PieChartController');
const { calculateStatistics } = require('./StatisticsController');

// Function to fetch data from all APIs, combine responses, and send a final combined JSON response
exports.getCombinedData = async (req, res) => {
    try {
        const { month } = req.query;

        // Fetch data from individual APIs
        const barChartData = await generateBarChartData({ query: { month } });
        const pieChartData = await generatePieChartData({ query: { month } });
        const statisticsData = await calculateStatistics({ query: { month } });

        // Combine responses into a final JSON object
        const combinedData = {
            barChartData,
            pieChartData,
            statisticsData
        };

        res.status(200).json(combinedData);
    } catch (error) {
        console.error('Error fetching combined data:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
