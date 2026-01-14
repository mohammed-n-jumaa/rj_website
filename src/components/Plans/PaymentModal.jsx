import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPaypal, FaUniversity, FaCheckCircle, FaExclamationTriangle, FaArrowRight } from 'react-icons/fa';
import Swal from 'sweetalert2';
import BankTransferPayment from './BankTransferPayment';

const PaymentModal = ({ plan, onClose, onSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState('method'); // method, paypal-confirm, bank-transfer, processing, success
  const [paymentMethod, setPaymentMethod] = useState(null);

  const handleSelectMethod = (method) => {
    setPaymentMethod(method);
    if (method === 'paypal') {
      setStep('paypal-confirm');
    } else if (method === 'bank') {
      setStep('bank-transfer');
    }
  };

  const handlePayPalPayment = async () => {
    setIsProcessing(true);
    setStep('processing');

    try {
      // هنا سيتم إنشاء طلب PayPal عبر Laravel API
      // const response = await axios.post('/api/paypal/create-payment', {
      //   plan_id: plan.id,
      //   amount: finalPrice,
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
      setStep('paypal-confirm');
      
      Swal.fire({
        title: 'فشل الدفع',
        text: 'حدث خطأ أثناء معالجة الدفع. يرجى المحاولة مرة أخرى',
        icon: 'error',
        confirmButtonText: 'حسناً',
        confirmButtonColor: '#E91E63'
      });
    }
  };

  const handleBankTransferSuccess = () => {
    setStep('success');
    
    setTimeout(() => {
      Swal.fire({
        title: 'تم الإرسال بنجاح! 🎉',
        html: `
          <p>تم استلام طلب الاشتراك الخاص بك</p>
          <p style="color: #666; font-size: 0.9rem; margin-top: 1rem;">
            سيتم مراجعة التحويل وتفعيل اشتراكك خلال 24 ساعة
          </p>
        `,
        icon: 'success',
        confirmButtonText: 'رائع',
        confirmButtonColor: '#E91E63'
      }).then(() => {
        onSuccess();
      });
    }, 1000);
  };

  const handleBack = () => {
    if (step === 'paypal-confirm' || step === 'bank-transfer') {
      setStep('method');
      setPaymentMethod(null);
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
          {/* Method Selection */}
          {step === 'method' && (
            <>
              <div className="modal-header">
                <h2>اختيار طريقة الدفع</h2>
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

                {/* Payment Methods */}
                <div className="payment-methods-selection">
                  <h3>اختاري طريقة الدفع:</h3>
                  
                  <div className="methods-grid">
                    <motion.button
                      className="method-card paypal-method"
                      onClick={() => handleSelectMethod('paypal')}
                      whileHover={{ scale: 1.03, y: -5 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <FaPaypal className="method-icon" />
                      <h4>PayPal</h4>
                      <p>دفع فوري وآمن</p>
                      <span className="method-badge">موصى به</span>
                    </motion.button>

                    <motion.button
                      className="method-card bank-method"
                      onClick={() => handleSelectMethod('bank')}
                      whileHover={{ scale: 1.03, y: -5 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <FaUniversity className="method-icon" />
                      <h4>تحويل بنكي</h4>
                      <p>التفعيل خلال 24 ساعة</p>
                      <span className="method-badge">متاح</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* PayPal Confirmation */}
          {step === 'paypal-confirm' && (
            <>
              <div className="modal-header">
                <div className="header-with-back">
                  <button className="back-button" onClick={handleBack}>
                    <FaArrowRight />
                  </button>
                  <h2>تأكيد الدفع - PayPal</h2>
                </div>
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
                    <div className="price-row total-row">
                      <span>المجموع:</span>
                      <span className="final-price">${finalPrice}</span>
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
                  onClick={handleBack}
                >
                  رجوع
                </button>
                <button 
                  className="paypal-button"
                  onClick={handlePayPalPayment}
                  disabled={isProcessing}
                >
                  <FaPaypal />
                  الدفع عبر PayPal
                </button>
              </div>
            </>
          )}

          {/* Bank Transfer */}
          {step === 'bank-transfer' && (
            <>
              <div className="modal-header">
                <div className="header-with-back">
                  <button className="back-button" onClick={handleBack}>
                    <FaArrowRight />
                  </button>
                  <h2>التحويل البنكي</h2>
                </div>
                <button className="close-button" onClick={onClose}>
                  <FaTimes />
                </button>
              </div>

              <div className="modal-body">
                <BankTransferPayment
                  amount={finalPrice}
                  planName={plan.name}
                  onSuccess={handleBankTransferSuccess}
                  onCancel={handleBack}
                />
              </div>
            </>
          )}

          {/* Processing State */}
          {step === 'processing' && (
            <div className="processing-state">
              <div className="spinner-large"></div>
              <h3>جاري معالجة الدفع...</h3>
              <p>يرجى الانتظار ولا تغلق هذه النافذة</p>
            </div>
          )}

          {/* Success State */}
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
              <h3>تم بنجاح!</h3>
              <p>جاري تفعيل اشتراكك...</p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PaymentModal;