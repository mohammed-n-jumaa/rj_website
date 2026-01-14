import { motion } from 'framer-motion';
import { FaTrophy, FaFire, FaCalendarAlt, FaEdit, FaBell } from 'react-icons/fa';

const ProfileHeader = ({ userData }) => {
  return (
    <motion.div 
      className="profile-header"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="header-gradient"></div>
      
      <div className="header-content">
        <div className="profile-info">
          <motion.div 
            className="avatar-wrapper"
            whileHover={{ scale: 1.05 }}
          >
            <img src={userData.avatar} alt={userData.name} className="avatar" />
            <div className="avatar-badge">
              <FaTrophy />
            </div>
          </motion.div>
          
          <div className="info-text">
            <h1>{userData.name}</h1>
            <p className="program-name">{userData.program}</p>
            <div className="stats-mini">
              <span><FaFire /> {userData.progress}% Complete</span>
              <span><FaCalendarAlt /> {userData.daysLeft} days left</span>
            </div>
          </div>
        </div>
        
        <div className="quick-actions">
          <motion.button 
            className="action-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaEdit /> Edit Profile
          </motion.button>
          <motion.button 
            className="action-btn notification"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaBell />
            <span className="notification-badge">3</span>
          </motion.button>
        </div>
      </div>

      <div className="progress-container">
        <div className="progress-info">
          <span>Program Progress</span>
          <span>{userData.progress}%</span>
        </div>
        <div className="progress-bar">
          <motion.div 
            className="progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${userData.progress}%` }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileHeader;