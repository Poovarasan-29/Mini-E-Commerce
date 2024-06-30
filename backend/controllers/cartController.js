const cartModel = require('../models/cartModel');

// POST - /api/v1/cart
exports.addToCart = async (req, res) => {

    const cartItem = req.body
    const cart = cartModel.create({ cartItem })

    res.json({
        success: true,
        cart
    });
}


// GET - /api/v1/cart
exports.getCartItems = async (req, res) => {
    const cart = await cartModel.find({});
    res.json({
        cart
    })
}

// DELETE - /api/v1/cart:id
exports.deleteCart = async (req, res) => {
    const deleted = await cartModel.deleteOne({ 'cartItem.product._id': req.params.id });
    const cart = await cartModel.find({});
    res.json({
        cart
    })
}

exports.updateCart = async (req, res) => {
    const item = req.body;
    const cartItem = await cartModel.find({ 'cartItem.product._id': item.product._id });
    await cartModel.updateOne({ 'cartItem.product._id': item.product._id }, { $set: { 'cartItem.qty': item.qty } })
}