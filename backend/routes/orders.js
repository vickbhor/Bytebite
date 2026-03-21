const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Create a new order
router.post('/', async (req, res) => {
    const order = new Order({
        items: req.body.items,
        totalAmount: req.body.totalAmount,
        customerName: req.body.customerName,
        tokenNumber: Math.floor(100 + Math.random() * 900) // 3-digit token
    });

    try {
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;