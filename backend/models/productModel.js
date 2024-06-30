const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price: String,
    description: String,
    ratings: Number,
    images: [
        {
            image: String
        }
    ],
    category: String,
    discount: Number,
    stock: Number,
    numOfReviews: String,
    createdAt: Date
});


const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;