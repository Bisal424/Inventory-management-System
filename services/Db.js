const mongoose = require('mongoose')
require('Dotenv').config();
const MONGO_URI = process.env.MONGO_URI;

mongoose.set('strictQuery', false);
const connectDB = async () => {
    try {
        mongoose.connect(MONGO_URI, { 
            useNewUrlParser: true,});
            console.log('MongoDB Connected...') 
        } catch (err) {
            console.error(err.message); 
            process.exit(1);
        }
    };

module.exports = connectDB;