const mongoose = require('mongoose');

// Database connection URL
const MONGODB_URI = 'mongodb+srv://shubhampatil:Shubham5538@cluster0.jcw5klj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Export mongoose connection
module.exports = mongoose.connection;
