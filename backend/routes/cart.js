const express = require('express');
const { addToCart, getCartItems, deleteCart, updateCart } = require('../controllers/cartController');
const router = express.Router();

router.route('/cart').post(addToCart);
router.route('/cart').get(getCartItems);
router.route('/cart/:id').delete(deleteCart);
router.route('/cart').put(updateCart);

module.exports = router;