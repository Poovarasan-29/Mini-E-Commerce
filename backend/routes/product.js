const express = require('express');
const { getProducts, getSingleProduct, deleteProduct, addProduct } = require('../controllers/productController');
const router = express.Router();



router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);
router.route('/product/:id').delete(deleteProduct);
router.route('/products').post(addProduct);


module.exports = router;