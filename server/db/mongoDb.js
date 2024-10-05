const mongoose = require('mongoose');
require('dotenv').config();

const connectToMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB database');
    } catch (err) {
        console.error('Error connecting to MongoDB database:', err.message);
    }
};


module.exports = {
    connectToMongo
};
