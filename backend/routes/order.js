const express = require('express');
const { createOrder, getOrders, deleteOrder } = require('../controllers/orderController');
const router = express.Router();

router.route('/order').get(getOrders);
router.route('/order').post(createOrder);
router.route('/order/:id').delete(deleteOrder);

module.exports = router;