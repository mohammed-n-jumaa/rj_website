import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import ExercisesList from './ExercisesList';

const DayCard = ({ day, dayIndex, isExpanded, onToggle }) => {
  const isRestDay = day.exercises.length === 0;

  return (
    <motion.div
      className={`day-card ${isRestDay ? 'rest-day' : ''} ${isExpanded ? 'expanded' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: dayIndex * 0.1 }}
    >
      <div className="day-header" onClick={onToggle}>
        <div className="day-info">
          <h3>{day.day}</h3>
          <p>{day.title}</p>
        </div>

        <div className="day-stats">
          {!isRestDay ? (
            <>
              <span className="exercise-count">{day.exercises.length} exercises</span>
              <FaChevronDown
                className="expand-icon"
                style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
              />
            </>
          ) : (
            <span className="rest-label">Rest</span>
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