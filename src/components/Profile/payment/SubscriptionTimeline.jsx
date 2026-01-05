import { motion } from 'framer-motion';
import { FaCalendarAlt, FaCheckCircle, FaClock } from 'react-icons/fa';

const SubscriptionTimeline = ({ userData, delay }) => {
  return (
    <motion.div 
      className="subscription-timeline"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
    >
      <div className="card-header">
        <h3>مدة الاشتراك</h3>
        <FaCalendarAlt className="header-icon" />
      </div>
      <div className="timeline">
        <div className="timeline-item active">
          <div className="timeline-icon">
            <FaCheckCircle />
          </div>
          <div className="timeline-content">
            <h5>بداية الاشتراك</h5>
            <span>{userData.startDate}</span>
          </div>
        </div>
        <div className="timeline-item upcoming">
          <div className="timeline-icon">
            <FaClock />
          </div>
          <div className="timeline-content">
            <h5>نهاية الاشتراك</h5>
            <span>{userData.endDate}</span>
            <span className="days-left">{userData.daysLeft} يوم متبقي</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SubscriptionTimeline;