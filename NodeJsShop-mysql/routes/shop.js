const path = require('path');

const express = require('express');
const isAuth = require('../middleware/is-auth');


const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:Id', shopController.getProduct);

router.get('/cart',isAuth, shopController.getCart);

router.post('/cart',isAuth, shopController.postCart);

router.post('/cart-delete-item',isAuth, shopController.deleteCartItem);

router.get('/orders',isAuth, shopController.getOrders);

router.post('/create-order',isAuth, shopController.postOrder);

router.get('/checkout',isAuth, shopController.getCheckout);

module.exports = router;
