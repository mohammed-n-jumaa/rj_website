import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteRight, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Testimonials.scss';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Ahmed',
      profession: 'Architect',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      feedback: 'Amazing experience! Lost 12 kg in 3 months with Rand\'s personalized program. The support and continuous follow-up were outstanding',
      rating: 5
    },
    {
      id: 2,
      name: 'Layla Mahmoud',
      profession: 'Doctor',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
      feedback: 'Best trainer I\'ve ever worked with! The cutting program was very effective and results showed quickly. Thank you Rand',
      rating: 5
    },
    {
      id: 3,
      name: 'Nour Aldin',
      profession: 'Graphic Designer',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
      feedback: 'Online training was so convenient for me. Rand is professional and understands your needs perfectly',
      rating: 5
    },
    {
      id: 4,
      name: 'Mariam Khaled',
      profession: 'Marketing Manager',
      image: 'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=400&h=400&fit=crop',
      feedback: 'The nutrition program was perfectly suited to my busy lifestyle. Lost weight and gained energy and confidence',
      rating: 5
    },
    {
      id: 5,
      name: 'Dana Saeed',
      profession: 'Pharmacist',
      image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&h=400&fit=crop',
      feedback: 'The continuous follow-up and motivation that Rand provides is unmatched! Thank you for everything',
      rating: 5
    },
    {
      id: 6,
      name: 'Reem Abdullah',
      profession: 'Teacher',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
      feedback: 'My life changed after I started with Rand! Not just my body, even my mental health improved significantly',
      rating: 5
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getCardsToShow = () => {
    if (windowWidth <= 768) return 1;
    if (windowWidth <= 1024) return 2;
    return 3;
  };

  const cardsToShow = getCardsToShow();

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => 
      prev + cardsToShow >= testimonials.length ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => 
      prev === 0 ? testimonials.length - cardsToShow : prev - 1
    );
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < cardsToShow; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push(testimonials[index]);
    }
    return visible;
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <section className="testimonials" id="testimonials">
      <div className="testimonials-container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Client Reviews</span>
          <h2 className="section-title">Inspiring Success Stories</h2>
          <p className="section-description">
            Listen to our clients' experiences and how they changed their lives for the better
          </p>
        </motion.div>

        <div className="testimonials-slider">
          <button 
            className="slider-btn slider-btn-prev" 
            onClick={handlePrev}
            aria-label="Previous testimonials"
          >
            <FaChevronLeft />
          </button>

          <div className="testimonials-track">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="testimonials-grid"
              >
                {getVisibleTestimonials().map((testimonial) => (
                  <motion.div
                    key={testimonial.id}
                    className="testimonial-card"
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="quote-icon">
                      <FaQuoteRight />
                    </div>

                    <div className="card-header">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="testimonial-image"
                      />
                      <div className="testimonial-info">
                        <h4 className="testimonial-name">{testimonial.name}</h4>
                        <p className="testimonial-profession">{testimonial.profession}</p>
                      </div>
                    </div>

                    <div className="rating">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} className="star" />
                      ))}
                    </div>

                    <p className="testimonial-feedback">
                      {testimonial.feedback}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <button 
            className="slider-btn slider-btn-next" 
            onClick={handleNext}
            aria-label="Next testimonials"
          >
            <FaChevronRight />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="pagination-dots">
          {Array.from({ length: Math.ceil(testimonials.length / cardsToShow) }).map((_, index) => (
            <button
              key={index}
              className={`dot ${Math.floor(currentIndex / cardsToShow) === index ? 'active' : ''}`}
              onClick={() => {
                setDirection(index > Math.floor(currentIndex / cardsToShow) ? 1 : -1);
                setCurrentIndex(index * cardsToShow);
              }}
              aria-label={`Go to testimonial group ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Decorative Background */}
      <div className="testimonials-bg">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
      </div>
    </section>
  );
};

export default Testimonials;