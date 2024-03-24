// StatisticsController.js

const Transaction = require('../models/Transaction');

// Function to calculate statistics for the selected month
exports.calculateStatistics = async (req, res) => {
    try {
        const { month } = req.query;

        // Calculate total sale amount for the selected month
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

        // Calculate total number of sold items for the selected month
        const totalSoldItems = await Transaction.countDocuments({
            dateOfSale: { $regex: new RegExp(month, 'i') },
            sold: true
        });

        // Calculate total number of not sold items for the selected month
        const totalNotSoldItems = await Transaction.countDocuments({
            dateOfSale: { $regex: new RegExp(month, 'i') },
            sold: false
        });

        res.status(200).json({
            totalSaleAmount: totalSaleAmount.length ? totalSaleAmount[0].totalSaleAmount : 0,
            totalSoldItems,
            totalNotSoldItems
        });
    } catch (error) {
        console.error('Error calculating statistics:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
