const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    cartItems: Array,
    amount: String,
    status: String,
    paymentMode: String,
    isPaid: Boolean,
    createdAt: Date
});

const orderModel = mongoose.model('order', orderSchema);

module.exports = orderModel;