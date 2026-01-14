import { motion } from 'framer-motion';
import { FaCheckCircle, FaClock, FaPaypal, FaCalendarAlt, FaExclamationTriangle } from 'react-icons/fa';

const PaymentStatusCard = ({ userData, delay }) => {
  const isPaid = userData.paymentStatus === 'paid';
  const daysUntilExpiry = userData.daysLeft;
  const isExpiringSoon = daysUntilExpiry <= 7;

  return (
    <motion.div
      className="payment-status-card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
    >
      <div className="card-header">
        <h3>Subscription Status</h3>
        {isPaid ? (
          <FaCheckCircle className="status-icon paid" />
        ) : (
          <FaClock className="status-icon pending" />
        )}
      </div>

      <div className="payment-details">
        <div className="payment-item">
          <span>Program</span>
          <span>{userData.program}</span>
        </div>

        <div className="payment-item">
          <span>Amount</span>
          <span className="amount">${userData.price}</span>
        </div>

        <div className="payment-item">
          <span>Duration</span>
          <span>{userData.duration}</span>
        </div>

        <div className="payment-item">
          <span>Start Date</span>
          <span>
            <FaCalendarAlt /> {userData.startDate}
          </span>
        </div>

        <div className="payment-item">
          <span>End Date</span>
          <span>
            <FaCalendarAlt /> {userData.endDate}
          </span>
        </div>

        <div className="payment-item highlight">
          <span>Days Remaining</span>
          <span className={`days-left ${isExpiringSoon ? 'warning' : ''}`}>
            {daysUntilExpiry} days
          </span>
        </div>

        <div className="payment-item status">
          <span>Payment Status</span>
          <span className={`status-badge ${isPaid ? 'paid' : 'pending'}`}>
            <FaCheckCircle />
            {isPaid ? 'Paid via PayPal' : 'Awaiting Payment'}
          </span>
        </div>
      </div>

      {isExpiringSoon && (
        <div className="expiry-warning">
          <FaExclamationTriangle />
          <p>
            Your subscription is about to expire! Renew now to continue.
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default PaymentStatusCard;