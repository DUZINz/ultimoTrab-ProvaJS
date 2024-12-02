const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authenticateToken = require('../middleware/authenticateToken');

router.post('/products', authenticateToken, productController.createProduct); 
router.get('/products', authenticateToken, productController.getAllProducts);
router.post('/cart/add', cartController.addProductToCart);
router.delete('/cart/remove/:productId', cartController.removeProductFromCart);
router.get('/cart/:userId', cartController.getCartItems);

module.exports = router;
