import { motion } from 'framer-motion';
import { FaHistory, FaPaypal, FaCheckCircle, FaCalendarAlt } from 'react-icons/fa';

const PaymentHistory = ({ userData, delay }) => {
  // In the future, this will be fetched from Laravel API
  const paymentHistory = [
    {
      id: 1,
      date: '2024-01-01',
      amount: 299,
      status: 'completed',
      method: 'PayPal',
      transactionId: 'PP-123456789',
      description: 'Golden Transformation Program Subscription'
    },
    {
      id: 2,
      date: '2023-10-01',
      amount: 299,
      status: 'completed',
      method: 'PayPal',
      transactionId: 'PP-987654321',
      description: 'Subscription Renewal'
    },
    {
      id: 3,
      date: '2023-07-01',
      amount: 299,
      status: 'completed',
      method: 'PayPal',
      transactionId: 'PP-456789123',
      description: 'New Subscription'
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
        <h3>Payment History</h3>
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
              transition={{ delay: delay + index * 0.1 }}
            >
              <div className="payment-icon">
                <FaPaypal />
              </div>

              <div className="payment-details">
                <h5>{payment.description}</h5>
                <div className="payment-meta">
                  <span>
                    <FaCalendarAlt /> {payment.date}
                  </span>
                  <span>
                    Transaction ID: {payment.transactionId}
                  </span>
                </div>
              </div>

              <div className="payment-amount-status">
                <span className="amount">${payment.amount}</span>
                <span className="status completed">
                  <FaCheckCircle /> Completed
                </span>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="no-history">
            <FaHistory />
            <p>No payment history</p>
          </div>
        )}
      </div>

      {paymentHistory.length > 3 && (
        <button className="view-all-btn">
          View All Payments
        </button>
      )}
    </motion.div>
  );
};

export default PaymentHistory;