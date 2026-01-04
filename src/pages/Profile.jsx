import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaUser,
  FaWeight,
  FaRuler,
  FaBirthdayCake,
  FaBullseye,
  FaDollarSign,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaUtensils,
  FaDumbbell,
  FaComments,
  FaCreditCard,
  FaFire,
  FaTrophy,
  FaChartLine,
  FaAppleAlt,
  FaBolt,
  FaPlayCircle,
  FaPaperPlane,
  FaUpload,
  FaBell,
  FaEdit,
  FaTimes,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';
import './Profile.scss';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [chatMessage, setChatMessage] = useState('');
  const [expandedDay, setExpandedDay] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null);

  // Mock Data
  const userData = {
    name: 'سارة أحمد',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    height: 165,
    weight: 65,
    age: 28,
    goal: 'خسارة وزن وتنشيف',
    program: 'برنامج التحول الذهبي',
    price: 299,
    duration: '3 أشهر',
    paymentStatus: 'paid',
    startDate: '2024-01-01',
    endDate: '2024-04-01',
    progress: 65,
    daysLeft: 45
  };

  const nutritionPlan = {
    totalCalories: 1800,
    protein: 135,
    carbs: 180,
    fats: 60,
    meals: [
      {
        id: 1,
        name: 'الفطور',
        time: '07:00 AM',
        calories: 450,
        protein: 30,
        carbs: 45,
        fats: 15,
        items: ['3 بيضات مسلوقة', 'خبز توست أسمر (2 شريحة)', 'أفوكادو نصف حبة', 'قهوة سوداء'],
        checked: true
      },
      {
        id: 2,
        name: 'سناك صباحي',
        time: '10:30 AM',
        calories: 200,
        protein: 15,
        carbs: 25,
        fats: 8,
        items: ['زبادي يوناني قليل الدسم', 'حفنة لوز (10 حبات)'],
        checked: true
      },
      {
        id: 3,
        name: 'الغداء',
        time: '01:00 PM',
        calories: 600,
        protein: 45,
        carbs: 60,
        fats: 20,
        items: ['صدر دجاج مشوي (200g)', 'أرز بسمتي (1 كوب)', 'سلطة خضراء', 'زيت زيتون (1 ملعقة)'],
        checked: false
      },
      {
        id: 4,
        name: 'سناك مسائي',
        time: '04:30 PM',
        calories: 250,
        protein: 20,
        carbs: 30,
        fats: 8,
        items: ['بروتين شيك', 'موزة متوسطة'],
        checked: false
      },
      {
        id: 5,
        name: 'العشاء',
        time: '07:00 PM',
        calories: 300,
        protein: 25,
        carbs: 20,
        fats: 9,
        items: ['سمك سلمون مشوي (150g)', 'خضار مشوية', 'سلطة'],
        checked: false
      }
    ]
  };

  const workoutPlan = [
    {
      day: 'الأحد',
      title: 'تمارين الجزء العلوي',
      exercises: [
        { name: 'Bench Press', sets: 4, reps: '10-12', video: 'https://example.com/bench.mp4', checked: true },
        { name: 'Shoulder Press', sets: 3, reps: '12-15', video: 'https://example.com/shoulder.mp4', checked: true },
        { name: 'Tricep Dips', sets: 3, reps: '12-15', video: 'https://example.com/tricep.mp4', checked: false },
        { name: 'Bicep Curls', sets: 3, reps: '12-15', video: 'https://example.com/bicep.mp4', checked: false }
      ]
    },
    {
      day: 'الإثنين',
      title: 'كارديو و Core',
      exercises: [
        { name: 'Running', sets: 1, reps: '30 min', video: 'https://example.com/run.mp4', checked: false },
        { name: 'Plank', sets: 3, reps: '60 sec', video: 'https://example.com/plank.mp4', checked: false },
        { name: 'Russian Twists', sets: 3, reps: '20', video: 'https://example.com/twist.mp4', checked: false }
      ]
    },
    {
      day: 'الثلاثاء',
      title: 'راحة نشطة',
      exercises: [
        { name: 'Walking', sets: 1, reps: '45 min', video: '', checked: false },
        { name: 'Stretching', sets: 1, reps: '15 min', video: '', checked: false }
      ]
    },
    {
      day: 'الأربعاء',
      title: 'تمارين الجزء السفلي',
      exercises: [
        { name: 'Squats', sets: 4, reps: '12-15', video: 'https://example.com/squat.mp4', checked: false },
        { name: 'Lunges', sets: 3, reps: '12 each', video: 'https://example.com/lunge.mp4', checked: false },
        { name: 'Leg Press', sets: 4, reps: '12-15', video: 'https://example.com/legpress.mp4', checked: false },
        { name: 'Calf Raises', sets: 3, reps: '15-20', video: 'https://example.com/calf.mp4', checked: false }
      ]
    },
    {
      day: 'الخميس',
      title: 'HIIT Training',
      exercises: [
        { name: 'Burpees', sets: 4, reps: '15', video: 'https://example.com/burpee.mp4', checked: false },
        { name: 'Mountain Climbers', sets: 4, reps: '20', video: 'https://example.com/mountain.mp4', checked: false },
        { name: 'Jump Squats', sets: 4, reps: '15', video: 'https://example.com/jumpsquat.mp4', checked: false }
      ]
    },
    {
      day: 'الجمعة',
      title: 'Full Body',
      exercises: [
        { name: 'Deadlifts', sets: 4, reps: '10-12', video: 'https://example.com/deadlift.mp4', checked: false },
        { name: 'Pull-ups', sets: 3, reps: '8-10', video: 'https://example.com/pullup.mp4', checked: false },
        { name: 'Push-ups', sets: 3, reps: '15-20', video: 'https://example.com/pushup.mp4', checked: false }
      ]
    },
    {
      day: 'السبت',
      title: 'يوم راحة',
      exercises: []
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'trainer',
      name: 'رند جرار',
      avatar: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=50&h=50&fit=crop',
      message: 'مرحباً سارة! كيف حالك اليوم؟',
      time: '10:30 AM',
      date: '2024-01-15'
    },
    {
      id: 2,
      sender: 'user',
      message: 'الحمد لله، بخير! أكملت تمارين اليوم 💪',
      time: '10:45 AM',
      date: '2024-01-15'
    },
    {
      id: 3,
      sender: 'trainer',
      name: 'رند جرار',
      avatar: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=50&h=50&fit=crop',
      message: 'ممتاز! استمري على هذا المستوى. لاحظت التزامك الرائع بالنظام الغذائي',
      time: '10:50 AM',
      date: '2024-01-15'
    },
    {
      id: 4,
      sender: 'user',
      message: 'شكراً لك! عندي سؤال عن الوجبة المسائية',
      time: '11:00 AM',
      date: '2024-01-15'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'نظرة عامة', icon: <FaUser /> },
    { id: 'nutrition', label: 'التغذية', icon: <FaUtensils /> },
    { id: 'workout', label: 'التمارين', icon: <FaDumbbell /> },
    { id: 'chat', label: 'الرسائل', icon: <FaComments />, badge: 2 },
    { id: 'payment', label: 'الدفع', icon: <FaCreditCard /> }
  ];

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      // Here you would send the message to your backend
      setChatMessage('');
    }
  };

  const toggleMealCheck = (mealId) => {
    // Update meal check status
  };

  const toggleExerciseCheck = (dayIndex, exerciseIndex) => {
    // Update exercise check status
  };

  return (
    <div className="profile-page">
      {/* Header */}
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
                <span><FaFire /> {userData.progress}% مكتمل</span>
                <span><FaCalendarAlt /> {userData.daysLeft} يوم متبقي</span>
              </div>
            </div>
          </div>
          
          <div className="quick-actions">
            <motion.button 
              className="action-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaEdit /> تعديل الملف
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

        {/* Progress Bar */}
        <div className="progress-container">
          <div className="progress-info">
            <span>تقدم البرنامج</span>
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

      {/* Navigation Tabs */}
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

      {/* Content Area */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeTab}
          className="profile-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="overview-tab">
              <div className="overview-grid">
                {/* Personal Stats */}
                <motion.div 
                  className="stats-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="card-header">
                    <h3>البيانات الشخصية</h3>
                    <FaChartLine className="header-icon" />
                  </div>
                  <div className="stats-grid">
                    <div className="stat-item">
                      <div className="stat-icon height">
                        <FaRuler />
                      </div>
                      <div className="stat-info">
                        <span className="stat-label">الطول</span>
                        <span className="stat-value">{userData.height} cm</span>
                      </div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-icon weight">
                        <FaWeight />
                      </div>
                      <div className="stat-info">
                        <span className="stat-label">الوزن</span>
                        <span className="stat-value">{userData.weight} kg</span>
                      </div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-icon age">
                        <FaBirthdayCake />
                      </div>
                      <div className="stat-info">
                        <span className="stat-label">العمر</span>
                        <span className="stat-value">{userData.age} سنة</span>
                      </div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-icon goal">
                        <FaBullseye />
                      </div>
                      <div className="stat-info">
                        <span className="stat-label">الهدف</span>
                        <span className="stat-value">{userData.goal}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Subscription Info */}
                <motion.div 
                  className="subscription-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="card-header">
                    <h3>تفاصيل الاشتراك</h3>
                    <FaDollarSign className="header-icon" />
                  </div>
                  <div className="subscription-details">
                    <div className="detail-row">
                      <span className="detail-label">سعر البرنامج</span>
                      <span className="detail-value price">${userData.price}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">المدة</span>
                      <span className="detail-value">{userData.duration}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">تاريخ البدء</span>
                      <span className="detail-value">{userData.startDate}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">تاريخ الانتهاء</span>
                      <span className="detail-value">{userData.endDate}</span>
                    </div>
                    <div className="detail-row status">
                      <span className="detail-label">حالة الدفع</span>
                      <span className={`payment-status ${userData.paymentStatus}`}>
                        <FaCheckCircle /> تم الدفع
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Today's Summary */}
                <motion.div 
                  className="today-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="card-header">
                    <h3>ملخص اليوم</h3>
                    <FaBolt className="header-icon" />
                  </div>
                  <div className="today-stats">
                    <div className="today-item">
                      <div className="today-icon calories">
                        <FaFire />
                      </div>
                      <div className="today-info">
                        <span className="today-value">1200 / 1800</span>
                        <span className="today-label">السعرات</span>
                      </div>
                    </div>
                    <div className="today-item">
                      <div className="today-icon meals">
                        <FaAppleAlt />
                      </div>
                      <div className="today-info">
                        <span className="today-value">2 / 5</span>
                        <span className="today-label">الوجبات</span>
                      </div>
                    </div>
                    <div className="today-item">
                      <div className="today-icon workout">
                        <FaDumbbell />
                      </div>
                      <div className="today-info">
                        <span className="today-value">2 / 4</span>
                        <span className="today-label">التمارين</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Achievements */}
                <motion.div 
                  className="achievements-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="card-header">
                    <h3>الإنجازات</h3>
                    <FaTrophy className="header-icon" />
                  </div>
                  <div className="achievements-grid">
                    <div className="achievement unlocked">
                      <FaTrophy />
                      <span>أسبوع كامل</span>
                    </div>
                    <div className="achievement unlocked">
                      <FaFire />
                      <span>5 أيام متتالية</span>
                    </div>
                    <div className="achievement locked">
                      <FaBolt />
                      <span>شهر كامل</span>
                    </div>
                    <div className="achievement locked">
                      <FaTrophy />
                      <span>الهدف المثالي</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          )}

          {/* Nutrition Tab */}
          {activeTab === 'nutrition' && (
            <div className="nutrition-tab">
              {/* Macros Summary */}
              <div className="macros-summary">
                <motion.div 
                  className="macro-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="macro-icon calories">
                    <FaFire />
                  </div>
                  <div className="macro-info">
                    <span className="macro-value">{nutritionPlan.totalCalories}</span>
                    <span className="macro-label">سعرة حرارية</span>
                  </div>
                </motion.div>
                <motion.div 
                  className="macro-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="macro-icon protein">
                    <FaDumbbell />
                  </div>
                  <div className="macro-info">
                    <span className="macro-value">{nutritionPlan.protein}g</span>
                    <span className="macro-label">بروتين</span>
                  </div>
                </motion.div>
                <motion.div 
                  className="macro-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="macro-icon carbs">
                    <FaAppleAlt />
                  </div>
                  <div className="macro-info">
                    <span className="macro-value">{nutritionPlan.carbs}g</span>
                    <span className="macro-label">كربوهيدرات</span>
                  </div>
                </motion.div>
                <motion.div 
                  className="macro-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="macro-icon fats">
                    <FaBolt />
                  </div>
                  <div className="macro-info">
                    <span className="macro-value">{nutritionPlan.fats}g</span>
                    <span className="macro-label">دهون</span>
                  </div>
                </motion.div>
              </div>

              {/* Meals List */}
              <div className="meals-list">
                {nutritionPlan.meals.map((meal, index) => (
                  <motion.div
                    key={meal.id}
                    className={`meal-card ${meal.checked ? 'checked' : ''} ${selectedMeal === meal.id ? 'expanded' : ''}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="meal-header" onClick={() => setSelectedMeal(selectedMeal === meal.id ? null : meal.id)}>
                      <div className="meal-main">
                        <motion.button
                          className={`check-btn ${meal.checked ? 'checked' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleMealCheck(meal.id);
                          }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {meal.checked && <FaCheckCircle />}
                        </motion.button>
                        <div className="meal-info">
                          <h4>{meal.name}</h4>
                          <span className="meal-time"><FaClock /> {meal.time}</span>
                        </div>
                      </div>
                      <div className="meal-summary">
                        <span className="calories">{meal.calories} kcal</span>
                        <motion.div 
                          className="expand-icon"
                          animate={{ rotate: selectedMeal === meal.id ? 180 : 0 }}
                        >
                          <FaChevronDown />
                        </motion.div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {selectedMeal === meal.id && (
                        <motion.div
                          className="meal-details"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="macros-row">
                            <div className="macro-item">
                              <span className="macro-label">بروتين</span>
                              <span className="macro-value">{meal.protein}g</span>
                            </div>
                            <div className="macro-item">
                              <span className="macro-label">كارب</span>
                              <span className="macro-value">{meal.carbs}g</span>
                            </div>
                            <div className="macro-item">
                              <span className="macro-label">دهون</span>
                              <span className="macro-value">{meal.fats}g</span>
                            </div>
                          </div>
                          <div className="meal-items">
                            <h5>المكونات:</h5>
                            <ul>
                              {meal.items.map((item, idx) => (
                                <li key={idx}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Workout Tab */}
          {activeTab === 'workout' && (
            <div className="workout-tab">
              <div className="workout-week">
                {workoutPlan.map((day, dayIndex) => (
                  <motion.div
                    key={dayIndex}
                    className={`day-card ${expandedDay === dayIndex ? 'expanded' : ''} ${day.exercises.length === 0 ? 'rest-day' : ''}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: dayIndex * 0.05 }}
                  >
                    <div 
                      className="day-header"
                      onClick={() => setExpandedDay(expandedDay === dayIndex ? null : dayIndex)}
                    >
                      <div className="day-info">
                        <h3>{day.day}</h3>
                        <p>{day.title}</p>
                      </div>
                      <div className="day-stats">
                        {day.exercises.length > 0 ? (
                          <>
                            <span className="exercise-count">{day.exercises.length} تمارين</span>
                            <motion.div
                              className="expand-icon"
                              animate={{ rotate: expandedDay === dayIndex ? 180 : 0 }}
                            >
                              <FaChevronDown />
                            </motion.div>
                          </>
                        ) : (
                          <span className="rest-label">راحة</span>
                        )}
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedDay === dayIndex && day.exercises.length > 0 && (
                        <motion.div
                          className="exercises-list"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {day.exercises.map((exercise, exerciseIndex) => (
                            <div key={exerciseIndex} className={`exercise-item ${exercise.checked ? 'checked' : ''}`}>
                              <motion.button
                                className={`check-btn ${exercise.checked ? 'checked' : ''}`}
                                onClick={() => toggleExerciseCheck(dayIndex, exerciseIndex)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                {exercise.checked && <FaCheckCircle />}
                              </motion.button>
                              <div className="exercise-info">
                                <h5>{exercise.name}</h5>
                                <span className="exercise-details">
                                  {exercise.sets} جولات × {exercise.reps} تكرار
                                </span>
                              </div>
                              {exercise.video && (
                                <motion.button
                                  className="video-btn"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <FaPlayCircle />
                                </motion.button>
                              )}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Chat Tab */}
          {activeTab === 'chat' && (
            <div className="chat-tab">
              <div className="chat-container">
                <div className="messages-list">
                  {messages.map((msg, index) => (
                    <motion.div
                      key={msg.id}
                      className={`message ${msg.sender}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {msg.sender === 'trainer' && (
                        <img src={msg.avatar} alt={msg.name} className="message-avatar" />
                      )}
                      <div className="message-content">
                        {msg.sender === 'trainer' && <span className="message-name">{msg.name}</span>}
                        <p className="message-text">{msg.message}</p>
                        <span className="message-time">{msg.time}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="chat-input">
                  <input
                    type="text"
                    placeholder="اكتبي رسالتك..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <motion.button
                    className="send-btn"
                    onClick={handleSendMessage}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaPaperPlane />
                  </motion.button>
                </div>
              </div>
            </div>
          )}

          {/* Payment Tab */}
          {activeTab === 'payment' && (
            <div className="payment-tab">
              <div className="payment-grid">
                <motion.div 
                  className="payment-status-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="card-header">
                    <h3>حالة الدفع</h3>
                    <FaCheckCircle className="status-icon paid" />
                  </div>
                  <div className="payment-details">
                    <div className="payment-item">
                      <span>المبلغ المدفوع</span>
                      <span className="amount">${userData.price}</span>
                    </div>
                    <div className="payment-item">
                      <span>تاريخ الدفع</span>
                      <span>01/01/2024</span>
                    </div>
                    <div className="payment-item">
                      <span>طريقة الدفع</span>
                      <span>تحويل بنكي</span>
                    </div>
                    <div className="payment-item status">
                      <span>الحالة</span>
                      <span className="status-badge paid">مدفوع</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  className="subscription-timeline"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="card-header">
                    <h3>مدة الاشتراك</h3>
                    <FaCalendarAlt className="header-icon" />
                  </div>
                  <div className="timeline">
                    <div className="timeline-item active">
                      <div className="timeline-icon">
                        <FaCheckCircle />
                      </div>
                      <div className="timeline-content">
                        <h5>بداية الاشتراك</h5>
                        <span>{userData.startDate}</span>
                      </div>
                    </div>
                    <div className="timeline-item upcoming">
                      <div className="timeline-icon">
                        <FaClock />
                      </div>
                      <div className="timeline-content">
                        <h5>نهاية الاشتراك</h5>
                        <span>{userData.endDate}</span>
                        <span className="days-left">{userData.daysLeft} يوم متبقي</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  className="upload-receipt-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="card-header">
                    <h3>رفع إيصال الدفع</h3>
                    <FaUpload className="header-icon" />
                  </div>
                  <div className="upload-area">
                    <FaUpload className="upload-icon" />
                    <p>اسحبي الإيصال هنا أو اضغطي للتحميل</p>
                    <input type="file" accept="image/*,.pdf" />
                    <motion.button
                      className="upload-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      اختيار ملف
                    </motion.button>
                  </div>
                </motion.div>

                <motion.div 
                  className="renewal-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="card-header">
                    <h3>تجديد الاشتراك</h3>
                    <FaBell className="header-icon" />
                  </div>
                  <div className="renewal-content">
                    <p>سينتهي اشتراكك في <strong>{userData.endDate}</strong></p>
                    <p className="reminder">سنرسل لك تذكير قبل أسبوع من انتهاء الاشتراك</p>
                    <motion.button
                      className="renew-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      جددي الآن
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Profile;