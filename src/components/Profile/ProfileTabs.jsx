import { motion } from 'framer-motion';
import { FaUser, FaUtensils, FaDumbbell, FaComments, FaCreditCard } from 'react-icons/fa';

const ProfileTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'overview', label: 'نظرة عامة', icon: <FaUser /> },
    { id: 'nutrition', label: 'التغذية', icon: <FaUtensils /> },
    { id: 'workout', label: 'التمارين', icon: <FaDumbbell /> },
    { id: 'chat', label: 'الرسائل', icon: <FaComments />, badge: 2 },
    { id: 'payment', label: 'الدفع', icon: <FaCreditCard /> }
  ];

  return (
    <motion.div 
      className="profile-tabs"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          className={`tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="tab-icon">{tab.icon}</span>
          <span className="tab-label">{tab.label}</span>
          {tab.badge && <span className="tab-badge">{tab.badge}</span>}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default ProfileTabs;