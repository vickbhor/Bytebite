const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

router.get('/', async (req, res) => {
    try {
        const menu = await MenuItem.find();
        res.json(menu);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/seed', async (req, res) => {
    const dummyData = [
        { name: "Samosa (2 pcs)", price: 20, category: "Snacks", isAvailable: true, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80" },
        { name: "Veg Biryani", price: 80, category: "Meals", isAvailable: true, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80" },
        { name: "Cold Coffee", price: 45, category: "Beverages", isAvailable: true, image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&q=80" },
        { name: "Paneer Tikka", price: 90, category: "Meals", isAvailable: true, image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&q=80" },
        { name: "Masala Chai", price: 15, category: "Beverages", isAvailable: true, image: "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?w=600&q=80" },
        { name: "Veggie Wrap", price: 60, category: "Snacks", isAvailable: true, image: "https://images.unsplash.com/photo-1626844131082-256783844137?w=600&q=80" }
    ];
    
    try {
        await MenuItem.deleteMany({});
        await MenuItem.insertMany(dummyData);
        res.json({ message: "✅ Magic successful! Menu database mein add ho gaya." });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;