import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaypal, FaCheckCircle, FaExclamationTriangle, FaLock } from 'react-icons/fa';
import Swal from 'sweetalert2';

const PayPalPayment = ({ amount, onSuccess, onCancel }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayPalPayment = async () => {
    setIsProcessing(true);

    try {
      // In the future: Create PayPal payment via Laravel API
      // const response = await axios.post('/api/paypal/create-payment', {
      //   amount: amount,
      //   currency: 'USD',
      //   description: 'Training program subscription renewal'
      // });
      
      // const paypalUrl = response.data.approval_url;
      // window.location.href = paypalUrl;

      // Simulating payment process
      setTimeout(() => {
        setIsProcessing(false);
        
        Swal.fire({
          title: 'Payment Successful! 🎉',
          text: 'Your subscription has been renewed successfully',
          icon: 'success',
          confirmButtonText: 'Great',
          confirmButtonColor: '#0070ba',
          iconColor: '#0070ba'
        });

        if (onSuccess) {
          onSuccess();
        }
      }, 2000);

    } catch (error) {
      setIsProcessing(false);
      console.error('PayPal payment error:', error);
      
      Swal.fire({
        title: 'Payment Failed',
        text: 'An error occurred while processing payment. Please try again',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#E91E63'
      });
    }
  };

  return (
    <div className="paypal-payment">
      <div className="payment-info">
        <div className="amount-display">
          <span className="amount-label">Amount Due:</span>
          <span className="amount-value">${amount}</span>
        </div>

        <div className="payment-note">
          <FaExclamationTriangle />
          <p>
            You will be redirected to PayPal's secure page to complete the payment
          </p>
        </div>
      </div>

      <motion.button
        className={`paypal-button ${isProcessing ? 'processing' : ''}`}
        onClick={handlePayPalPayment}
        disabled={isProcessing}
        whileHover={!isProcessing ? { scale: 1.02 } : {}}
        whileTap={!isProcessing ? { scale: 0.98 } : {}}
      >
        {isProcessing ? (
          <>
            <div className="spinner"></div>
            Processing...
          </>
        ) : (
          <>
            <FaPaypal className="paypal-icon" />
            Pay with PayPal
          </>
        )}
      </motion.button>

      <div className="payment-security">
        <FaLock />
        <span>Secure payment protected by PayPal</span>
      </div>
    </div>
  );
};

export default PayPalPayment;