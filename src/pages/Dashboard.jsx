import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';
import { 
  FaHome, FaUtensils, FaDumbbell, FaComments, FaCreditCard,
  FaBars, FaTimes, FaSignOutAlt, FaCog, FaBell,
  FaFire, FaTrophy, FaCheckCircle, FaClock, FaEdit, FaSave,
  FaAppleAlt, FaChartLine, FaCalendarAlt, FaUser,
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaCrown, FaUpload,
  FaPaperPlane, FaPlay, FaCheck, FaCircle, FaWeight
} from 'react-icons/fa';
import './Dashboard.scss';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedDay, setSelectedDay] = useState('الأحد');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // بيانات المستخدمة (قابلة للتعديل)
  const [userData, setUserData] = useState({
    name: 'سارة أحمد',
    email: 'sara.ahmed@example.com',
    phone: '+962 79 123 4567',
    location: 'عمان، الأردن',
    avatar: 'https://ui-avatars.com/api/?name=Sara+Ahmed&background=E91E63&color=fff&size=120&bold=true',
    height: 165,
    weight: 68,
    targetWeight: 60,
    age: 28,
    goal: 'خسارة وزن وبناء عضلات',
    streak: 12,
    progress: 75
  });

  // بيانات الاشتراك
  const [subscription, setSubscription] = useState({
    plan: 'برنامج 3 أشهر',
    duration: 3,
    price: 200,
    status: 'pending', // pending, active, expired
    paymentReceipt: null,
    startDate: '2024-01-01',
    endDate: '2024-04-01',
    daysLeft: 45,
    trainer: 'رند جرار'
  });

  // جدول التغذية الأسبوعي
  const [weeklyNutrition] = useState({
    'الأحد': [
      { id: 1, name: 'الفطور', time: '8:00 صباحاً', emoji: '🌅',
        items: ['2 بيضة مسلوقة', 'خبز أسمر', 'كوب حليب قليل الدسم', 'حبة تفاح'],
        calories: 420, protein: 25, carbs: 45, fats: 12, completed: false },
      { id: 2, name: 'سناك', time: '11:00 صباحاً', emoji: '🍎',
        items: ['حفنة لوز', 'موزة'],
        calories: 250, protein: 8, carbs: 30, fats: 12, completed: false },
      { id: 3, name: 'الغداء', time: '2:00 مساءً', emoji: '🍗',
        items: ['صدر دجاج مشوي 150غ', 'أرز بني كوب', 'سلطة خضراء'],
        calories: 580, protein: 45, carbs: 60, fats: 15, completed: false }
    ],
    'الإثنين': [
      { id: 4, name: 'الفطور', time: '8:00 صباحاً', emoji: '🥣',
        items: ['شوفان بالحليب', 'موز', 'عسل'],
        calories: 380, protein: 15, carbs: 55, fats: 10, completed: false },
      { id: 5, name: 'الغداء', time: '2:00 مساءً', emoji: '🐟',
        items: ['سمك مشوي', 'بطاطا حلوة', 'خضار'],
        calories: 520, protein: 40, carbs: 50, fats: 14, completed: false }
    ],
    'الثلاثاء': [
      { id: 6, name: 'الفطور', time: '8:00 صباحاً', emoji: '🥪',
        items: ['توست أسمر', 'لبنة', 'خيار وطماطم'],
        calories: 350, protein: 18, carbs: 40, fats: 12, completed: false }
    ],
    'الأربعاء': [
      { id: 7, name: 'الفطور', time: '8:00 صباحاً', emoji: '🥛',
        items: ['بان كيك صحي', 'زبدة الفول السوداني', 'فراولة'],
        calories: 400, protein: 20, carbs: 45, fats: 15, completed: false }
    ],
    'الخميس': [
      { id: 8, name: 'الفطور', time: '8:00 صباحاً', emoji: '🍳',
        items: ['عجة بيض بالخضار', 'خبز', 'عصير برتقال'],
        calories: 390, protein: 22, carbs: 42, fats: 13, completed: false }
    ],
    'الجمعة': [
      { id: 9, name: 'الفطور', time: '8:00 صباحاً', emoji: '🥗',
        items: ['سلطة فواكه', 'زبادي يوناني', 'مكسرات'],
        calories: 360, protein: 16, carbs: 48, fats: 11, completed: false }
    ],
    'السبت': [
      { id: 10, name: 'الفطور', time: '8:00 صباحاً', emoji: '🍲',
        items: ['فول مدمس', 'طحينة', 'خضروات'],
        calories: 410, protein: 24, carbs: 44, fats: 14, completed: false }
    ]
  });

  // التمارين المفصلة
  const [workouts] = useState([
    {
      day: 'الأحد',
      name: 'Upper Body - الجزء العلوي',
      duration: 45,
      completed: false,
      exercises: [
        {
          name: 'Bench Press - ضغط البنش',
          sets: 4,
          reps: '10-12',
          rest: '60 ثانية',
          description: 'استلقي على البنش، امسكي البار بعرض الكتفين، انزليه للصدر ثم ادفعيه للأعلى',
          tips: '• حافظي على الظهر مستقيم\n• لا تقفلي المرفقين تماماً\n• تنفسي بشكل صحيح',
          videoUrl: 'https://www.youtube.com/watch?v=example1'
        },
        {
          name: 'Dumbbell Rows - تجديف الدمبل',
          sets: 3,
          reps: '12-15',
          rest: '45 ثانية',
          description: 'انحني للأمام، اسحبي الدمبل باتجاه الصدر مع الحفاظ على الظهر مستقيم',
          tips: '• شدي عضلات الظهر\n• المرفق قريب من الجسم\n• حركة بطيئة ومتحكم فيها',
          videoUrl: 'https://www.youtube.com/watch?v=example2'
        },
        {
          name: 'Shoulder Press - ضغط الكتف',
          sets: 3,
          reps: '10-12',
          rest: '60 ثانية',
          description: 'ارفعي الدمبل من مستوى الكتف للأعلى',
          tips: '• لا ترفعي فوق الرأس مباشرة\n• حافظي على الجسم ثابت',
          videoUrl: 'https://www.youtube.com/watch?v=example3'
        }
      ]
    },
    {
      day: 'الإثنين',
      name: 'Cardio & Core - كارديو وبطن',
      duration: 35,
      completed: false,
      exercises: [
        {
          name: 'Running - الجري',
          sets: 1,
          reps: '20 دقيقة',
          rest: '-',
          description: 'جري بوتيرة معتدلة، حافظي على التنفس المنتظم',
          tips: '• ابدأي بالإحماء\n• حافظي على وتيرة ثابتة\n• اشربي ماء',
          videoUrl: ''
        },
        {
          name: 'Plank - البلانك',
          sets: 3,
          reps: '45-60 ثانية',
          rest: '30 ثانية',
          description: 'احتفظي بوضعية البلانك مع شد البطن',
          tips: '• الجسم بخط مستقيم\n• لا تخفضي الوركين\n• شدي البطن',
          videoUrl: ''
        }
      ]
    },
    {
      day: 'الثلاثاء',
      name: 'Lower Body - الجزء السفلي',
      duration: 50,
      completed: false,
      exercises: [
        {
          name: 'Squats - السكوات',
          sets: 4,
          reps: '12-15',
          rest: '90 ثانية',
          description: 'انزلي كأنك تجلسين على كرسي، الركبة لا تتجاوز أصابع القدم',
          tips: '• الظهر مستقيم\n• الركبة بنفس اتجاه القدم\n• انزلي للأسفل ببطء',
          videoUrl: ''
        },
        {
          name: 'Lunges - اللانج',
          sets: 3,
          reps: '12 كل رجل',
          rest: '60 ثانية',
          description: 'خطوة للأمام، انزلي الركبة الخلفية للأسفل',
          tips: '• حافظي على التوازن\n• الصدر للأعلى\n• تبديل الأرجل',
          videoUrl: ''
        }
      ]
    }
  ]);

  // رسائل المحادثة
  useEffect(() => {
    const initialMessages = [
      {
        id: 1,
        sender: 'trainer',
        text: 'مرحباً سارة! كيف حالك اليوم؟ 😊',
        time: new Date(Date.now() - 7200000).toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' }),
        read: true
      },
      {
        id: 2,
        sender: 'user',
        text: 'الحمد لله، أكملت تمرين اليوم 💪',
        time: new Date(Date.now() - 3600000).toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' }),
        read: true
      },
      {
        id: 3,
        sender: 'trainer',
        text: 'رائع! أحسنت، لا تنسي شرب الماء 💧',
        time: new Date(Date.now() - 1800000).toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' }),
        read: true
      }
    ];
    setMessages(initialMessages);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const userMsg = {
        id: Date.now(),
        sender: 'user',
        text: newMessage,
        time: new Date().toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' }),
        read: false
      };
      
      setMessages([...messages, userMsg]);
      setNewMessage('');
      
      // محاكاة كتابة المدربة
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const trainerResponses = [
          'ممتاز! استمري على هذا المستوى 💪',
          'رائع! أنت تحرزين تقدماً ملحوظاً',
          'أحسنت، لا تنسي الالتزام بالنظام الغذائي 🥗',
          'عظيم! هل تحتاجين أي مساعدة؟',
          'جيد جداً، حافظي على هذا الإنجاز 🎯'
        ];
        const randomResponse = trainerResponses[Math.floor(Math.random() * trainerResponses.length)];
        
        const trainerMsg = {
          id: Date.now() + 1,
          sender: 'trainer',
          text: randomResponse,
          time: new Date().toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' }),
          read: false
        };
        setMessages(prev => [...prev, trainerMsg]);
      }, 2000);
    }
  };

  const handleSaveProfile = () => {
    setEditMode(false);
    Swal.fire({
      title: 'تم الحفظ!',
      text: 'تم تحديث معلوماتك بنجاح',
      icon: 'success',
      confirmButtonColor: '#E91E63',
      confirmButtonText: 'حسناً'
    });
  };

  const handleReceiptUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          title: 'خطأ',
          text: 'حجم الملف يجب أن لا يتجاوز 5 ميجابايت',
          icon: 'error',
          confirmButtonColor: '#E91E63'
        });
        return;
      }
      
      setSubscription({ ...subscription, status: 'pending', paymentReceipt: file.name });
      Swal.fire({
        title: 'تم الرفع!',
        text: 'تم رفع الإيصال بنجاح، جاري المراجعة',
        icon: 'success',
        confirmButtonColor: '#E91E63'
      });
    }
  };

  const menuItems = [
    { id: 'overview', icon: <FaHome />, label: 'نظرة عامة', color: '#E91E63' },
    { id: 'nutrition', icon: <FaUtensils />, label: 'التغذية', color: '#FF5722' },
    { id: 'workout', icon: <FaDumbbell />, label: 'التمارين', color: '#9C27B0' },
    { id: 'chat', icon: <FaComments />, label: 'المحادثات', color: '#2196F3' },
    { id: 'payment', icon: <FaCreditCard />, label: 'الدفع', color: '#4CAF50' }
  ];

  const weekDays = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

  const getStatusBadge = (status) => {
    const badges = {
      pending: { text: 'قيد المراجعة', color: '#FF9800' },
      active: { text: 'مفعّل', color: '#4CAF50' },
      expired: { text: 'منتهي', color: '#F44336' }
    };
    return badges[status];
  };

  return (
    <div className="dashboard-page">
      {/* Mobile Header */}
      <div className="dashboard-mobile-header">
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
        <h1>لوحة التحكم</h1>
        <FaBell />
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || window.innerWidth > 1024) && (
          <>
            <motion.aside className="dashboard-sidebar"
              initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }}>
              
              <div className="trainer-badge">
                <FaCrown /> <span>تحت إشراف المدربة رند جرار</span>
              </div>

              <div className="sidebar-profile">
                <div className="profile-avatar-large">
                  <img src={userData.avatar} alt={userData.name} />
                  <div className="online-indicator"></div>
                </div>
                <h3>{userData.name}</h3>
                <p>{userData.email}</p>
              </div>

              <nav className="sidebar-nav">
                {menuItems.map((item) => (
                  <button key={item.id}
                    className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                    onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                    style={{ '--item-color': item.color }}>
                    <span style={{ color: item.color }}>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>

              <div className="sidebar-footer">
                <button className="footer-btn"><FaCog /> الإعدادات</button>
                <button className="footer-btn logout"><FaSignOutAlt /> تسجيل الخروج</button>
              </div>
            </motion.aside>

            {sidebarOpen && window.innerWidth <= 1024 && (
              <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
            )}
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="dashboard-topbar">
          <div className="topbar-left">
            <h2>{menuItems.find(i => i.id === activeTab)?.label}</h2>
          </div>
          <div className="topbar-right">
            <div className="quick-stats">
              <div><FaFire /><span>{userData.streak} يوم</span></div>
              <div><FaTrophy /><span>{userData.progress}%</span></div>
            </div>
          </div>
        </div>

        <div className="dashboard-content">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              
              {/* نظرة عامة */}
              {activeTab === 'overview' && (
                <div className="overview-section">
                  <div className="welcome-card">
                    <h2>مرحباً {userData.name.split(' ')[0]} 👋</h2>
                    <p>أنت تحققين تقدماً رائعاً!</p>
                  </div>

                  <div className="profile-edit-card">
                    <div className="card-header">
                      <h3>البيانات الشخصية</h3>
                      {!editMode ? (
                        <button className="edit-btn" onClick={() => setEditMode(true)}>
                          <FaEdit /> تعديل
                        </button>
                      ) : (
                        <button className="save-btn" onClick={handleSaveProfile}>
                          <FaSave /> حفظ
                        </button>
                      )}
                    </div>

                    <div className="edit-grid">
                      <div className="edit-field">
                        <label>الطول (سم)</label>
                        <input
                          type="number"
                          value={userData.height}
                          onChange={(e) => setUserData({...userData, height: e.target.value})}
                          disabled={!editMode}
                        />
                      </div>
                      <div className="edit-field">
                        <label>الوزن الحالي (كغ)</label>
                        <input
                          type="number"
                          value={userData.weight}
                          onChange={(e) => setUserData({...userData, weight: e.target.value})}
                          disabled={!editMode}
                        />
                      </div>
                      <div className="edit-field">
                        <label>الوزن المستهدف (كغ)</label>
                        <input
                          type="number"
                          value={userData.targetWeight}
                          onChange={(e) => setUserData({...userData, targetWeight: e.target.value})}
                          disabled={!editMode}
                        />
                      </div>
                      <div className="edit-field">
                        <label>العمر</label>
                        <input
                          type="number"
                          value={userData.age}
                          onChange={(e) => setUserData({...userData, age: e.target.value})}
                          disabled={!editMode}
                        />
                      </div>
                      <div className="edit-field full-width">
                        <label>الهدف</label>
                        <input
                          type="text"
                          value={userData.goal}
                          onChange={(e) => setUserData({...userData, goal: e.target.value})}
                          disabled={!editMode}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="stats-grid">
                    <div className="stat-card">
                      <FaUser />
                      <div><span>الطول</span><strong>{userData.height} سم</strong></div>
                    </div>
                    <div className="stat-card">
                      <FaWeight />
                      <div><span>الوزن</span><strong>{userData.weight} كغ</strong></div>
                    </div>
                    <div className="stat-card">
                      <FaTrophy />
                      <div><span>الهدف</span><strong>{userData.targetWeight} كغ</strong></div>
                    </div>
                    <div className="stat-card">
                      <FaCalendarAlt />
                      <div><span>العمر</span><strong>{userData.age} سنة</strong></div>
                    </div>
                  </div>
                </div>
              )}

              {/* التغذية */}
              {activeTab === 'nutrition' && (
                <div className="nutrition-section">
                  <div className="days-selector">
                    {weekDays.map(day => (
                      <button
                        key={day}
                        className={selectedDay === day ? 'active' : ''}
                        onClick={() => setSelectedDay(day)}
                      >
                        {day}
                      </button>
                    ))}
                  </div>

                  <div className="meals-list">
                    {weeklyNutrition[selectedDay]?.map((meal) => (
                      <div key={meal.id} className={`meal-card ${meal.completed ? 'completed' : ''}`}>
                        <div className="meal-header">
                          <span className="meal-emoji">{meal.emoji}</span>
                          <div>
                            <h4>{meal.name}</h4>
                            <p><FaClock /> {meal.time}</p>
                          </div>
                          {meal.completed && <FaCheckCircle />}
                        </div>
                        <div className="meal-items">
                          {meal.items.map((item, i) => <p key={i}>• {item}</p>)}
                        </div>
                        <div className="meal-macros">
                          <span>🔥 {meal.calories} سعرة</span>
                          <span>🥩 {meal.protein}غ بروتين</span>
                          <span>🍚 {meal.carbs}غ كارب</span>
                          <span>🥑 {meal.fats}غ دهون</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* التمارين */}
              {activeTab === 'workout' && (
                <div className="workout-section">
                  {workouts.map((workout, index) => (
                    <div key={index} className="workout-day-card">
                      <div className="workout-header">
                        <div>
                          <h3>{workout.day} - {workout.name}</h3>
                          <p><FaClock /> {workout.duration} دقيقة</p>
                        </div>
                        {workout.completed && <FaCheckCircle className="completed-icon" />}
                      </div>

                      <div className="exercises-list">
                        {workout.exercises.map((exercise, i) => (
                          <div key={i} className="exercise-card">
                            <div className="exercise-info">
                              <h4>{exercise.name}</h4>
                              <p className="exercise-desc">{exercise.description}</p>
                              
                              <div className="exercise-details">
                                <span><strong>{exercise.sets}</strong> مجموعات</span>
                                <span><strong>{exercise.reps}</strong> تكرار</span>
                                <span><FaClock /> {exercise.rest} راحة</span>
                              </div>

                              <div className="exercise-tips">
                                <strong>نصائح:</strong>
                                <pre>{exercise.tips}</pre>
                              </div>

                              {exercise.videoUrl && (
                                <button className="video-btn">
                                  <FaPlay /> شاهدي الفيديو
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* المحادثات */}
              {activeTab === 'chat' && (
                <div className="chat-section">
                  <div className="trainer-info">
                    <img src="https://ui-avatars.com/api/?name=Rand+Jarar&background=E91E63&color=fff&bold=true" alt="Trainer" />
                    <div>
                      <h3>رند جرار</h3>
                      <p className="online-status">• نشطة الآن</p>
                    </div>
                  </div>

                  <div className="messages-container">
                    {messages.map((msg) => (
                      <div key={msg.id} className={`message ${msg.sender}`}>
                        <div className="message-bubble">
                          <p>{msg.text}</p>
                          <span className="message-time">{msg.time}</span>
                        </div>
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="message trainer">
                        <div className="typing-indicator">
                          <span></span><span></span><span></span>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  <form className="chat-input" onSubmit={handleSendMessage}>
                    <input
                      type="text"
                      placeholder="اكتبي رسالتك..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button type="submit">
                      <FaPaperPlane />
                    </button>
                  </form>
                </div>
              )}

              {/* الدفع */}
              {activeTab === 'payment' && (
                <div className="payment-section">
                  <div className="payment-card">
                    <h3>معلومات الاشتراك</h3>
                    
                    <div className="subscription-status">
                      <span>الحالة:</span>
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusBadge(subscription.status).color }}
                      >
                        {getStatusBadge(subscription.status).text}
                      </span>
                    </div>

                    <div className="detail-row">
                      <span>الباقة</span>
                      <strong>{subscription.plan}</strong>
                    </div>
                    <div className="detail-row">
                      <span>المدة</span>
                      <strong>{subscription.duration} شهر</strong>
                    </div>
                    <div className="detail-row">
                      <span>السعر</span>
                      <strong>{subscription.price} دينار</strong>
                    </div>

                    {subscription.status === 'active' && (
                      <div className="detail-row">
                        <span>الأيام المتبقية</span>
                        <strong className="highlight">{subscription.daysLeft} يوم</strong>
                      </div>
                    )}

                    <div className="upload-receipt">
                      <h4>رفع إيصال الدفع</h4>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleReceiptUpload}
                        style={{ display: 'none' }}
                      />
                      <button
                        className="upload-btn"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <FaUpload /> رفع الإيصال
                      </button>
                      {subscription.paymentReceipt && (
                        <p className="receipt-name">✓ {subscription.paymentReceipt}</p>
                      )}
                    </div>

                    <div className="duration-selector">
                      <h4>اختاري المدة</h4>
                      <div className="duration-options">
                        {[1, 2, 3, 6].map(months => (
                          <button
                            key={months}
                            className={subscription.duration === months ? 'active' : ''}
                            onClick={() => setSubscription({...subscription, duration: months})}
                          >
                            {months} {months === 1 ? 'شهر' : 'أشهر'}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button className="renew-btn">تجديد الاشتراك</button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;