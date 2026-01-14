import { motion } from 'framer-motion';
import { FaBolt, FaFire, FaAppleAlt, FaDumbbell } from 'react-icons/fa';

const TodayCard = ({ delay }) => {
  const todayStats = [
    { icon: FaFire, label: 'Calories', value: '1200 / 1800', type: 'calories' },
    { icon: FaAppleAlt, label: 'Meals', value: '2 / 5', type: 'meals' },
    { icon: FaDumbbell, label: 'Workouts', value: '2 / 4', type: 'workout' }
  ];

  return (
    <motion.div
      className="today-card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
    >
      <div className="card-header">
        <h3>Today's Summary</h3>
        <FaBolt className="header-icon" />
      </div>

      <div className="today-stats">
        {todayStats.map((stat, index) => (
          <motion.div
            key={index}
            className="today-item"
            whileHover={{ scale: 1.02 }}
          >
            <div className={`today-icon ${stat.type}`}>
              <stat.icon />
            </div>
            <div className="today-info">
              <span className="today-value">{stat.value}</span>
              <span className="today-label">{stat.label}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TodayCard;