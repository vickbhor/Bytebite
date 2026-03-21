const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ CORS Configuration
// Development ke liye localhost allow, production mein FRONTEND_URL env variable use hoga
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// ✅ Middlewares
app.use(express.json());

// ✅ Routes connect karna
const menuRoutes = require('./routes/menu');
const orderRoutes = require('./routes/orders');

app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);

// ✅ MongoDB Database Connection
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/bytebite';

mongoose.connect(mongoURI)
    .then(() => console.log("✅ MongoDB Connected Successfully!"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});