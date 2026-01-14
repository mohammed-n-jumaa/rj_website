import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { FaLock, FaMapMarkerAlt, FaArrowDown } from 'react-icons/fa';
import Swal from 'sweetalert2';
import './FAQ.scss';

const JourneyNode = ({ node, index, activeNode, handleNodeClick, scrollProgress, revealedNodes, setRevealedNodes }) => {
  const nodeRef = useRef(null);
  
  // Calculate when the answer should appear based on the timeline
  const nodeProgressThreshold = index / 11;
  const shouldReveal = scrollProgress > nodeProgressThreshold && !node.locked;
  
  // Add node to revealed nodes when the line reaches it
  useEffect(() => {
    if (shouldReveal && !revealedNodes.includes(node.id)) {
      const timer = setTimeout(() => {
        setRevealedNodes(prev => [...prev, node.id]);
        handleNodeClick(node);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [shouldReveal]);

  // Node is active if clicked or revealed
  const isActive = activeNode === node.id || revealedNodes.includes(node.id);

  return (
    <motion.div
      ref={nodeRef}
      className={`journey-node ${isActive ? 'active' : ''} ${node.locked ? 'locked' : ''}`}
      style={{
        top: node.position.top,
        left: node.position.left
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: index * 0.15, type: "spring" }}
      whileHover={{ scale: 1.1 }}
      onClick={() => handleNodeClick(node)}
    >
      {/* Node Point */}
      <motion.div 
        className="node-point"
        style={{ 
          background: `linear-gradient(135deg, ${node.color}, ${node.color}dd)`,
          boxShadow: `0 0 20px ${node.color}44`
        }}
        animate={{
          boxShadow: isActive 
            ? [`0 0 20px ${node.color}44`, `0 0 40px ${node.color}88`, `0 0 20px ${node.color}44`]
            : `0 0 20px ${node.color}44`
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {node.locked ? (
          <FaLock className="node-icon" />
        ) : (
          <FaMapMarkerAlt className="node-icon" />
        )}
      </motion.div>

      {/* Question Bubble */}
      <motion.div 
        className="node-question"
        whileHover={{ scale: 1.05 }}
      >
        {node.question}
      </motion.div>

      {/* Answer Popover - stays visible */}
      {!node.locked && (
        <motion.div
          className="node-answer"
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ 
            opacity: isActive ? 1 : 0,
            scale: isActive ? 1 : 0.8,
            y: isActive ? 0 : 10
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="answer-arrow"></div>
          <p>{node.answer}</p>
        </motion.div>
      )}

      {/* Locked Message */}
      {node.locked && activeNode === node.id && (
        <motion.div
          className="locked-message"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p>This is a personal question…</p>
          <p>No general answer.</p>
          <FaArrowDown className="arrow-down" />
        </motion.div>
      )}

      {/* Pulse Ring */}
      {isActive && (
        <motion.div
          className="pulse-ring"
          style={{ borderColor: node.color }}
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
};

const FAQ = () => {
  const [activeNode, setActiveNode] = useState(null);
  const [revealedNodes, setRevealedNodes] = useState([]); // Revealed nodes
  const [formData, setFormData] = useState({ question: '', contact: '' });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  
  // Convert scrollYProgress to regular value
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setScrollProgress(latest);
    });
  }, [scrollYProgress]);

  const journeyNodes = [
    {
      id: 1,
      position: { top: '6%', left: '20%' },
      question: 'Where do I start?',
      answer: 'The beginning is not your strength, it\'s your decision.',
      locked: false,
      color: '#E91E63'
    },
    {
      id: 2,
      position: { top: '14%', left: '75%' },
      question: 'I\'m afraid I won\'t continue...',
      answer: 'Most trainees started with the same feeling.',
      locked: false,
      color: '#9C27B0'
    },
    {
      id: 3,
      position: { top: '23%', left: '30%' },
      question: 'What about my privacy?',
      answer: 'Your privacy is a red line.',
      locked: false,
      color: '#2196F3'
    },
    {
      id: 4,
      position: { top: '32%', left: '70%' },
      question: 'I have limited time',
      answer: '30 minutes is enough when done right.',
      locked: false,
      color: '#4CAF50'
    },
    {
      id: 5,
      position: { top: '41%', left: '25%' },
      question: 'When will I see results?',
      answer: 'The difference starts before it shows.',
      locked: false,
      color: '#FF9800'
    },
    {
      id: 6,
      position: { top: '50%', left: '65%' },
      question: 'Is it online training?',
      answer: 'Yes! From your home and at your time.',
      locked: false,
      color: '#00BCD4'
    },
    {
      id: 7,
      position: { top: '59%', left: '35%' },
      question: 'Do I need equipment?',
      answer: 'No, your body and motivation are enough.',
      locked: false,
      color: '#FF5722'
    },
    {
      id: 8,
      position: { top: '68%', left: '70%' },
      question: 'What about diet?',
      answer: 'Flexible with no deprivation.',
      locked: false,
      color: '#8BC34A'
    },
    {
      id: 9,
      position: { top: '77%', left: '30%' },
      question: 'How much does it cost?',
      answer: '',
      locked: true,
      color: '#795548'
    },
    {
      id: 10,
      position: { top: '86%', left: '60%' },
      question: 'Is the training hard?',
      answer: '',
      locked: true,
      color: '#607D8B'
    },
    {
      id: 11,
      position: { top: '94%', left: '40%' },
      question: 'How long for results?',
      answer: '',
      locked: true,
      color: '#9E9E9E'
    }
  ];

  const handleNodeClick = (node) => {
    if (node.locked) {
      // Scroll to form
      document.getElementById('question-form').scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    } else {
      setActiveNode(activeNode === node.id ? null : node.id);
    }
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
    <div className="faq-journey" ref={containerRef}>
      {/* Header */}
      <motion.div 
        className="journey-header"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="journey-title">Your Journey Map</h1>
        <p className="journey-subtitle">Every point is a question… and every path has an answer 🤍</p>
      </motion.div>

      {/* SVG Path - the winding line */}
      <svg className="journey-path" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path
          d="M 20,8 Q 40,12 30,16 T 75,16 Q 60,20 30,26 T 70,34 Q 50,38 25,42 T 65,50 Q 45,54 35,58 T 70,66 Q 55,70 30,74 T 60,82 Q 50,86 40,90"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="0.3"
          strokeLinecap="round"
          strokeDasharray="2,2"
          style={{
            pathLength: pathLength
          }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E91E63" stopOpacity="0.6" />
            <stop offset="25%" stopColor="#9C27B0" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#2196F3" stopOpacity="0.6" />
            <stop offset="75%" stopColor="#4CAF50" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FF9800" stopOpacity="0.6" />
          </linearGradient>
        </defs>
      </svg>

      {/* Journey Nodes */}
      <div className="journey-nodes">
        {journeyNodes.map((node, index) => (
          <JourneyNode
            key={node.id}
            node={node}
            index={index}
            activeNode={activeNode}
            handleNodeClick={handleNodeClick}
            scrollProgress={scrollProgress}
            revealedNodes={revealedNodes}
            setRevealedNodes={setRevealedNodes}
          />
        ))}
      </div>

      {/* Question Form */}
      <motion.div 
        id="question-form"
        className="question-form"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="form-header">
          <h2>Your Question Point</h2>
          <p>This is where your question belongs</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <textarea
              placeholder="Your question..."
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              required
              rows="4"
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="Your email or number"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              required
            />
          </div>

          <p className="form-note">The answer will reach you directly</p>

          <motion.button
            type="submit"
            className="submit-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add My Question to the Map
          </motion.button>
        </form>
      </motion.div>

      {/* Decorative Elements */}
      <div className="journey-decorations">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 3 + i,
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