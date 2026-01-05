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
        <h3>تفاصيل الاشتراك</h3>
        <FaDollarSign className="header-icon" />
      </div>
      <div className="subscription-details">
        <div className="detail-row">
          <span className="detail-label">سعر البرنامج</span>
          <span className="detail-value price">${userData.price}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">المدة</span>
          <span className="detail-value">{userData.duration}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">تاريخ البدء</span>
          <span className="detail-value">{userData.startDate}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">تاريخ الانتهاء</span>
          <span className="detail-value">{userData.endDate}</span>
        </div>
        <div className="detail-row status">
          <span className="detail-label">حالة الدفع</span>
          <span className={`payment-status ${userData.paymentStatus}`}>
            <FaCheckCircle /> تم الدفع
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default SubscriptionCard;