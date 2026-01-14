import { motion } from 'framer-motion';
import './LoadingSpinner.scss';

const LoadingSpinner = ({ fullScreen = true, message = 'Loading...' }) => {
  return (
    <motion.div 
      className={`loading-spinner ${fullScreen ? 'fullscreen' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="spinner-content">
        <motion.div 
          className="spinner-image"
          animate={{ 
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <img 
            src="/Jumping Lunges.gif" 
            alt="Loading..." 
          />
        </motion.div>
        
        <motion.h3
          className="spinner-message"
          animate={{ 
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {message}
        </motion.h3>
        
        <div className="spinner-dots">
          <motion.span
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
          >
            .
          </motion.span>
          <motion.span
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
          >
            .
          </motion.span>
          <motion.span
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
          >
            .
          </motion.span>
        </div>

        <motion.div 
          className="spinner-bar"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: [0, 1, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.div>
  );
};

export default LoadingSpinner;