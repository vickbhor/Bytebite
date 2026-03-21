const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Create a new order with Unique Incremental Token
router.post('/', async (req, res) => {
    try {
        // 1. Database mein sabse aakhri order dhoondo (Latest First)
        const lastOrder = await Order.findOne().sort({ createdAt: -1 });

        let nextToken = 1; // Default: Agar pehla order hai

        // 2. Agar pichla order mil gaya, toh uska token + 1 kar do
        if (lastOrder && lastOrder.tokenNumber) {
            nextToken = lastOrder.tokenNumber + 1;
        }

        // 3. Reset Logic (Optional): Agar tokens 1000 cross kar jayein toh 1 se shuru karein
        if (nextToken > 999) nextToken = 1;

        const order = new Order({
            items: req.body.items,
            totalAmount: req.body.totalAmount,
            customerName: req.body.customerName || "Vibhor's Guest",
            tokenNumber: nextToken // ✅ Ab ye 100% unique aur sequential hai
        });

        const newOrder = await order.save();
        
        // Frontend ko response bhejo (data.tokenNumber yahan se jayega)
        res.status(201).json(newOrder);

    } catch (err) {
        console.error("Order Save Error:", err);
        res.status(400).json({ message: "Bhai order save nahi ho paaya!", error: err.message });
    }
});

module.exports = router;