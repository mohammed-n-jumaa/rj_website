import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaUserFriends,
  FaAppleAlt,
  FaDumbbell,
  FaChartLine,
  FaCheckCircle
} from 'react-icons/fa';
import './About.scss';

const About = () => {
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
      title: 'تدريب شخصي أونلاين',
      description: 'جلسات تدريب مباشرة ومتابعة يومية'
    },
    {
      id: 2,
      icon: <FaAppleAlt />,
      title: 'أنظمة غذائية مخصصة',
      description: 'خطط تغذية مصممة خصيصاً لك'
    },
    {
      id: 3,
      icon: <FaDumbbell />,
      title: 'تنشيف، نحت، زيادة عضل',
      description: 'برامج شاملة لتحقيق أهدافك'
    },
    {
      id: 4,
      icon: <FaChartLine />,
      title: 'متابعة مستمرة',
      description: 'دعم ومتابعة على مدار الأسبوع'
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
    hidden: { opacity: 0, x: -30 },
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
          {/* Left Column - Trainer Profile */}
          <motion.div
            className="trainer-profile"
            variants={isTablet ? itemVariants : profileVariants}
          >
            <div className="profile-image-wrapper">
              <img
                src="/images/trainer-profile.jpg"
                alt="رند جرار - مدربة لياقة بدنية"
                className="profile-image"
                loading="lazy"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=800&fit=crop';
                }}
              />
              <div className="profile-badge">
                <FaCheckCircle />
                <span>مدربة معتمدة</span>
              </div>
            </div>

            <div className="profile-info">
              <h3 className="trainer-name">رند جرار</h3>
              <p className="trainer-philosophy">
                رحلتك للياقة تبدأ من الداخل، أساعدك على بناء نسخة أقوى وأكثر ثقة منك
              </p>
            </div>
          </motion.div>

          {/* Right Column - About & Services */}
          <motion.div
            className="about-details"
            variants={itemVariants}
          >
            <div className="section-header">
              <span className="section-tag">من أنا</span>
              <h3 className="section-title" style={{ color: "#1C1C1C" }}> عن المدربة</h3>
            </div>
            <div className="experience-text">
              <p>
                <strong>مدربة لياقة بدنية معتمدة دولياً</strong> مع أكثر من <strong>5 سنوات</strong> من الخبرة في تحويل حياة النساء.
                أؤمن بأن كل جسم فريد من نوعه، ولهذا أصمم برامج تدريب وتغذية مخصصة تناسب احتياجاتك وأهدافك الشخصية.
              </p>
              <p>
                ساعدت أكثر من <strong>500 متدربة</strong> على تحقيق أهدافهن في اللياقة والصحة، من خلال برامج شاملة
                تجمع بين التدريب الفعال، التغذية السليمة، والدعم النفسي المستمر.
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
                onClick={() => {
                  // Navigate to programs section or open contact form
                  const contactSection = document.getElementById('programs');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                ابدئي رحلتك الآن
              </motion.button>
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