import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaypal, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import './PayPalPayment.scss';

const PayPalPayment = ({ amount, onSuccess, onCancel }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayPalPayment = async () => {
    setIsProcessing(true);

    try {
      // في المستقبل: إنشاء طلب دفع PayPal عبر Laravel API
      // const response = await axios.post('/api/paypal/create-payment', {
      //   amount: amount,
      //   currency: 'USD',
      //   description: 'تجديد اشتراك برنامج التدريب'
      // });
      
      // const paypalUrl = response.data.approval_url;
      // window.location.href = paypalUrl;

      // محاكاة عملية الدفع
      setTimeout(() => {
        setIsProcessing(false);
        
        Swal.fire({
          title: 'نجح الدفع! 🎉',
          text: 'تم تجديد اشتراكك بنجاح',
          icon: 'success',
          confirmButtonText: 'رائع',
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
        title: 'فشل الدفع',
        text: 'حدث خطأ أثناء معالجة الدفع. يرجى المحاولة مرة أخرى',
        icon: 'error',
        confirmButtonText: 'حسناً',
        confirmButtonColor: '#E91E63'
      });
    }
  };

  return (
    <div className="paypal-payment">
      <div className="payment-info">
        <div className="amount-display">
          <span className="amount-label">المبلغ المطلوب:</span>
          <span className="amount-value">${amount}</span>
        </div>
        
        <div className="payment-note">
          <FaExclamationTriangle />
          <p>سيتم تحويلك إلى صفحة PayPal الآمنة لإتمام عملية الدفع</p>
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
            <span>جاري المعالجة...</span>
          </>
        ) : (
          <>
            <FaPaypal className="paypal-icon" />
            <span>الدفع عبر PayPal</span>
          </>
        )}
      </motion.button>

      <div className="payment-security">
        <FaCheckCircle />
        <p>الدفع آمن ومحمي بواسطة PayPal</p>
      </div>
    </div>
  );
};

export default PayPalPayment;