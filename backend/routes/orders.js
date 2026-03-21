const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.post('/', async (req, res) => {
    try {
        const { items, totalAmount } = req.body;
        
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const tokenId = `#BB-${randomNum}`;

        const newOrder = new Order({ tokenId, items, totalAmount });
        await newOrder.save();

        res.status(201).json(newOrder);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;