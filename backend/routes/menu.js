const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

// ✅ GET all menu items
router.get('/', async (req, res) => {
    try {
        const menu = await MenuItem.find();
        res.json(menu);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ✅ Seed dummy data
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
        res.json({ message: "✅ Dummy menu data inserted successfully!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ✅ GET single menu item by ID
router.get('/:id', async (req, res) => {
    try {
        const item = await MenuItem.findById(req.params.id);
        if (!item) return res.status(404).json({ message: "Item not found" });
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ✅ POST new menu item
router.post('/', async (req, res) => {
    const menuItem = new MenuItem(req.body);
    try {
        const newItem = await menuItem.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// ✅ PUT update menu item
router.put('/:id', async (req, res) => {
    try {
        const updatedItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedItem) return res.status(404).json({ message: "Item not found" });
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// ✅ DELETE menu item
router.delete('/:id', async (req, res) => {
    try {
        const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ message: "Item not found" });
        res.json({ message: "Item deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;