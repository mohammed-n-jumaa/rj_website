import { motion } from 'framer-motion';
import { FaHistory, FaPaypal, FaCheckCircle, FaCalendarAlt } from 'react-icons/fa';

const PaymentHistory = ({ userData, delay }) => {
  // في المستقبل سيتم جلب السجل من Laravel API
  const paymentHistory = [
    {
      id: 1,
      date: '2024-01-01',
      amount: 299,
      status: 'completed',
      method: 'PayPal',
      transactionId: 'PP-123456789',
      description: 'اشتراك برنامج التحول الذهبي'
    },
    {
      id: 2,
      date: '2023-10-01',
      amount: 299,
      status: 'completed',
      method: 'PayPal',
      transactionId: 'PP-987654321',
      description: 'تجديد اشتراك'
    },
    {
      id: 3,
      date: '2023-07-01',
      amount: 299,
      status: 'completed',
      method: 'PayPal',
      transactionId: 'PP-456789123',
      description: 'اشتراك جديد'
    }
  ];

  return (
    <motion.div 
      className="payment-history-card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
    >
      <div className="card-header">
        <h3>سجل المدفوعات</h3>
        <FaHistory className="header-icon" />
      </div>
      
      <div className="history-list">
        {paymentHistory.length > 0 ? (
          paymentHistory.map((payment, index) => (
            <motion.div
              key={payment.id}
              className="history-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + (index * 0.1) }}
            >
              <div className="payment-icon">
                <FaPaypal />
              </div>
              
              <div className="payment-details">
                <h5>{payment.description}</h5>
                <div className="payment-meta">
                  <span className="payment-date">
                    <FaCalendarAlt /> {payment.date}
                  </span>
                  <span className="transaction-id">
                    رقم العملية: {payment.transactionId}
                  </span>
                </div>
              </div>
              
              <div className="payment-amount-status">
                <span className="amount">${payment.amount}</span>
                <span className="status completed">
                  <FaCheckCircle /> مكتمل
                </span>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="no-history">
            <FaHistory />
            <p>لا يوجد سجل مدفوعات</p>
          </div>
        )}
      </div>
      
      {paymentHistory.length > 3 && (
        <motion.button
          className="view-all-btn"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          عرض جميع المدفوعات
        </motion.button>
      )}
    </motion.div>
  );
};

export default PaymentHistory;