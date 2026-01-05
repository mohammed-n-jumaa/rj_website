import { motion } from 'framer-motion';
import { FaRuler, FaWeight, FaBirthdayCake, FaBullseye, FaChartLine } from 'react-icons/fa';

const StatsCard = ({ userData, delay }) => {
  const stats = [
    { icon: FaRuler, label: 'الطول', value: `${userData.height} cm`, type: 'height' },
    { icon: FaWeight, label: 'الوزن', value: `${userData.weight} kg`, type: 'weight' },
    { icon: FaBirthdayCake, label: 'العمر', value: `${userData.age} سنة`, type: 'age' },
    { icon: FaBullseye, label: 'الهدف', value: userData.goal, type: 'goal' }
  ];

  return (
    <motion.div 
      className="stats-card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
    >
      <div className="card-header">
        <h3>البيانات الشخصية</h3>
        <FaChartLine className="header-icon" />
      </div>
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-item">
            <div className={`stat-icon ${stat.type}`}>
              <stat.icon />
            </div>
            <div className="stat-info">
              <span className="stat-label">{stat.label}</span>
              <span className="stat-value">{stat.value}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default StatsCard;