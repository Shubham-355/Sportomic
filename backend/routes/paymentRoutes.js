const express = require('express');
const router = express.Router();
const { createOrder, verifyPayment, getPaymentHistory } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

// Payment routes
router.post('/create-order', protect, createOrder);
router.post('/verify-payment', protect, verifyPayment);
router.get('/history', protect, getPaymentHistory);

module.exports = router;
