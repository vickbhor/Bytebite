const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors()); 
app.use(express.json());

// 🚀 Nayi APIs ko connect kar rahe hain
const menuRoutes = require('./routes/menu');
const orderRoutes = require('./routes/orders');

// Frontend in links par request bhejega
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);

// MongoDB Database Connection
mongoose.connect('mongodb://127.0.0.1:27017/bytebite', {
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
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});