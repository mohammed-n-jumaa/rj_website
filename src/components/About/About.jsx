import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FaUserFriends,
  FaAppleAlt,
  FaDumbbell,
  FaChartLine,
  FaCheckCircle
} from 'react-icons/fa';
import './About.scss';

const About = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth <= 1024 && window.innerWidth > 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const services = [
    {
      id: 1,
      icon: <FaUserFriends />,
      title: 'Online Personal Training',
      description: 'Live training sessions and daily follow-up'
    },
    {
      id: 2,
      icon: <FaAppleAlt />,
      title: 'Custom Nutrition Plans',
      description: 'Nutrition plans designed specifically for you'
    },
    {
      id: 3,
      icon: <FaDumbbell />,
      title: 'Cutting, Sculpting, Bulking',
      description: 'Comprehensive programs to achieve your goals'
    },
    {
      id: 4,
      icon: <FaChartLine />,
      title: 'Continuous Monitoring',
      description: 'Support and follow-up throughout the week'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const profileVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="about" id="about">
      <div className="about-container">
        <motion.div
          className="about-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Left Column - About & Services */}
          <motion.div
            className="about-details"
            variants={itemVariants}
          >
            <div className="section-header">
              <span className="section-tag">Who I Am</span>
              <h3 className="section-title" style={{ color: "#1C1C1C" }}>About the Coach</h3>
            </div>
            <div className="experience-text">
              <p>
                <strong>Internationally certified fitness coach</strong> with over <strong>5 years</strong> of experience transforming women's lives.
                I believe that every body is unique, which is why I design personalized training and nutrition programs that suit your needs and personal goals.
              </p>
              <p>
                I've helped over <strong>500 trainees</strong> achieve their fitness and health goals through comprehensive programs
                that combine effective training, proper nutrition, and continuous psychological support.
              </p>
            </div>

            <div className="services-grid">
              {services.map((service) => (
                <motion.div
                  key={service.id}
                  className="service-card"
                  variants={itemVariants}
                  whileHover={!isMobile ? {
                    y: -3,
                    transition: { duration: 0.2 }
                  } : {}}
                  whileTap={isMobile ? { scale: 0.98 } : {}}
                >
                  <div className="service-icon">
                    {service.icon}
                  </div>
                  <div className="service-content">
                    <h4>{service.title}</h4>
                    <p>{service.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="about-cta">
              <motion.button
                className="cta-button"
                whileHover={!isMobile ? { scale: 1.05 } : {}}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/auth')}
              >
                Start Your Journey Now
              </motion.button>
            </div>
          </motion.div>

          {/* Right Column - Trainer Profile */}
          <motion.div
            className="trainer-profile"
            variants={isTablet ? itemVariants : profileVariants}
          >
            <div className="profile-image-wrapper">
              <img
                src="/images/trainer-profile.jpg"
                alt="Rand Jarar - Fitness Coach"
                className="profile-image"
                loading="lazy"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=800&fit=crop';
                }}
              />
              <div className="profile-badge">
                <FaCheckCircle />
                <span>Certified Coach</span>
              </div>
            </div>

            <div className="profile-info">
              <h3 className="trainer-name">Rand Jarar</h3>
              <p className="trainer-philosophy">
                Your fitness journey starts from within, I help you build a stronger and more confident version of yourself
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="decorative-circle circle-1"></div>
      <div className="decorative-circle circle-2"></div>
    </section>
  );
};

export default About;