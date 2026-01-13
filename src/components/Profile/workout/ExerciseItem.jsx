import { motion } from 'framer-motion';
import { FaCheckCircle, FaPlayCircle, FaYoutube } from 'react-icons/fa';

const ExerciseItem = ({ exercise, dayIndex, exerciseIndex }) => {
  const handleCheckToggle = () => {
    // Handle exercise check toggle
  };

  const handleVideoClick = (e) => {
    e.stopPropagation();
    if (exercise.videoUrl) {
      // فتح رابط الفيديو في تاب جديد
      window.open(exercise.videoUrl, '_blank');
      console.log('Opening video:', exercise.videoUrl);
    }
  };

  const handleYoutubeClick = (e) => {
    e.stopPropagation();
    if (exercise.youtubeUrl) {
      // فتح رابط يوتيوب في تاب جديد
      window.open(exercise.youtubeUrl, '_blank');
      console.log('Opening YouTube:', exercise.youtubeUrl);
    }
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
      
      <div className="exercise-actions">
        {exercise.videoUrl && (
          <motion.button
            className="video-btn"
            onClick={handleVideoClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="مشاهدة الفيديو"
          >
            <FaPlayCircle />
          </motion.button>
        )}
        
        {exercise.youtubeUrl && (
          <motion.button
            className="youtube-btn"
            onClick={handleYoutubeClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="مشاهدة على يوتيوب"
          >
            <FaYoutube />
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default ExerciseItem;