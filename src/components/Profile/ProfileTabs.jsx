import { motion } from 'framer-motion';
import { FaUser, FaUtensils, FaDumbbell, FaComments, FaCreditCard } from 'react-icons/fa';

const ProfileTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: <FaUser /> },
    { id: 'nutrition', label: 'Nutrition', icon: <FaUtensils /> },
    { id: 'workout', label: 'Workout', icon: <FaDumbbell /> },
    { id: 'chat', label: 'Messages', icon: <FaComments />, badge: 2 },
    { id: 'payment', label: 'Payment', icon: <FaCreditCard /> }
  ];

  return (
    <div className="profile-tabs">
      {tabs.map((tab) => (
        <motion.div
          key={tab.id}
          className={`tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="tab-icon">{tab.icon}</span>
          <span className="tab-label">{tab.label}</span>
          {tab.badge && <span className="tab-badge">{tab.badge}</span>}
        </motion.div>
      ))}
    </div>
  );
};

export default ProfileTabs;