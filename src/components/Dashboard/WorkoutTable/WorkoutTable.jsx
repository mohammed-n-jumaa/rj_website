import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaDumbbell, 
  FaCheckCircle,
  FaCircle,
  FaPlay,
  FaImage,
  FaFire,
  FaClock,
  FaRedoAlt
} from 'react-icons/fa';
import './WorkoutTable.scss';

const WorkoutTable = ({ workoutData }) => {
  const [selectedDay, setSelectedDay] = useState(0);
  const [checkedExercises, setCheckedExercises] = useState([]);
  const [showVideo, setShowVideo] = useState(null);

  const weekDays = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

  const workouts = workoutData || [
    {
      day: 'الأحد',
      type: 'Upper Body',
      icon: '💪',
      color: '#E91E63',
      exercises: [
        {
          id: 1,
          name: 'Bench Press',
          nameAr: 'ضغط البنش',
          sets: 4,
          reps: '10-12',
          rest: '60 ثانية',
          videoUrl: 'https://example.com/bench-press',
          imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
          tips: 'حافظي على الظهر مستقيم'
        },
        {
          id: 2,
          name: 'Shoulder Press',
          nameAr: 'ضغط الأكتاف',
          sets: 3,
          reps: '12-15',
          rest: '45 ثانية',
          videoUrl: 'https://example.com/shoulder-press',
          imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400',
          tips: 'لا ترفعي الأوزان فوق الرأس مباشرة'
        },
        {
          id: 3,
          name: 'Bicep Curls',
          nameAr: 'تمرين الباي',
          sets: 3,
          reps: '15',
          rest: '30 ثانية',
          videoUrl: 'https://example.com/bicep-curls',
          imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400',
          tips: 'حركة بطيئة ومتحكم فيها'
        }
      ]
    },
    {
      day: 'الإثنين',
      type: 'Lower Body',
      icon: '🦵',
      color: '#9C27B0',
      exercises: [
        {
          id: 4,
          name: 'Squats',
          nameAr: 'السكوات',
          sets: 4,
          reps: '12-15',
          rest: '90 ثانية',
          videoUrl: 'https://example.com/squats',
          imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400',
          tips: 'الركبة لا تتجاوز أصابع القدم'
        },
        {
          id: 5,
          name: 'Lunges',
          nameAr: 'اللانج',
          sets: 3,
          reps: '12 كل رجل',
          rest: '60 ثانية',
          videoUrl: 'https://example.com/lunges',
          imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400',
          tips: 'حافظي على التوازن'
        }
      ]
    },
    {
      day: 'الثلاثاء',
      type: 'Cardio & Abs',
      icon: '🏃‍♀️',
      color: '#2196F3',
      exercises: [
        {
          id: 6,
          name: 'Running',
          nameAr: 'الجري',
          sets: 1,
          reps: '30 دقيقة',
          rest: '-',
          videoUrl: 'https://example.com/running',
          imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400',
          tips: 'حافظي على وتيرة ثابتة'
        },
        {
          id: 7,
          name: 'Plank',
          nameAr: 'البلانك',
          sets: 3,
          reps: '60 ثانية',
          rest: '30 ثانية',
          videoUrl: 'https://example.com/plank',
          imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
          tips: 'الجسم بخط مستقيم'
        }
      ]
    }
  ];

  const currentWorkout = workouts[selectedDay] || workouts[0];
  const totalExercises = currentWorkout.exercises.length;
  const completedExercises = currentWorkout.exercises.filter(ex => 
    checkedExercises.includes(ex.id)
  ).length;
  const progressPercentage = (completedExercises / totalExercises) * 100;

  const handleExerciseCheck = (exerciseId) => {
    setCheckedExercises(prev => 
      prev.includes(exerciseId) 
        ? prev.filter(id => id !== exerciseId)
        : [...prev, exerciseId]
    );
  };

  return (
    <div className="workout-table-section">
      {/* Header */}
      <div className="workout-header">
        <div className="header-title">
          <FaDumbbell />
          <div>
            <h2>جدول التمارين</h2>
            <p>اتبعي البرنامج وحققي أهدافك</p>
          </div>
        </div>

        <div className="workout-stats">
          <div className="stat-item">
            <FaFire className="stat-icon" />
            <div>
              <p className="stat-value">{completedExercises}/{totalExercises}</p>
              <p className="stat-label">تمارين اليوم</p>
            </div>
          </div>
          <div className="stat-item">
            <FaClock className="stat-icon" />
            <div>
              <p className="stat-value">45</p>
              <p className="stat-label">دقيقة</p>
            </div>
          </div>
        </div>
      </div>

      {/* Days Selector */}
      <div className="days-selector">
        {workouts.map((workout, index) => (
          <motion.button
            key={index}
            className={`day-button ${selectedDay === index ? 'active' : ''}`}
            onClick={() => setSelectedDay(index)}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            style={{ 
              '--day-color': workout.color,
              borderColor: selectedDay === index ? workout.color : 'transparent'
            }}
          >
            <span className="day-icon">{workout.icon}</span>
            <span className="day-name">{workout.day}</span>
            <span className="day-type">{workout.type}</span>
          </motion.button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="workout-progress">
        <div className="progress-header">
          <span>التقدم اليومي</span>
          <span className="progress-percentage">{Math.round(progressPercentage)}%</span>
        </div>
        <div className="progress-bar-container">
          <motion.div 
            className="progress-bar"
            style={{ backgroundColor: currentWorkout.color }}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Exercises List */}
      <div className="exercises-list">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDay}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentWorkout.exercises.map((exercise, index) => (
              <motion.div
                key={exercise.id}
                className={`exercise-card ${checkedExercises.includes(exercise.id) ? 'checked' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -3 }}
              >
                <div className="exercise-image">
                  <img src={exercise.imageUrl} alt={exercise.nameAr} />
                  <div className="exercise-overlay">
                    <button 
                      className="play-button"
                      onClick={() => setShowVideo(exercise.videoUrl)}
                    >
                      <FaPlay />
                    </button>
                  </div>
                  {checkedExercises.includes(exercise.id) && (
                    <div className="checked-badge">
                      <FaCheckCircle />
                    </div>
                  )}
                </div>

                <div className="exercise-content">
                  <div className="exercise-header">
                    <div className="exercise-title">
                      <h4>{exercise.nameAr}</h4>
                      <p className="exercise-name-en">{exercise.name}</p>
                    </div>
                    
                    <motion.button
                      className="check-button"
                      onClick={() => handleExerciseCheck(exercise.id)}
                      whileTap={{ scale: 0.9 }}
                    >
                      {checkedExercises.includes(exercise.id) ? (
                        <FaCheckCircle />
                      ) : (
                        <FaCircle />
                      )}
                    </motion.button>
                  </div>

                  <div className="exercise-details">
                    <div className="detail-item">
                      <FaRedoAlt className="detail-icon" />
                      <div>
                        <p className="detail-label">الجولات</p>
                        <p className="detail-value">{exercise.sets}</p>
                      </div>
                    </div>
                    <div className="detail-item">
                      <FaDumbbell className="detail-icon" />
                      <div>
                        <p className="detail-label">التكرارات</p>
                        <p className="detail-value">{exercise.reps}</p>
                      </div>
                    </div>
                    <div className="detail-item">
                      <FaClock className="detail-icon" />
                      <div>
                        <p className="detail-label">الراحة</p>
                        <p className="detail-value">{exercise.rest}</p>
                      </div>
                    </div>
                  </div>

                  {exercise.tips && (
                    <div className="exercise-tips">
                      <span className="tips-icon">💡</span>
                      <p>{exercise.tips}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Completion Message */}
      {progressPercentage === 100 && (
        <motion.div 
          className="completion-message"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <span className="emoji">🎉</span>
          <h3>مذهل! أكملتي تمارين اليوم</h3>
          <p>أنت تقتربين من هدفك كل يوم!</p>
        </motion.div>
      )}

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div 
            className="video-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowVideo(null)}
          >
            <motion.div 
              className="video-content"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-button" onClick={() => setShowVideo(null)}>✕</button>
              <iframe
                width="100%"
                height="400"
                src={showVideo}
                title="Exercise Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WorkoutTable;