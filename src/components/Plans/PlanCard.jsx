import { motion } from 'framer-motion';
import { FaCheck, FaCrown, FaPaypal } from 'react-icons/fa';

const PlanCard = ({ plan, onSelect, delay }) => {
  const { id, name, subtitle, price, duration, popular, features, color, icon } = plan;

  return (
    <motion.div 
      className={`plan-card ${popular ? 'popular' : ''} ${color}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -10 }}
    >
      {popular && (
        <div className="popular-badge">
          <FaCrown /> الأكثر شعبية
        </div>
      )}

      <div className="plan-header">
        <div className="plan-icon">{icon}</div>
        <h3 className="plan-name">{name}</h3>
        <p className="plan-subtitle">{subtitle}</p>
      </div>

      <div className="plan-pricing">
        <div className="price-wrapper">
          <span className="currency">$</span>
          <span className="price">{price}</span>
        </div>
        <span className="duration">/ {duration}</span>
      </div>

      <div className="plan-features">
        <ul>
          {features.map((feature, index) => (
            <motion.li 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + (index * 0.05) }}
            >
              <FaCheck className="check-icon" />
              <span>{feature}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      <motion.button
        className="plan-button"
        onClick={() => onSelect(plan)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <FaPaypal />
        اشتراك عبر PayPal
      </motion.button>

    </motion.div>
  );
};

export default PlanCard;