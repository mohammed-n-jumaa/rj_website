import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileHeader from '../components/Profile/ProfileHeader';
import ProfileTabs from '../components/Profile/ProfileTabs';
import OverviewTab from '../components/Profile/OverviewTab';
import NutritionTab from '../components/Profile/NutritionTab';
import WorkoutTab from '../components/Profile/WorkoutTab';
import ChatTab from '../components/Profile/ChatTab';
import PaymentTab from '../components/Profile/PaymentTab';
import { userData, nutritionPlan, workoutPlan, messages } from '../data/profileData';
import './Profile.scss';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab userData={userData} />;
      case 'nutrition':
        return <NutritionTab nutritionPlan={nutritionPlan} />;
      case 'workout':
        return <WorkoutTab workoutPlan={workoutPlan} />;
      case 'chat':
        return <ChatTab messages={messages} />;
      case 'payment':
        return <PaymentTab userData={userData} />;
      default:
        return <OverviewTab userData={userData} />;
    }
  };

  return (
    <div className="profile-page">
      <ProfileHeader userData={userData} />
      
      <ProfileTabs 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      <AnimatePresence mode="wait">
        <motion.div 
          key={activeTab}
          className="profile-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderTabContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Profile;