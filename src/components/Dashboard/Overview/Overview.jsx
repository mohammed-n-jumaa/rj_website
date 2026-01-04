import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaUser, 
  FaRuler, 
  FaWeight, 
  FaBirthdayCake, 
  FaBullseye,
  FaCalendarAlt,
  FaDollarSign,
  FaCheckCircle,
  FaClock
} from 'react-icons/fa';
import './Overview.scss';

const Overview = ({ userData }) => {
  const stats = [
    { 
      icon: <FaRuler />, 
      label: 'الطول', 
      value: `${userData?.height || 165} cm`,
      color: '#E91E63'
    },
    { 
      icon: <FaWeight />, 
      label: 'الوزن الحالي', 
      value: `${userData?.weight || 70} kg`,
      color: '#9C27B0'
    },
    { 
      icon: <FaBirthdayCake />, 
      label: 'العمر', 
      value: `${userData?.age || 25} سنة`,
      color: '#2196F3'
    },
    { 
      icon: <FaBullseye />, 
      label: 'الهدف', 
      value: userData?.goal || 'خسارة وزن',
      color: '#FF9800'
    }
  ];

  const subscription = {
    price: userData?.subscription?.price || '200',
    duration: userData?.subscription?.duration || '3 أشهر',
    status: userData?.subscription?.status || 'paid', // 'paid' or 'pending'
    startDate: userData?.subscription?.startDate || '2024-01-01',
    endDate: userData?.subscription?.endDate || '2024-04-01',
    daysLeft: userData?.subscription?.daysLeft || 45
  };

  return (
    <div className="overview-section">
      {/* Welcome Banner */}
      <motion.div 
        className="welcome-banner"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="banner-content">
          <div className="welcome-text">
            <h2>مرحباً، {userData?.name || 'أميرة'}! 👋</h2>
            <p>جاهزة لتحقيق أهدافك اليوم؟</p>
          </div>
          <div className="profile-avatar">
            <img 
              src={userData?.avatar || 'https://ui-avatars.com/api/?name=Amira&background=E91E63&color=fff&size=80'} 
              alt="Profile" 
            />
            <div className="online-badge"></div>
          </div>
        </div>
      </motion.div>

      {/* Personal Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="stat-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}
            style={{ '--stat-color': stat.color }}
          >
            <div className="stat-icon">
              {stat.icon}
            </div>
            <div className="stat-info">
              <p className="stat-label">{stat.label}</p>
              <h3 className="stat-value">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Subscription Card */}
      <motion.div 
        className="subscription-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="subscription-header">
          <h3>
            <FaCalendarAlt /> اشتراكك الحالي
          </h3>
          <span className={`status-badge ${subscription.status}`}>
            {subscription.status === 'paid' ? (
              <>
                <FaCheckCircle /> مدفوع
              </>
            ) : (
              <>
                <FaClock /> بانتظار الدفع
              </>
            )}
          </span>
        </div>

        <div className="subscription-details">
          <div className="detail-row">
            <div className="detail-item">
              <FaDollarSign className="detail-icon" />
              <div>
                <p className="detail-label">السعر</p>
                <p className="detail-value">{subscription.price} دينار</p>
              </div>
            </div>
            <div className="detail-item">
              <FaCalendarAlt className="detail-icon" />
              <div>
                <p className="detail-label">المدة</p>
                <p className="detail-value">{subscription.duration}</p>
              </div>
            </div>
          </div>

          <div className="subscription-timeline">
            <div className="timeline-item">
              <span className="timeline-label">بداية الاشتراك</span>
              <span className="timeline-date">{subscription.startDate}</span>
            </div>
            <div className="timeline-progress">
              <div 
                className="progress-bar"
                style={{ 
                  width: `${((90 - subscription.daysLeft) / 90) * 100}%` 
                }}
              ></div>
            </div>
            <div className="timeline-item">
              <span className="timeline-label">نهاية الاشتراك</span>
              <span className="timeline-date">{subscription.endDate}</span>
            </div>
          </div>

          {subscription.daysLeft <= 30 && (
            <motion.div 
              className="renewal-alert"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <FaClock />
              <span>باقي {subscription.daysLeft} يوم على انتهاء اشتراكك</span>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="quick-stats">
        <motion.div 
          className="quick-stat"
          whileHover={{ scale: 1.05 }}
        >
          <div className="quick-stat-icon streak">🔥</div>
          <div className="quick-stat-info">
            <h4>7</h4>
            <p>أيام متتالية</p>
          </div>
        </motion.div>

        <motion.div 
          className="quick-stat"
          whileHover={{ scale: 1.05 }}
        >
          <div className="quick-stat-icon progress">💪</div>
          <div className="quick-stat-info">
            <h4>85%</h4>
            <p>نسبة الإنجاز</p>
          </div>
        </motion.div>

        <motion.div 
          className="quick-stat"
          whileHover={{ scale: 1.05 }}
        >
          <div className="quick-stat-icon calories">🍎</div>
          <div className="quick-stat-info">
            <h4>1,450</h4>
            <p>سعرة اليوم</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Overview;