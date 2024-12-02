const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const productController = require('../controllers/productController');

router.post('/products', authenticateToken, productController.createProduct); 
router.get('/products', authenticateToken, productController.getAllProducts);
router.post('/products', productController.createProduct);
router.get('/products', productController.getProducts);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
