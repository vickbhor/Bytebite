const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

// Saara menu laane ke liye
router.get('/', async (req, res) => {
    try {
        const menu = await MenuItem.find();
        res.json(menu);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ✅ Database mein data daalne ke liye (Seed)
router.get('/seed', async (req, res) => {
    const dummyData = [
        { name: "Samosa (2 pcs)", price: 20, category: "Snacks", isAvailable: true, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600" },
        { name: "Veg Maggie", price: 40, category: "Snacks", isAvailable: true, image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=600" },
        { name: "Aloo Patties", price: 15, category: "Snacks", isAvailable: true, image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=600" },
        { name: "Paneer Sandwich", price: 50, category: "Snacks", isAvailable: true, image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600" },
        { name: "Veg Burger", price: 45, category: "Snacks", isAvailable: true, image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600" },
        { name: "Steam Momos (6 pcs)", price: 60, category: "Snacks", isAvailable: true, image: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=600" },
        { name: "Veg Biryani", price: 80, category: "Meals", isAvailable: true, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600" },
        { name: "Chole Bhature", price: 70, category: "Meals", isAvailable: true, image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=600" },
        { name: "Chocolate Shake", price: 60, category: "Beverages", isAvailable: true, image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600" },
        { name: "Masala Chai", price: 15, category: "Beverages", isAvailable: true, image: "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?w=600" },
        { name: "Cold Coffee", price: 45, category: "Beverages", isAvailable: true, image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600" }
    ];

    try {
        await MenuItem.deleteMany({});
        await MenuItem.insertMany(dummyData);
        res.json({ message: "✅ Magic successful! ByteBite menu is now Live and Tasty." });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;