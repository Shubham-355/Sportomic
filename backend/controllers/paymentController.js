const Razorpay = require('razorpay');
const crypto = require('crypto');
const Payment = require('../models/Payment');
const Booking = require('../models/Booking');

// Initialize Razorpay with environment variables
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create a payment order
exports.createOrder = async (req, res) => {
  try {
    const { bookingId, amount } = req.body;
    
    // Basic validation
    if (!bookingId || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Booking ID and amount are required'
      });
    }
    
    // Find the booking to ensure it exists and belongs to the user
    const booking = await Booking.findById(bookingId);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized: This booking does not belong to you'
      });
    }
    
    // Create a Razorpay order
    const options = {
      amount: Math.round(amount * 100), // Amount in smallest currency unit (paise)
      currency: 'INR',
      receipt: `booking_${bookingId}`,
      payment_capture: 1 // Auto-capture the payment
    };
    
    const order = await razorpay.orders.create(options);
    
    // Create a payment document in the database
    const payment = await Payment.create({
      user: req.user.id,
      booking: bookingId,
      amount: amount,
      currency: 'INR',
      razorpayOrderId: order.id,
      status: 'created'
    });
    
    res.status(200).json({
      success: true,
      order,
      payment
    });
  } catch (error) {
    console.error('Create payment order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create payment order',
      error: error.message
    });
  }
};

// Verify payment after completion
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, bookingId } = req.body;
    
    // Verify signature
    const body = razorpayOrderId + '|' + razorpayPaymentId;
    
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');
    
    const isAuthentic = expectedSignature === razorpaySignature;
    
    if (!isAuthentic) {
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed: Invalid signature'
      });
    }
    
    // Update payment record
    const payment = await Payment.findOneAndUpdate(
      { razorpayOrderId },
      {
        razorpayPaymentId,
        razorpaySignature,
        status: 'captured'
      },
      { new: true }
    );
    
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment record not found'
      });
    }
    
    // Update booking payment status
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { paymentStatus: 'completed' },
      { new: true }
    );
    
    res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      payment,
      booking
    });
  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Payment verification failed',
      error: error.message
    });
  }
};

// Get payment history for current user
exports.getPaymentHistory = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user.id })
      .populate('booking')
      .sort('-createdAt');
    
    res.status(200).json({
      success: true,
      count: payments.length,
      payments
    });
  } catch (error) {
    console.error('Get payment history error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch payment history',
      error: error.message
    });
  }
};
