import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import config from '../../config';

const RazorpayCheckout = ({ booking, onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [orderId, setOrderId] = useState(null);
  
  // Calculate the total amount (base price + GST + convenience fee)
  const basePrice = booking?.price || 500; // Default price if not provided
  const gstAmount = basePrice * 0.18;
  const convenienceFee = 25;
  const totalAmount = basePrice + gstAmount + convenienceFee;
  
  // Load Razorpay script when component mounts
  useEffect(() => {
    const loadRazorpayScript = () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      
      script.onload = () => {
        setScriptLoaded(true);
      };
      
      script.onerror = () => {
        console.error('Razorpay script loading failed');
        onError?.('Failed to load payment gateway');
      };
      
      document.body.appendChild(script);
    };
    
    loadRazorpayScript();
    
    return () => {
      // Cleanup script if needed
      const script = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
      if (script) {
        // Don't remove the script as it might be used by other components
        // Just maintain the scriptLoaded state when component unmounts
      }
    };
  }, []);
  
  // Create order when booking is confirmed
  useEffect(() => {
    const createOrder = async () => {
      if (!booking?.id || !scriptLoaded) return;
      
      setLoading(true);
      
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('Please log in to make a payment');
        }
        
        const response = await fetch(`${config.apiUrl}/payments/create-order`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            bookingId: booking.id,
            amount: Math.round(totalAmount) // Amount in whole numbers
          })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Failed to create payment order');
        }
        
        setOrderId(data.order.id);
      } catch (error) {
        console.error('Error creating payment order:', error);
        onError?.(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    createOrder();
  }, [booking, scriptLoaded, totalAmount]);
  
  const handlePayNow = () => {
    if (!scriptLoaded || !orderId) return;
    
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    const options = {
      key: process.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_key_id', // Use environment variable
      amount: Math.round(totalAmount * 100), // Amount in paise
      currency: 'INR',
      name: 'Sportomic',
      description: `Booking for ${booking.sport} at ${booking.venueName}`,
      order_id: orderId,
      handler: function(response) {
        handlePaymentSuccess(response);
      },
      prefill: {
        name: user.name || booking.userName || '',
        email: user.email || '',
        contact: user.phone || ''
      },
      notes: {
        bookingId: booking.id.toString(),
        venue: booking.venueName,
        sport: booking.sport,
        date: booking.date,
        time: booking.time
      },
      theme: {
        color: '#34d399' // Green color for the Razorpay modal
      }
    };
    
    try {
      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
      
      razorpayInstance.on('payment.failed', function(response) {
        onError?.('Payment failed: ' + response.error.description);
      });
    } catch (error) {
      console.error('Razorpay error:', error);
      onError?.('Failed to initialize payment');
    }
  };
  
  const handlePaymentSuccess = async (response) => {
    try {
      const token = localStorage.getItem('token');
      
      const verifyResponse = await fetch(`${config.apiUrl}/payments/verify-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
          bookingId: booking.id
        })
      });
      
      const data = await verifyResponse.json();
      
      if (!verifyResponse.ok) {
        throw new Error(data.message || 'Payment verification failed');
      }
      
      onSuccess?.(data);
    } catch (error) {
      console.error('Error verifying payment:', error);
      onError?.(error.message);
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Payment Details</h3>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Base Price:</span>
          <span className="font-medium">₹{basePrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">GST (18%):</span>
          <span className="font-medium">₹{gstAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Convenience Fee:</span>
          <span className="font-medium">₹{convenienceFee.toFixed(2)}</span>
        </div>
        <div className="border-t border-gray-200 pt-3 flex justify-between">
          <span className="text-gray-800 font-semibold">Total Amount:</span>
          <span className="font-bold text-gray-800">₹{totalAmount.toFixed(2)}</span>
        </div>
      </div>
      
      <button
        onClick={handlePayNow}
        disabled={loading || !scriptLoaded || !orderId}
        className={`w-full py-3 px-4 rounded-lg font-medium text-white flex items-center justify-center ${
          loading || !scriptLoaded || !orderId
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700'
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Initializing Payment...
          </span>
        ) : (
          <span className="flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Pay Now ₹{totalAmount.toFixed(2)}
          </span>
        )}
      </button>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">Secured payment by Razorpay</p>
        <div className="flex justify-center mt-2">
          <img src="https://razorpay.com/assets/razorpay-logo.svg" alt="Razorpay" className="h-5" />
        </div>
        <div className="flex justify-center space-x-2 mt-3">
          <img src="https://razorpay.com/build/browser/static/visa.61f3cef7.svg" alt="Visa" className="h-5" />
          <img src="https://razorpay.com/build/browser/static/mastercard.0ab4dfd3.svg" alt="Mastercard" className="h-5" />
          <img src="https://razorpay.com/build/browser/static/rupay.2c55975a.svg" alt="Rupay" className="h-5" />
          <img src="https://razorpay.com/build/browser/static/upi.91fdcb17.svg" alt="UPI" className="h-5" />
        </div>
      </div>
    </div>
  );
};

export default RazorpayCheckout;
