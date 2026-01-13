import { motion } from 'framer-motion';
import { FaCheckCircle, FaClock, FaPaypal, FaCalendarAlt } from 'react-icons/fa';

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
        <h3>حالة الاشتراك</h3>
        {isPaid ? (
          <FaCheckCircle className="status-icon paid" />
        ) : (
          <FaClock className="status-icon pending" />
        )}
      </div>
      
      <div className="payment-details">
        <div className="detail-row">
          <span className="detail-label">البرنامج</span>
          <span className="detail-value">{userData.program}</span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">المبلغ</span>
          <span className="detail-value amount">${userData.price}</span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">المدة</span>
          <span className="detail-value">{userData.duration}</span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">تاريخ البدء</span>
          <span className="detail-value">
            <FaCalendarAlt /> {userData.startDate}
          </span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">تاريخ الانتهاء</span>
          <span className="detail-value">
            <FaCalendarAlt /> {userData.endDate}
          </span>
        </div>
        
        <div className="detail-row highlight">
          <span className="detail-label">الأيام المتبقية</span>
          <span className={`detail-value days-left ${isExpiringSoon ? 'warning' : ''}`}>
            {daysUntilExpiry} يوم
          </span>
        </div>
        
        <div className="detail-row status">
          <span className="detail-label">حالة الدفع</span>
          <span className={`status-badge ${isPaid ? 'paid' : 'pending'}`}>
            <FaPaypal />
            {isPaid ? 'مدفوع عبر PayPal' : 'في انتظار الدفع'}
          </span>
        </div>
      </div>

      {isExpiringSoon && (
        <motion.div 
          className="expiry-warning"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.3 }}
        >
          <FaClock />
          <p>اشتراكك على وشك الانتهاء! جددي الآن للاستمرار</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PaymentStatusCard;