import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPaypal, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import Swal from 'sweetalert2';

const PaymentModal = ({ plan, onClose, onSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState('confirm'); // confirm, processing, success

  const handlePayment = async () => {
    setIsProcessing(true);
    setStep('processing');

    try {
      // هنا سيتم إنشاء طلب PayPal عبر Laravel API
      // const response = await axios.post('/api/paypal/create-payment', {
      //   plan_id: plan.id,
      //   amount: plan.price,
      //   currency: 'USD'
      // });
      // window.location.href = response.data.approval_url;

      // محاكاة عملية الدفع
      setTimeout(() => {
        setStep('success');
        
        setTimeout(() => {
          Swal.fire({
            title: 'مرحباً بك! 🎉',
            text: 'تم تفعيل اشتراكك بنجاح',
            icon: 'success',
            confirmButtonText: 'ابدأ الآن',
            confirmButtonColor: '#E91E63',
            iconColor: '#E91E63'
          }).then(() => {
            onSuccess();
          });
        }, 1500);
      }, 2000);

    } catch (error) {
      setIsProcessing(false);
      setStep('confirm');
      
      Swal.fire({
        title: 'فشل الدفع',
        text: 'حدث خطأ أثناء معالجة الدفع. يرجى المحاولة مرة أخرى',
        icon: 'error',
        confirmButtonText: 'حسناً',
        confirmButtonColor: '#E91E63'
      });
    }
  };

  const discount = plan.id === 'premium' ? 0.1 : plan.id === 'vip' ? 0.15 : 0;
  const finalPrice = (plan.price * (1 - discount)).toFixed(2);

  return (
    <AnimatePresence>
      <motion.div 
        className="payment-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="payment-modal"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {step === 'confirm' && (
            <>
              <div className="modal-header">
                <h2>تأكيد الاشتراك</h2>
                <button className="close-button" onClick={onClose}>
                  <FaTimes />
                </button>
              </div>

              <div className="modal-body">
                <div className="plan-summary">
                  <div className="summary-header">
                    <span className="plan-icon">{plan.icon}</span>
                    <div>
                      <h3>{plan.name}</h3>
                      <p>{plan.subtitle}</p>
                    </div>
                  </div>

                  <div className="pricing-details">
                    <div className="price-row">
                      <span>السعر الأصلي:</span>
                      <span className={discount > 0 ? 'original-price' : 'price'}>
                        ${plan.price}
                      </span>
                    </div>
                    
                    {discount > 0 && (
                      <>
                        <div className="price-row discount-row">
                          <span>الخصم ({(discount * 100)}%):</span>
                          <span className="discount">-${(plan.price * discount).toFixed(2)}</span>
                        </div>
                        <div className="price-row total-row">
                          <span>المجموع:</span>
                          <span className="final-price">${finalPrice}</span>
                        </div>
                      </>
                    )}

                    <div className="duration-info">
                      <FaCheckCircle />
                      <span>صالح لمدة {plan.duration}</span>
                    </div>
                  </div>
                </div>

                <div className="payment-info">
                  <div className="info-item">
                    <FaExclamationTriangle />
                    <p>سيتم تحويلك إلى صفحة PayPal الآمنة</p>
                  </div>
                  <div className="info-item">
                    <FaCheckCircle />
                    <p>جميع المعاملات مشفرة ومحمية</p>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button 
                  className="cancel-button"
                  onClick={onClose}
                >
                  إلغاء
                </button>
                <button 
                  className="paypal-button"
                  onClick={handlePayment}
                  disabled={isProcessing}
                >
                  <FaPaypal />
                  الدفع عبر PayPal
                </button>
              </div>
            </>
          )}

          {step === 'processing' && (
            <div className="processing-state">
              <div className="spinner-large"></div>
              <h3>جاري معالجة الدفع...</h3>
              <p>يرجى الانتظار ولا تغلق هذه النافذة</p>
            </div>
          )}

          {step === 'success' && (
            <div className="success-state">
              <motion.div 
                className="success-icon"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <FaCheckCircle />
              </motion.div>
              <h3>تم الدفع بنجاح!</h3>
              <p>جاري تفعيل اشتراكك...</p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PaymentModal;