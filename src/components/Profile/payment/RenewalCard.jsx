import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBell, FaPaypal, FaUniversity } from 'react-icons/fa';
import PayPalPayment from './PayPalPayment';
import BankTransferPayment from './BankTransferPayment';

const RenewalCard = ({ userData, delay }) => {
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('paypal'); // Default to 'paypal'

  const handleRenewalSuccess = () => {
    setShowPayment(false);
    setPaymentMethod('paypal');
    // In the future: Update user data from Laravel API
    console.log('Renewal successful!');
  };

  const handleContinue = () => {
    setShowPayment(true);
  };

  const handleBack = () => {
    if (showPayment) {
      setShowPayment(false);
    }
  };

  const daysLeft = userData.daysLeft;
  const isExpiringSoon = daysLeft <= 7;
  const totalAmount = (userData.price * 0.9).toFixed(2);

  return (
    <motion.div 
      className="renewal-card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
    >
      <div className="card-header">
        <h3>Renew Subscription</h3>
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
              <p>Your subscription will expire on <strong>{userData.endDate}</strong></p>
              <p className="days-remaining">
                <strong className={isExpiringSoon ? 'warning' : ''}>{daysLeft}</strong> days remaining
              </p>
              <p className="reminder">
                💡 Renew your subscription now to get <strong>10%</strong> discount
              </p>
            </div>

            <div className="renewal-pricing">
              <div className="price-item">
                <span>Original Price:</span>
                <span className="original-price">${userData.price}</span>
              </div>
              <div className="price-item discount">
                <span>Discount (10%):</span>
                <span className="discount-amount">-${(userData.price * 0.1).toFixed(2)}</span>
              </div>
              <div className="price-item total">
                <span>Total:</span>
                <span className="total-price">${totalAmount}</span>
              </div>
            </div>

            {/* Simple Payment Method Toggle Buttons */}
            <div className="payment-method-section">
              <label className="section-label">Choose Payment Method:</label>
              
              <div className="payment-toggle-buttons">
                <button
                  className={`payment-toggle-btn paypal ${paymentMethod === 'paypal' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('paypal')}
                >
                  <FaPaypal className="btn-icon" />
                  <div className="btn-content">
                    <span className="btn-title">PayPal</span>
                    <span className="btn-subtitle">Instant & secure payment</span>
                  </div>
                </button>

                <button
                  className={`payment-toggle-btn bank ${paymentMethod === 'bank' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('bank')}
                >
                  <FaUniversity className="btn-icon" />
                  <div className="btn-content">
                    <span className="btn-title">Bank Transfer</span>
                    <span className="btn-subtitle">Within 24 hours</span>
                  </div>
                </button>
              </div>
            </div>

            <motion.button
              className="renew-btn"
              onClick={handleContinue}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Continue to Payment
            </motion.button>

          
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
                amount={totalAmount}
                onSuccess={handleRenewalSuccess}
                onCancel={handleBack}
              />
            ) : (
              <BankTransferPayment
                amount={totalAmount}
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