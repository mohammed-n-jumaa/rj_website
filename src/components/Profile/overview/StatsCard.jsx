import { motion } from 'framer-motion';
import { 
  FaRuler, 
  FaWeight, 
  FaBirthdayCake, 
  FaBullseye, 
  FaChartLine,
  FaUser,
  FaHome,
  FaHeartbeat,
  FaRunning,
  FaVenusMars // إضافة هذا الاستيراد
} from 'react-icons/fa';

const StatsCard = ({ userData, delay }) => {
  const stats = [
    // القياسات البدنية
    { icon: FaRuler, label: 'Height (cm)', value: `${userData.height} cm`, type: 'height' },
    { icon: FaWeight, label: 'Current Weight (kg)', value: `${userData.weight} kg`, type: 'weight' },
    { icon: FaVenusMars, label: 'Gender', value: userData.gender === 'female' ? 'Female' : 'Male', type: 'gender' },
    { icon: FaUser, label: 'Waist (at navel)', value: `${userData.waist || '--'} cm`, type: 'waist' },
    { icon: FaUser, label: 'Hips (for females)', value: userData.gender === 'female' ? `${userData.hips || '--'} cm` : '--', type: 'hips' },
    
    // الهدف والنشاط
    { icon: FaBullseye, label: 'Your Goal', value: userData.goal || 'Not set', type: 'goal' },
    { icon: FaHome, label: 'Workout Place', value: userData.workoutPlace || 'Not set', type: 'place' },
    
    // الحالة الصحية
    { icon: FaHeartbeat, label: 'Health Notes', value: userData.healthNotes || 'No injuries or allergies', type: 'health' },
    { icon: FaRunning, label: 'Age', value: `${userData.age} years`, type: 'age' }
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