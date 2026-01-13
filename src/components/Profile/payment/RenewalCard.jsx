import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBell, FaPaypal } from 'react-icons/fa';
import PayPalPayment from './PayPalPayment';

const RenewalCard = ({ userData, delay }) => {
  const [showPayment, setShowPayment] = useState(false);

  const handleRenewalSuccess = () => {
    setShowPayment(false);
    // في المستقبل: تحديث بيانات المستخدم من Laravel API
    console.log('Renewal successful!');
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

            <motion.button
              className="renew-btn"
              onClick={() => setShowPayment(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaPaypal />
              جددي الآن عبر PayPal
            </motion.button>

            <p className="auto-renewal-note">
              سيتم تجديد اشتراكك تلقائياً قبل انتهائه بـ 3 أيام
            </p>
          </motion.div>
        ) : (
          <motion.div
            className="payment-section"
            key="payment"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <PayPalPayment
              amount={(userData.price * 0.9).toFixed(2)}
              onSuccess={handleRenewalSuccess}
              onCancel={() => setShowPayment(false)}
            />

            <motion.button
              className="cancel-btn"
              onClick={() => setShowPayment(false)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              إلغاء
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RenewalCard;