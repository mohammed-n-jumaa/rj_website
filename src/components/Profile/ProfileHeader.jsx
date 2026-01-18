import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaTrophy, 
  FaFire, 
  FaCalendarAlt, 
  FaEdit, 
  FaBell,
  FaInfoCircle,
  FaCheck
} from 'react-icons/fa';
import EditProfileModal from './EditProfileModal';

const ProfileHeader = ({ userData, onProfileUpdate }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isReminderVisible, setIsReminderVisible] = useState(true);

  const handleSaveProfile = async (updatedData) => {
    try {
      console.log('Updated user data:', updatedData);
      await onProfileUpdate(updatedData);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw new Error('Failed to update profile. Please try again.');
    }
    
  };
const [currentUserData, setCurrentUserData] = useState({
  ...userData,
  // البيانات المضافة
  waist: 85,
  hips: 95,
  workoutPlace: 'home',
  healthNotes: 'No known allergies. Minor knee injury from 2023.',
  goal: 'weight-loss',
  email: 'user@example.com',
  gender: 'male' 
});
  return (
    <>
      <motion.div 
        className="profile-header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Compact Reminder Message */}
        {isReminderVisible && (
          <motion.div 
            className="profile-reminder compact"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <div className="reminder-content">
              <div className="reminder-icon">
                <FaInfoCircle />
              </div>
              <div className="reminder-text">
                <p className="reminder-message">
                  <strong>Profile Check:</strong> Verify your information is accurate for personalized fitness plans.
                </p>
                <div className="reminder-actions">
                  <button 
                    className="review-btn"
                    onClick={() => setIsEditModalOpen(true)}
                  >
                    <FaEdit /> Update
                  </button>
                  <button 
                    className="dismiss-btn"
                    onClick={() => setIsReminderVisible(false)}
                  >
                    <FaCheck /> Done
                  </button>
                </div>
              </div>
              <button 
                className="close-reminder"
                onClick={() => setIsReminderVisible(false)}
                aria-label="Close reminder"
              >
                &times;
              </button>
            </div>
          </motion.div>
        )}

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
              onClick={() => setIsEditModalOpen(true)}
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

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        userData={userData}
        onSave={handleSaveProfile}
      />
    </>
  );
};

export default ProfileHeader;