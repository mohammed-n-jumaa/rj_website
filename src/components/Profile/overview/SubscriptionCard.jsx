import { motion } from 'framer-motion';
import { FaDollarSign, FaCheckCircle } from 'react-icons/fa';

const SubscriptionCard = ({ userData, delay }) => {
  return (
    <motion.div
      className="subscription-card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
    >
      <div className="card-header">
        <h3>Subscription Details</h3>
        <FaDollarSign className="header-icon" />
      </div>

      <div className="subscription-details">
        <div className="detail-row">
          <span className="detail-label">Program Price</span>
          <span className="detail-value price">${userData.price}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Duration</span>
          <span className="detail-value">{userData.duration}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Start Date</span>
          <span className="detail-value">{userData.startDate}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">End Date</span>
          <span className="detail-value">{userData.endDate}</span>
        </div>
        <div className="detail-row status">
          <span className="detail-label">Payment Status</span>
          <span className="payment-status paid">
            <FaCheckCircle /> Paid
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default SubscriptionCard;