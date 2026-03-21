const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  tokenId: { type: String, required: true, unique: true }, // Example: #BB-4092
  items: [{
    name: String,
    price: Number,
    quantity: Number
  }],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'Pending Payment' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);