import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUtensils, 
  FaFire, 
  FaDrumstickBite,
  FaBreadSlice,
  FaTint,
  FaCheckCircle,
  FaCircle,
  FaClock
} from 'react-icons/fa';
import './NutritionTable.scss';

const NutritionTable = ({ nutritionData }) => {
  const [checkedMeals, setCheckedMeals] = useState([]);
  const [selectedDay, setSelectedDay] = useState('today');

  const meals = nutritionData || [
    {
      id: 1,
      name: 'الإفطار',
      time: '8:00 صباحاً',
      icon: '🌅',
      items: ['3 بيضات مسلوقة', 'خبز أسمر (شريحة)', 'خيار وطماطم'],
      calories: 320,
      protein: 25,
      carbs: 28,
      fats: 12
    },
    {
      id: 2,
      name: 'سناك صباحي',
      time: '11:00 صباحاً',
      icon: '🍎',
      items: ['تفاحة خضراء', 'حفنة لوز (10 حبات)'],
      calories: 180,
      protein: 4,
      carbs: 22,
      fats: 9
    },
    {
      id: 3,
      name: 'الغداء',
      time: '2:00 ظهراً',
      icon: '🍗',
      items: ['صدر دجاج مشوي (150جم)', 'أرز بني (نصف كوب)', 'سلطة خضراء'],
      calories: 450,
      protein: 45,
      carbs: 35,
      fats: 10
    },
    {
      id: 4,
      name: 'سناك مسائي',
      time: '5:00 مساءً',
      icon: '🥤',
      items: ['بروتين شيك', 'موزة'],
      calories: 250,
      protein: 30,
      carbs: 25,
      fats: 5
    },
    {
      id: 5,
      name: 'العشاء',
      time: '8:00 مساءً',
      icon: '🥗',
      items: ['سمك مشوي (120جم)', 'خضار مشوية', 'زبادي يوناني'],
      calories: 350,
      protein: 35,
      carbs: 18,
      fats: 15
    }
  ];

  const totalNutrition = meals.reduce((acc, meal) => ({
    calories: acc.calories + meal.calories,
    protein: acc.protein + meal.protein,
    carbs: acc.carbs + meal.carbs,
    fats: acc.fats + meal.fats
  }), { calories: 0, protein: 0, carbs: 0, fats: 0 });

  const handleMealCheck = (mealId) => {
    setCheckedMeals(prev => 
      prev.includes(mealId) 
        ? prev.filter(id => id !== mealId)
        : [...prev, mealId]
    );
  };

  const completionPercentage = (checkedMeals.length / meals.length) * 100;

  return (
    <div className="nutrition-table-section">
      {/* Header with Progress */}
      <div className="nutrition-header">
        <div className="header-title">
          <FaUtensils />
          <h2>جدول التغذية اليومي</h2>
        </div>
        
        <div className="completion-badge">
          <div className="circular-progress">
            <svg width="60" height="60">
              <circle
                cx="30"
                cy="30"
                r="25"
                fill="none"
                stroke="#f0f0f0"
                strokeWidth="5"
              />
              <motion.circle
                cx="30"
                cy="30"
                r="25"
                fill="none"
                stroke="#E91E63"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 25}`}
                strokeDashoffset={`${2 * Math.PI * 25 * (1 - completionPercentage / 100)}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 25 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 25 * (1 - completionPercentage / 100) }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </svg>
            <span className="progress-text">{Math.round(completionPercentage)}%</span>
          </div>
          <p>{checkedMeals.length} / {meals.length} وجبات</p>
        </div>
      </div>

      {/* Nutrition Summary */}
      <div className="nutrition-summary">
        <motion.div 
          className="summary-card calories"
          whileHover={{ scale: 1.05 }}
        >
          <div className="summary-icon">
            <FaFire />
          </div>
          <div className="summary-info">
            <p className="summary-label">السعرات</p>
            <h3 className="summary-value">{totalNutrition.calories}</h3>
            <p className="summary-unit">كالوري</p>
          </div>
        </motion.div>

        <motion.div 
          className="summary-card protein"
          whileHover={{ scale: 1.05 }}
        >
          <div className="summary-icon">
            <FaDrumstickBite />
          </div>
          <div className="summary-info">
            <p className="summary-label">البروتين</p>
            <h3 className="summary-value">{totalNutrition.protein}g</h3>
          </div>
        </motion.div>

        <motion.div 
          className="summary-card carbs"
          whileHover={{ scale: 1.05 }}
        >
          <div className="summary-icon">
            <FaBreadSlice />
          </div>
          <div className="summary-info">
            <p className="summary-label">الكارب</p>
            <h3 className="summary-value">{totalNutrition.carbs}g</h3>
          </div>
        </motion.div>

        <motion.div 
          className="summary-card fats"
          whileHover={{ scale: 1.05 }}
        >
          <div className="summary-icon">
            <FaTint />
          </div>
          <div className="summary-info">
            <p className="summary-label">الدهون</p>
            <h3 className="summary-value">{totalNutrition.fats}g</h3>
          </div>
        </motion.div>
      </div>

      {/* Meals List */}
      <div className="meals-list">
        <AnimatePresence>
          {meals.map((meal, index) => (
            <motion.div
              key={meal.id}
              className={`meal-card ${checkedMeals.includes(meal.id) ? 'checked' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -3 }}
            >
              <div className="meal-header">
                <div className="meal-title">
                  <span className="meal-icon">{meal.icon}</span>
                  <div>
                    <h4>{meal.name}</h4>
                    <p className="meal-time">
                      <FaClock /> {meal.time}
                    </p>
                  </div>
                </div>
                
                <motion.button
                  className="check-button"
                  onClick={() => handleMealCheck(meal.id)}
                  whileTap={{ scale: 0.9 }}
                >
                  {checkedMeals.includes(meal.id) ? (
                    <FaCheckCircle />
                  ) : (
                    <FaCircle />
                  )}
                </motion.button>
              </div>

              <div className="meal-items">
                {meal.items.map((item, i) => (
                  <span key={i} className="meal-item">• {item}</span>
                ))}
              </div>

              <div className="meal-nutrition">
                <div className="nutrition-item">
                  <FaFire className="icon calories-icon" />
                  <span>{meal.calories} cal</span>
                </div>
                <div className="nutrition-item">
                  <FaDrumstickBite className="icon protein-icon" />
                  <span>{meal.protein}g</span>
                </div>
                <div className="nutrition-item">
                  <FaBreadSlice className="icon carbs-icon" />
                  <span>{meal.carbs}g</span>
                </div>
                <div className="nutrition-item">
                  <FaTint className="icon fats-icon" />
                  <span>{meal.fats}g</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Motivational Message */}
      {completionPercentage === 100 && (
        <motion.div 
          className="completion-message"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <span className="emoji">🎉</span>
          <h3>رائع! أكملتي جميع وجباتك اليوم</h3>
          <p>استمري على هذا المستوى الرائع!</p>
        </motion.div>
      )}
    </div>
  );
};

export default NutritionTable;