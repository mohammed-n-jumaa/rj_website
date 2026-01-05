import { motion } from 'framer-motion';
import { FaBolt, FaFire, FaAppleAlt, FaDumbbell } from 'react-icons/fa';

const TodayCard = ({ delay }) => {
  const todayStats = [
    { icon: FaFire, label: 'السعرات', value: '1200 / 1800', type: 'calories' },
    { icon: FaAppleAlt, label: 'الوجبات', value: '2 / 5', type: 'meals' },
    { icon: FaDumbbell, label: 'التمارين', value: '2 / 4', type: 'workout' }
  ];

  return (
    <motion.div 
      className="today-card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
    >
      <div className="card-header">
        <h3>ملخص اليوم</h3>
        <FaBolt className="header-icon" />
      </div>
      <div className="today-stats">
        {todayStats.map((stat, index) => (
          <div key={index} className="today-item">
            <div className={`today-icon ${stat.type}`}>
              <stat.icon />
            </div>
            <div className="today-info">
              <span className="today-value">{stat.value}</span>
              <span className="today-label">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default TodayCard;