import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBell, FaPaypal, FaUniversity } from 'react-icons/fa';
import PayPalPayment from './PayPalPayment';
import BankTransferPayment from './BankTransferPayment';

const RenewalCard = ({ userData, delay }) => {
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null); // 'paypal' or 'bank'

  const handleRenewalSuccess = () => {
    setShowPayment(false);
    setPaymentMethod(null);
    // في المستقبل: تحديث بيانات المستخدم من Laravel API
    console.log('Renewal successful!');
  };

  const handleSelectPaymentMethod = (method) => {
    setPaymentMethod(method);
    setShowPayment(true);
  };

  const handleBack = () => {
    if (showPayment && paymentMethod) {
      setShowPayment(false);
      setPaymentMethod(null);
    }
  };

  const daysLeft = userData.daysLeft;
  const isExpiringSoon = daysLeft <= 7;

  return (
    <motion.div 
      className="renewal-card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
    >
      <div className="card-header">
        <h3>تجديد الاشتراك</h3>
        <FaBell className={`header-icon ${isExpiringSoon ? 'warning' : ''}`} />
      </div>
      
      <AnimatePresence mode="wait">
        {!showPayment ? (
          <motion.div 
            className="renewal-content"
            key="renewal-info"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="renewal-info">
              <p>سينتهي اشتراكك في <strong>{userData.endDate}</strong></p>
              <p className="days-remaining">
                متبقي <strong className={isExpiringSoon ? 'warning' : ''}>{daysLeft}</strong> يوم
              </p>
              <p className="reminder">
                💡 جددي اشتراكك الآن للحصول على خصم <strong>10%</strong>
              </p>
            </div>

            <div className="renewal-pricing">
              <div className="price-item">
                <span>السعر الأصلي:</span>
                <span className="original-price">${userData.price}</span>
              </div>
              <div className="price-item discount">
                <span>الخصم:</span>
                <span className="discount-amount">-${(userData.price * 0.1).toFixed(2)}</span>
              </div>
              <div className="price-item total">
                <span>المجموع:</span>
                <span className="total-price">${(userData.price * 0.9).toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="payment-methods">
              <h4>اختاري طريقة الدفع:</h4>
              
              <div className="methods-grid">
                <motion.button
                  className="method-button paypal"
                  onClick={() => handleSelectPaymentMethod('paypal')}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <FaPaypal className="method-icon" />
                  <div className="method-info">
                    <span className="method-name">PayPal</span>
                    <span className="method-desc">دفع فوري وآمن</span>
                  </div>
                </motion.button>

                <motion.button
                  className="method-button bank"
                  onClick={() => handleSelectPaymentMethod('bank')}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <FaUniversity className="method-icon" />
                  <div className="method-info">
                    <span className="method-name">تحويل بنكي</span>
                    <span className="method-desc">خلال 24 ساعة</span>
                  </div>
                </motion.button>
              </div>
            </div>

           
          </motion.div>
        ) : (
          <motion.div
            className="payment-section"
            key="payment"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {paymentMethod === 'paypal' ? (
              <PayPalPayment
                amount={(userData.price * 0.9).toFixed(2)}
                onSuccess={handleRenewalSuccess}
                onCancel={handleBack}
              />
            ) : (
              <BankTransferPayment
                amount={(userData.price * 0.9).toFixed(2)}
                onSuccess={handleRenewalSuccess}
                onCancel={handleBack}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RenewalCard;