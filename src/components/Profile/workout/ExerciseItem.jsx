import { motion } from 'framer-motion';
import { FaCheckCircle, FaPlayCircle } from 'react-icons/fa';

const ExerciseItem = ({ exercise, dayIndex, exerciseIndex }) => {
  const handleCheckToggle = () => {
    // Handle exercise check toggle
  };

  return (
    <div className={`exercise-item ${exercise.checked ? 'checked' : ''}`}>
      <motion.button
        className={`check-btn ${exercise.checked ? 'checked' : ''}`}
        onClick={handleCheckToggle}
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
  );
};

export default ExerciseItem;