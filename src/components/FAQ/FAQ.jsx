import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaQuestionCircle, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import './FAQ.scss';

const FAQ = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [formData, setFormData] = useState({ question: '', contact: '' });
  const [searchQuery, setSearchQuery] = useState('');

  const faqData = [
    {
      id: 1,
      question: 'Where do I start?',
      answer: 'The beginning is not your strength, it\'s your decision. Simply choose your plan, and we\'ll guide you through every step of your transformation journey.',
      icon: '🚀',
      category: 'Getting Started'
    },
    {
      id: 2,
      question: 'I\'m afraid I won\'t continue...',
      answer: 'Most trainees started with the same feeling. Our supportive community and personalized approach ensure you stay motivated throughout your journey.',
      icon: '💪',
      category: 'Motivation'
    },
    {
      id: 3,
      question: 'What about my privacy?',
      answer: 'Your privacy is a red line. All your personal information and training data are encrypted and protected with the highest security standards.',
      icon: '🔒',
      category: 'Privacy & Security'
    },
    {
      id: 4,
      question: 'I have limited time',
      answer: '30 minutes is enough when done right. Our efficient workout programs are designed to maximize results in minimal time.',
      icon: '⏱️',
      category: 'Time Management'
    },
    {
      id: 5,
      question: 'When will I see results?',
      answer: 'The difference starts before it shows. You\'ll feel changes in energy and strength within the first week, with visible results in 3-4 weeks.',
      icon: '📈',
      category: 'Results'
    },
    {
      id: 6,
      question: 'Is it online training?',
      answer: 'Yes! From your home and at your time. Access all workouts, nutrition plans, and coaching through our app anytime, anywhere.',
      icon: '🌐',
      category: 'Training Format'
    },
    {
      id: 7,
      question: 'Do I need equipment?',
      answer: 'No, your body and motivation are enough. We offer both equipment-free and gym-based programs to suit your preferences.',
      icon: '🏋️',
      category: 'Equipment'
    },
    {
      id: 8,
      question: 'What about diet?',
      answer: 'Flexible with no deprivation. Our nutrition plans are customized to your lifestyle, preferences, and goals - no extreme restrictions.',
      icon: '🥗',
      category: 'Nutrition'
    }
  ];



  const categories = [...new Set(faqData.map(q => q.category))];

  const filteredQuestions = faqData.filter(q => 
    q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleQuestionClick = (id) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    Swal.fire({
      title: 'Thank you! 💕',
      text: 'Your question will be answered soon',
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: '#E91E63',
      iconColor: '#E91E63',
      background: '#fff',
      customClass: {
        popup: 'faq-swal-popup',
        title: 'faq-swal-title',
        confirmButton: 'faq-swal-button'
      }
    });
    
    setFormData({ question: '', contact: '' });
  };

  return (
    <div className="faq-container">
      {/* Hero Section */}
      <motion.div 
        className="faq-hero"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="hero-icon"
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <FaQuestionCircle />
        </motion.div>
        <h1 className="faq-title">Frequently Asked Questions</h1>
        <p className="faq-subtitle">Everything you need to know about your fitness journey 🤍</p>
        
        {/* Search Bar */}
        <motion.div 
          className="faq-search"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <input
            type="text"
            placeholder="Search for answers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaQuestionCircle className="search-icon" />
        </motion.div>
      </motion.div>

      {/* Stats Section */}
      <motion.div 
        className="faq-stats"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="stat-item">
          <span className="stat-number">{faqData.length}</span>
          <span className="stat-label">Questions Answered</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">24/7</span>
          <span className="stat-label">Support Available</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">100%</span>
          <span className="stat-label">Response Rate</span>
        </div>
      </motion.div>

      {/* FAQ Accordion */}
      <div className="faq-content">
        <motion.div 
          className="faq-list"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {filteredQuestions.map((faq, index) => (
            <motion.div
              key={faq.id}
              className={`faq-item ${activeQuestion === faq.id ? 'active' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div 
                className="faq-question"
                onClick={() => handleQuestionClick(faq.id)}
              >
                <div className="question-left">
                  <span className="question-icon">{faq.icon}</span>
                  <div className="question-content">
                    <span className="question-category">{faq.category}</span>
                    <h3>{faq.question}</h3>
                  </div>
                </div>
                <motion.div
                  className="question-toggle"
                  animate={{ rotate: activeQuestion === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaChevronDown />
                </motion.div>
              </div>

              <AnimatePresence>
                {activeQuestion === faq.id && (
                  <motion.div
                    className="faq-answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="answer-content">
                      <FaCheckCircle className="check-icon" />
                      <p>{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Custom Question Form */}
        <motion.div 
          id="custom-question-form"
          className="custom-question-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="form-header">
            <div className="header-icon">💬</div>
            <h2>Still Have Questions?</h2>
            <p>Ask us anything! We're here to help you succeed</p>
          </div>

          <form onSubmit={handleSubmit} className="question-form">
            <div className="form-group">
              <label>Your Question</label>
              <textarea
                placeholder="What would you like to know?"
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                required
                rows="4"
              />
            </div>

            <div className="form-group">
              <label>Contact Information</label>
              <input
                type="text"
                placeholder="Your email or phone number"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                required
              />
            </div>

            <motion.button
              type="submit"
              className="submit-button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaPaperPlane />
              Send Your Question
            </motion.button>

            <p className="form-note">
              We'll respond within 24 hours 💕
            </p>
          </form>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="faq-decorations">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-shape"
            style={{
              left: `${(i * 12.5) + 5}%`,
              top: `${Math.random() * 80 + 10}%`
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              rotate: [0, 360]
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              delay: i * 0.5
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQ;