import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaPlay } from 'react-icons/fa';
import './Hero.scss';

const Hero = () => {
  const navigate = useNavigate();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="hero" id="home">
      {/* YouTube Background Video */}
      <div className="hero-video-container">
        <iframe
          className="hero-video"
          src="https://www.youtube.com/embed/-jFk6lUZ6Fg?autoplay=1&mute=1&loop=1&playlist=-jFk6lUZ6Fg&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
          title="Fitness Motivation"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <div className="hero-overlay"></div>
      </div>

      {/* Content */}
      <div className="hero-content">
        <motion.div
          className="hero-text"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="hero-badge"
            variants={itemVariants}
          >
            <span className="badge-dot"></span>
            <span>Personalized Training Program</span>
          </motion.div>

          <motion.h1 
            className="hero-title"
            variants={itemVariants}
          >
            Train Your Body with Confidence
            <br />
            <span className="highlight">A Program Designed Just for You</span>
          </motion.h1>

          <motion.p 
            className="hero-description"
            variants={itemVariants}
          >
            Training and nutrition based on your body, goals, and lifestyle
            <br />
            Start your journey towards the best version of yourself
          </motion.p>

          <motion.div 
            className="hero-buttons"
            variants={itemVariants}
          >
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/auth')}
            >
              Start Now
              <FaArrowRight />
            </button>

            <button 
              className="btn btn-white"
              onClick={() => {
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                  aboutSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <FaPlay />
              Explore Programs
            </button>
          </motion.div>

          <motion.div 
            className="hero-stats"
            variants={itemVariants}
          >
            <div className="stat-item">
              <motion.h3
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                +500
              </motion.h3>
              <p>Happy Trainees</p>
            </div>

            <div className="stat-divider"></div>

            <div className="stat-item">
              <motion.h3
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                +5
              </motion.h3>
              <p>Years Experience</p>
            </div>

            <div className="stat-divider"></div>

            <div className="stat-item">
              <motion.h3
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.4 }}
              >
                98%
              </motion.h3>
              <p>Success Rate</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ 
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="mouse">
          <div className="wheel"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;