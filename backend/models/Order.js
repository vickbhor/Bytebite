const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  // ✅ Token Number (1, 2, 3...) handle karne ke liye Number type best hai
  tokenNumber: { 
    type: Number, 
    required: true, 
    unique: true 
  }, 
  
  // ✅ Customer ka naam bhi store kar lete hain
  customerName: { 
    type: String, 
    default: "Guest" 
  },

  items: [{
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    // MongoDB _id handle karne ke liye optional field
    _id: String 
  }],

  totalAmount: { 
    type: Number, 
    required: true 
  },

  // ✅ Status canteen ke hisab se set kiya
  status: { 
    type: String, 
    enum: ['Pending Payment', 'Paid', 'Preparing', 'Ready', 'Completed'],
    default: 'Pending Payment' 
  },

  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Order', orderSchema);