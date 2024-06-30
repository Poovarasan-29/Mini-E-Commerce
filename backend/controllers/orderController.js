const orderModel = require('../models/orderModel');
const productModel = require('../models/productModel');
const cartModel = require('../models/cartModel');


//POST Create Order = /api/v1/order
exports.createOrder = async (req, res) => {

    const cartItems = req.body.map((item) => {
        return item.cartItem
    });

    const amount = Number(cartItems.reduce((acc, item) => (acc + item.product.price * item.qty), 0)).toFixed(2);

    const status = 'pending';
    const paymentMode = "Online Mode";
    const isPaid = false;

    const order = await orderModel.create({ cartItems, amount, status, paymentMode, isPaid });

    cartItems.forEach(async (item) => {
        const product = await productModel.findById(item.product._id);
        await cartModel.deleteMany({});
        product.stock -= item.qty
        await product.save();
    })


    res.json({
        order
    })
}


exports.getOrders = async (req, res) => {
    const orders = await orderModel.find({});
    res.json({
        orders
    })
}

exports.deleteOrder = async (req, res) => {
    const ordersCancelled = await orderModel.findById(req.params.id)
    await orderModel.deleteOne({ _id: req.params.id });

    ordersCancelled.cartItems.map(async (item) => {
        const stock = await productModel.findOne({ _id: item.product._id }, { stock: 1 })
        await productModel.updateOne({ _id: item.product._id }, { $set: { stock: stock.stock + item.qty } })
    })

    const orders = await orderModel.find({});
    res.json({
        orders
    })
}