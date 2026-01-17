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
      question: 'I\'m a beginner, does the program suit me?',
      answer: 'Of course, our programs progress from zero to professional level.',
      icon: '🚀',
      category: 'General Questions'
    },
    {
      id: 2,
      question: 'Do I need to train at the gym?',
      answer: 'No, we provide home workout plans (bodyweight) and gym plans as well.',
      icon: '🏋️',
      category: 'General Questions'
    },
    {
      id: 3,
      question: 'Is the diet restrictive?',
      answer: 'Not at all, our system is flexible and based on calorie counting with the foods you love.',
      icon: '🥗',
      category: 'Nutrition'
    },
    {
      id: 4,
      question: 'Are there vegetarian options?',
      answer: 'Yes, plans are available for all types of dietary preferences and allergies.',
      icon: '🌱',
      category: 'Nutrition'
    },
    {
      id: 5,
      question: 'When will results appear?',
      answer: 'With commitment, you will notice a real difference within 4 to 8 weeks.',
      icon: '📈',
      category: 'Results & Follow-up'
    },
    {
      id: 6,
      question: 'Is there personal follow-up?',
      answer: 'Yes, depending on your plan you can communicate directly with the coach.',
      icon: '💬',
      category: 'Results & Follow-up'
    },
    {
      id: 7,
      question: 'How do I access the program?',
      answer: 'Through your phone or computer anytime and from anywhere.',
      icon: '🌐',
      category: 'Subscription'
    },
    {
      id: 8,
      question: 'Can I cancel my subscription?',
      answer: 'Yes, you can cancel or modify your subscription easily with one click.',
      icon: '✅',
      category: 'Subscription'
    },
    // New Questions - المرونة والوقت
    {
      id: 9,
      question: 'My schedule is busy, can I commit?',
      answer: 'Yes, our workouts are short and effective (30-45 minutes) and fit any schedule.',
      icon: '⏰',
      category: 'Flexibility & Time'
    },
    {
      id: 10,
      question: 'Can I change the workout time?',
      answer: 'Of course, workouts and schedules are available to you 24/7.',
      icon: '🔄',
      category: 'Flexibility & Time'
    },
    // New Questions - الأكل والميزانية
    {
      id: 11,
      question: 'Is the food expensive?',
      answer: 'Not at all, we rely on available home food and your budget.',
      icon: '💰',
      category: 'Nutrition & Budget'
    },
    {
      id: 12,
      question: 'What if I don\'t like a specific food item?',
      answer: 'No problem, we provide smart alternatives for every meal you love.',
      icon: '🍽️',
      category: 'Nutrition & Budget'
    },
    // New Questions - الخصوصية والنتائج
    {
      id: 13,
      question: 'Are the results guaranteed?',
      answer: 'If you commit to the plan, we guarantee you will see real change, God willing.',
      icon: '🔒',
      category: 'Privacy & Results'
    },
    {
      id: 14,
      question: 'Are my data and photos private?',
      answer: 'Your privacy is our priority, your data and photos are encrypted and no one can access them except you.',
      icon: '📱',
      category: 'Privacy & Results'
    },
    // New Questions - الدعم الفني
    {
      id: 15,
      question: 'If I face a problem with the website?',
      answer: 'The technical support team is ready to help you anytime through the website.',
      icon: '🛠️',
      category: 'Technical Support'
    },
    {
      id: 16,
      question: 'Does the website work from outside my country?',
      answer: 'Yes, you can access and subscribe from anywhere in the world.',
      icon: '🌍',
      category: 'Technical Support'
    },
    // New Questions - الباقات والاشتراك
    {
      id: 17,
      question: 'Can I upgrade my plan later?',
      answer: 'Of course, you can move from the basic plan to "Elite" or "VIP" at any time.',
      icon: '📊',
      category: 'Plans & Subscription'
    },
    {
      id: 18,
      question: 'Is renewal automatic?',
      answer: 'The choice is yours; you can activate or cancel auto-renewal from your account settings.',
      icon: '🔄',
      category: 'Plans & Subscription'
    },
    // New Questions - الدعم والمتابعة
    {
      id: 19,
      question: 'How often can I ask the coach?',
      answer: 'In follow-up plans, you can send your inquiries and the coach will respond during working hours.',
      icon: '👨‍🏫',
      category: 'Support & Follow-up'
    },
    {
      id: 20,
      question: 'Are schedules updated?',
      answer: 'Yes, your schedule is updated periodically according to your level development to ensure no weight plateau.',
      icon: '📅',
      category: 'Support & Follow-up'
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
      confirmButtonColor: '#FDB813',
      iconColor: '#FDB813',
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

      {/* Stats Section - تحديث الرقم ليشمل الأسئلة الجديدة */}
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
              transition={{ delay: index * 0.05 }}
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
            <p>Ask us anything! We\'re here to help you succeed</p>
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