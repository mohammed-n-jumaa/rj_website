import { motion } from 'framer-motion';
import { FaTrophy, FaFire, FaBolt } from 'react-icons/fa';

const AchievementsCard = ({ delay }) => {
  const achievements = [
    { icon: FaTrophy, text: 'Full Week', unlocked: true },
    { icon: FaFire, text: '5 Day Streak', unlocked: true },
    { icon: FaBolt, text: 'Full Month', unlocked: false },
    { icon: FaTrophy, text: 'Perfect Goal', unlocked: false }
  ];

  return (
    <motion.div
      className="achievements-card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
    >
      <div className="card-header">
        <h3>Achievements</h3>
        <FaTrophy className="header-icon" />
      </div>

      <div className="achievements-grid">
        {achievements.map((achievement, index) => (
          <motion.div
            key={index}
            className={`achievement ${achievement.unlocked ? 'unlocked' : 'locked'}`}
            whileHover={achievement.unlocked ? { scale: 1.05 } : {}}
          >
            <achievement.icon />
            {achievement.text}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AchievementsCard;