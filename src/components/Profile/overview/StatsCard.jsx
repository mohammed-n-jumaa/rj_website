import { motion } from 'framer-motion';
import { FaRuler, FaWeight, FaBirthdayCake, FaBullseye, FaChartLine } from 'react-icons/fa';

const StatsCard = ({ userData, delay }) => {
  const stats = [
    { icon: FaRuler, label: 'Height', value: `${userData.height} cm`, type: 'height' },
    { icon: FaWeight, label: 'Weight', value: `${userData.weight} kg`, type: 'weight' },
    { icon: FaBirthdayCake, label: 'Age', value: `${userData.age} years`, type: 'age' },
    { icon: FaBullseye, label: 'Goal', value: userData.goal, type: 'goal' }
  ];

  return (
    <motion.div
      className="stats-card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
    >
      <div className="card-header">
        <h3>Personal Stats</h3>
        <FaChartLine className="header-icon" />
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="stat-item"
            whileHover={{ scale: 1.03 }}
          >
            <div className={`stat-icon ${stat.type}`}>
              <stat.icon />
            </div>
            <div className="stat-info">
              <span className="stat-label">{stat.label}</span>
              <span className="stat-value">{stat.value}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default StatsCard;