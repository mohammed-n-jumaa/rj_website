import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaDumbbell, FaFire, FaStar, FaBolt } from 'react-icons/fa';
import './CTA.scss';

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="cta-section">
      <div className="cta-container">
        {/* Floating Fitness Icons */}
        <motion.div 
          className="floating-icon icon-1"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <FaDumbbell />
        </motion.div>

        <motion.div 
          className="floating-icon icon-2"
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, -10, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        >
          <FaFire />
        </motion.div>

        <motion.div 
          className="floating-icon icon-3"
          animate={{ 
            y: [0, -25, 0],
            rotate: [0, 15, 0]
          }}
          transition={{ 
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <FaStar />
        </motion.div>

        <motion.div 
          className="floating-icon icon-4"
          animate={{ 
            y: [0, -18, 0],
            rotate: [0, -12, 0]
          }}
          transition={{ 
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        >
          <FaBolt />
        </motion.div>

        <div className="cta-content">
          {/* Energy Burst Animation */}
          <motion.div 
            className="energy-burst"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ 
              scale: [0, 1.5, 1],
              opacity: [0, 0.6, 0]
            }}
            viewport={{ once: true }}
            transition={{ 
              duration: 1.5,
              ease: "easeOut"
            }}
          />

          {/* Main Title with Split Animation */}
          <motion.div
            className="title-container"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2 
              className="cta-title"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <motion.span
                className="title-word"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Ready
              </motion.span>
              {' '}
              <motion.span
                className="title-word"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                to Start
              </motion.span>
              {' '}
              <motion.span
                className="title-word highlight"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Your Transformation?
              </motion.span>
            </motion.h2>

            {/* Animated Underline */}
            <motion.div 
              className="title-underline"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            />
          </motion.div>

          {/* Description with Fade In */}
          <motion.p 
            className="cta-description"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            Join over 500 trainees who have achieved their fitness and health goals
          </motion.p>

          {/* Animated Button with Pulse Effect */}
          <motion.div 
            className="cta-button-wrapper"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.9 }}
          >
            <motion.button 
              className="cta-main-button"
              onClick={() => navigate('/auth')}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 15px 40px rgba(233, 30, 99, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="button-text"
                animate={{ 
                  x: [0, 3, 0]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Book Now
              </motion.span>
              <motion.div
                className="button-icon"
                animate={{ 
                  x: [0, 5, 0]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <FaArrowRight />
              </motion.div>
            </motion.button>

            {/* Pulse Rings Around Button */}
            <motion.div 
              className="button-pulse"
              animate={{
                scale: [1, 1.5, 1.5],
                opacity: [0.5, 0, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          </motion.div>

          {/* Features with Stagger Animation */}
          <motion.div 
            className="features-list"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 1.1
                }
              }
            }}
          >
            {[
              { icon: <FaDumbbell />, text: 'Customized Programs' },
              { icon: <FaFire />, text: 'Guaranteed Results' },
              { icon: <FaStar />, text: 'Daily Follow-up' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="feature-item"
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.8 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }
                  }
                }}
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div 
                  className="feature-icon"
                  animate={{ 
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                >
                  {feature.icon}
                </motion.div>
                <span className="feature-text">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="cta-decoration">
        <div className="decoration-circle circle-1"></div>
        <div className="decoration-circle circle-2"></div>
      </div>
    </section>
  );
};

export default CTA;