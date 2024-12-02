const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/payment/credit-card', paymentController.processCreditCardPayment);
router.post('/payment/pix', paymentController.processPixPayment);
router.get('/payment/status/:transactionId', paymentController.getTransactionStatus);

module.exports = router;
