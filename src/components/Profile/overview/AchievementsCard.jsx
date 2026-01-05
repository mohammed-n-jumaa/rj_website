import { motion } from 'framer-motion';
import { FaTrophy, FaFire, FaBolt } from 'react-icons/fa';

const AchievementsCard = ({ delay }) => {
  const achievements = [
    { icon: FaTrophy, text: 'أسبوع كامل', unlocked: true },
    { icon: FaFire, text: '5 أيام متتالية', unlocked: true },
    { icon: FaBolt, text: 'شهر كامل', unlocked: false },
    { icon: FaTrophy, text: 'الهدف المثالي', unlocked: false }
  ];

  return (
    <motion.div 
      className="achievements-card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
    >
      <div className="card-header">
        <h3>الإنجازات</h3>
        <FaTrophy className="header-icon" />
      </div>
      <div className="achievements-grid">
        {achievements.map((achievement, index) => (
          <div 
            key={index} 
            className={`achievement ${achievement.unlocked ? 'unlocked' : 'locked'}`}
          >
            <achievement.icon />
            <span>{achievement.text}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default AchievementsCard;