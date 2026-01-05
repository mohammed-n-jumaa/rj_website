import { motion } from 'framer-motion';
import { FaBell } from 'react-icons/fa';

const RenewalCard = ({ userData, delay }) => {
  return (
    <motion.div 
      className="renewal-card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
    >
      <div className="card-header">
        <h3>تجديد الاشتراك</h3>
        <FaBell className="header-icon" />
      </div>
      <div className="renewal-content">
        <p>سينتهي اشتراكك في <strong>{userData.endDate}</strong></p>
        <p className="reminder">سنرسل لك تذكير قبل أسبوع من انتهاء الاشتراك</p>
        <motion.button
          className="renew-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          جددي الآن
        </motion.button>
      </div>
    </motion.div>
  );
};

export default RenewalCard;