import { motion } from 'framer-motion';
import { FaArrowLeft, FaPlay } from 'react-icons/fa';
import './Hero.scss';

const Hero = () => {
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
            <span>برنامج تدريبي مخصص لكِ</span>
          </motion.div>

          <motion.h1 
            className="hero-title"
            variants={itemVariants}
          >
            درّبي جسمك بثقة
            <br />
            <span className="highlight">برنامج مصمم خصيصًا لك</span>
          </motion.h1>

          <motion.p 
            className="hero-description"
            variants={itemVariants}
          >
            تدريب وتغذية مبنية على جسمك، هدفك، ونمط حياتك
            <br />
            ابدئي رحلتك نحو النسخة الأفضل منك
          </motion.p>

          <motion.div 
            className="hero-buttons"
            variants={itemVariants}
          >
            <button className="btn btn-primary">
              ابدئي الآن
              <FaArrowLeft />
            </button>

            <button className="btn btn-white">
              <FaPlay />
              تعرفي على البرامج
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
              <p>متدربة سعيدة</p>
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
              <p>سنوات خبرة</p>
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
              <p>نسبة النجاح</p>
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