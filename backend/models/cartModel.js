const mongoose = require('mongoose');


const cartSchema = new mongoose.Schema({
    cartItem: Object
});

const cartModel = mongoose.model('cart', cartSchema);

module.exports = cartModel;