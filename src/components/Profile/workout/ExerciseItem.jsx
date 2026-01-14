import { motion } from 'framer-motion';
import { FaCheckCircle, FaPlayCircle, FaYoutube } from 'react-icons/fa';

const ExerciseItem = ({ exercise, dayIndex, exerciseIndex }) => {
  const handleCheckToggle = () => {
    // Handle exercise check toggle
  };

  const handleVideoClick = (e) => {
    e.stopPropagation();
    if (exercise.videoUrl) {
      // Open video link in new tab
      window.open(exercise.videoUrl, '_blank');
      console.log('Opening video:', exercise.videoUrl);
    }
  };

  const handleYoutubeClick = (e) => {
    e.stopPropagation();
    if (exercise.youtubeUrl) {
      // Open YouTube link in new tab
      window.open(exercise.youtubeUrl, '_blank');
      console.log('Opening YouTube:', exercise.youtubeUrl);
    }
  };

  return (
    <motion.div
      className={`exercise-item ${exercise.checked ? 'checked' : ''}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: exerciseIndex * 0.05 }}
    >
      <button
        className={`check-btn ${exercise.checked ? 'checked' : ''}`}
        onClick={handleCheckToggle}
      >
        {exercise.checked && <FaCheckCircle />}
      </button>

      <div className="exercise-info">
        <h5>{exercise.name}</h5>
        <span className="exercise-details">
          {exercise.sets} sets × {exercise.reps} reps
        </span>
      </div>

      <div className="exercise-actions">
        {exercise.videoUrl && (
          <motion.button
            className="video-btn"
            onClick={handleVideoClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="Watch Video"
          >
            <FaPlayCircle />
          </motion.button>
        )}

        {exercise.youtubeUrl && (
          <motion.button
            className="youtube-btn"
            onClick={handleYoutubeClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="Watch on YouTube"
          >
            <FaYoutube />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default ExerciseItem;