import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

const PaymentStatusCard = ({ userData, delay }) => {
  return (
    <motion.div 
      className="payment-status-card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
    >
      <div className="card-header">
        <h3>حالة الدفع</h3>
        <FaCheckCircle className="status-icon paid" />
      </div>
      <div className="payment-details">
        <div className="payment-item">
          <span>المبلغ المدفوع</span>
          <span className="amount">${userData.price}</span>
        </div>
        <div className="payment-item">
          <span>تاريخ الدفع</span>
          <span>01/01/2024</span>
        </div>
        <div className="payment-item">
          <span>طريقة الدفع</span>
          <span>تحويل بنكي</span>
        </div>
        <div className="payment-item status">
          <span>الحالة</span>
          <span className="status-badge paid">مدفوع</span>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentStatusCard;