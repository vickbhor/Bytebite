const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 🚀 FIXED CORS Configuration (Ye Vercel ko block nahi hone dega)
app.use(cors({
    origin: '*', // Iska matlab duniya ke kisi bhi kone (ya Vercel) se request aaye, allow kar do
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middlewares
app.use(express.json());

// 🚀 Nayi APIs ko connect kar rahe hain
const menuRoutes = require('./routes/menu');
const orderRoutes = require('./routes/orders');

// Frontend in links par request bhejega
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);

// MongoDB Database Connection (Updated for Cloud/Atlas)
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/bytebite';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("✅ MongoDB Connected Successfully!");
}).catch((err) => {
    console.log("❌ MongoDB Connection Error:", err);
});

// Server Start karna
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});