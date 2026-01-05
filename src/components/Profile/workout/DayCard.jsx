import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import ExercisesList from './ExercisesList';

const DayCard = ({ day, dayIndex, isExpanded, onToggle }) => {
  const isRestDay = day.exercises.length === 0;

  return (
    <motion.div
      className={`day-card ${isExpanded ? 'expanded' : ''} ${isRestDay ? 'rest-day' : ''}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: dayIndex * 0.05 }}
    >
      <div className="day-header" onClick={onToggle}>
        <div className="day-info">
          <h3>{day.day}</h3>
          <p>{day.title}</p>
        </div>
        <div className="day-stats">
          {!isRestDay ? (
            <>
              <span className="exercise-count">{day.exercises.length} تمارين</span>
              <motion.div
                className="expand-icon"
                animate={{ rotate: isExpanded ? 180 : 0 }}
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
        {isExpanded && !isRestDay && (
          <ExercisesList exercises={day.exercises} dayIndex={dayIndex} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DayCard;