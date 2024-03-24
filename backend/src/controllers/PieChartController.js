// PieChartController.js

const Transaction = require('../models/Transaction');

// Function to find unique categories and count of items from each category for the selected month
exports.generatePieChartData = async (req, res) => {
    try {
        const { month } = req.query;

        // Aggregate pipeline to group transactions by category and count the number of items in each category
        const pieChartData = await Transaction.aggregate([
            {
                $match: { dateOfSale: { $regex: new RegExp(month, 'i') } }
            },
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 }
                }
            }
        ]);

        // Format the data for pie chart
        const formattedData = pieChartData.reduce((acc, curr) => {
            acc[curr._id] = curr.count;
            return acc;
        }, {});

        res.status(200).json(formattedData);
    } catch (error) {
        console.error('Error generating pie chart data:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
