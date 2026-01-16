import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaDumbbell, 
  FaFire,
  FaHeart,
  FaStar,
  FaTrophy,
  FaRocket
} from 'react-icons/fa';
import Swal from 'sweetalert2';
import './Auth.scss';

const Auth = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode); // 'login' or 'register'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [step, setStep] = useState(1); // For multi-step registration
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      Swal.fire({
        title: mode === 'login' ? 'Welcome Back! 💪' : 'Welcome! 🎉',
        text: mode === 'login' 
          ? 'Successfully logged in' 
          : 'Your account is ready! Let\'s start the transformation',
        icon: 'success',
        confirmButtonText: 'Let\'s Go',
        confirmButtonColor: '#FDB813',
        iconColor: '#FDB813'
      });
      
      onClose();
    }, 2000);
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setStep(1);
    setSelectedGoal(null);
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="auth-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="auth-container"
          initial={{ scale: 0.5, rotateY: -180, opacity: 0 }}
          animate={{ scale: 1, rotateY: 0, opacity: 1 }}
          exit={{ scale: 0.5, rotateY: 180, opacity: 0 }}
          transition={{ 
            type: "spring", 
            duration: 0.8,
            bounce: 0.3
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Floating Icons Background */}
          <div className="floating-icons">
            {[FaDumbbell, FaFire, FaHeart, FaStar, FaTrophy, FaRocket].map((Icon, i) => (
              <motion.div
                key={i}
                className="floating-icon"
                initial={{ y: 0, opacity: 0.3 }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.6, 0.3],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
                style={{
                  left: `${15 + i * 15}%`,
                  top: `${10 + (i % 3) * 30}%`
                }}
              >
                <Icon />
              </motion.div>
            ))}
          </div>

          {/* Main Card */}
          <div className="auth-card">
            {/* Left Side - Animated Illustration */}
            <motion.div 
              className="auth-visual"
              animate={{
                background: mode === 'login' 
                  ? 'linear-gradient(135deg, #3a1f3d 0%, #2d1b2e 50%, #1f1520 100%)'
                  : 'linear-gradient(135deg, #2c2416 0%, #3d2f1a 35%, #4a3a1f 70%, #5a4a2a 100%)'
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="animated-circle-2"></div>
              <div className="visual-content">
                <motion.div
                  className="visual-circle"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <div className="circle-inner">
                    <FaDumbbell className="circle-icon" />
                  </div>
                </motion.div>

                <motion.div
                  className="visual-text"
                  key={mode}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h2>{mode === 'login' ? 'Welcome Back!' : 'Start Your Journey!'}</h2>
                  <p>
                    {mode === 'login' 
                      ? 'Ready to continue the challenge?' 
                      : 'One step towards a better version of yourself'}
                  </p>
                  
                  {/* Progress Rings for Registration */}
                  {mode === 'register' && (
                    <div className="progress-rings">
                      {[1, 2, 3].map((s) => (
                        <motion.div
                          key={s}
                          className={`progress-ring ${step >= s ? 'active' : ''}`}
                          animate={{
                            scale: step === s ? [1, 1.1, 1] : 1,
                            opacity: step >= s ? 1 : 0.3
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {s}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>

                {/* Animated Stats */}
                <motion.div 
                  className="visual-stats"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="stat">
                    <FaFire />
                    <span>500+ Trainees</span>
                  </div>
                  <div className="stat">
                    <FaTrophy />
                    <span>Guaranteed Results</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Side - Form */}
            <div className="auth-form-container">
              <motion.div
                className="auth-header"
                layout
              >
                <h1>{mode === 'login' ? 'Login' : 'Create Account'}</h1>
                <p>
                  {mode === 'login' 
                    ? 'Enter your account and continue your journey' 
                    : `Step ${step} of 3`}
                </p>
              </motion.div>

              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  {/* Login Form */}
                  {mode === 'login' && (
                    <motion.div
                      key="login"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="form-group">
                        <div className="input-wrapper">
                          <FaEnvelope className="input-icon" />
                          <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="input-wrapper">
                          <FaLock className="input-icon" />
                          <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-options">
                        <label className="remember-me">
                          <input type="checkbox" />
                          <span>Remember me</span>
                        </label>
                        <a href="#" className="forgot-password">Forgot password?</a>
                      </div>

                      <motion.button
                        type="submit"
                        className="submit-button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <motion.div
                            className="loading-spinner"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                        ) : (
                          'Login'
                        )}
                      </motion.button>
                    </motion.div>
                  )}

                  {/* Register Form - Step 1: Personal Info */}
                  {mode === 'register' && step === 1 && (
                    <motion.div
                      key="register-1"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                    >
                      <div className="form-group">
                        <div className="input-wrapper">
                          <FaUser className="input-icon" />
                          <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="input-wrapper">
                          <FaEnvelope className="input-icon" />
                          <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <motion.button
                        type="button"
                        className="submit-button"
                        onClick={nextStep}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Next
                      </motion.button>
                    </motion.div>
                  )}

                  {/* Register Form - Step 2: Password */}
                  {mode === 'register' && step === 2 && (
                    <motion.div
                      key="register-2"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                    >
                      <div className="form-group">
                        <div className="input-wrapper">
                          <FaLock className="input-icon" />
                          <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="input-wrapper">
                          <FaLock className="input-icon" />
                          <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-buttons">
                        <motion.button
                          type="button"
                          className="back-button"
                          onClick={prevStep}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Back
                        </motion.button>
                        <motion.button
                          type="button"
                          className="submit-button"
                          onClick={nextStep}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Next
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {/* Register Form - Step 3: Goals */}
                  {mode === 'register' && step === 3 && (
                    <motion.div
                      key="register-3"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                    >
                      <div className="goals-selection">
                        <h3>What's your goal?</h3>
                        <div className="goals-grid">
                          {[
                            { icon: FaFire, text: 'Weight Loss', color: '#FDB813' },
                            { icon: FaDumbbell, text: 'Build Muscle', color: '#F9A825' },
                            { icon: FaHeart, text: 'General Fitness', color: '#2196F3' },
                            { icon: FaTrophy, text: 'Challenge Myself', color: '#FF9800' }
                          ].map((goal, i) => (
                            <motion.div
                              key={i}
                              className={`goal-card ${selectedGoal === i ? 'selected' : ''}`}
                              onClick={() => setSelectedGoal(i)}
                              whileHover={{ scale: 1.05, y: -5 }}
                              whileTap={{ scale: 0.95 }}
                              style={{ '--goal-color': goal.color }}
                            >
                              <goal.icon />
                              <span>{goal.text}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <div className="form-buttons">
                        <motion.button
                          type="button"
                          className="back-button"
                          onClick={prevStep}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Back
                        </motion.button>
                        <motion.button
                          type="submit"
                          className="submit-button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <motion.div
                              className="loading-spinner"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                          ) : (
                            'Start Now!'
                          )}
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>

              {/* Switch Mode */}
              <motion.div 
                className="switch-mode"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <p>
                  {mode === 'login' ? 'Don\'t have an account?' : 'Already have an account?'}
                  <button onClick={switchMode}>
                    {mode === 'login' ? 'Register Now' : 'Login'}
                  </button>
                </p>
              </motion.div>

              {/* Social Login */}
              <div className="social-login">
                <div className="divider">
                  <span>OR</span>
                </div>
                <div className="social-buttons">
                  <motion.button
                    className="social-button google"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg viewBox="0 0 48 48" width="20" height="20">
                      <path fill="#4285F4" d="M24 9.5c3.9 0 6.6 1.7 8.1 3.1l6-5.8C34.7 3.7 29.8 1.5 24 1.5c-8.8 0-16.4 5.2-20 12.8l7 5.4C12.8 13.9 18 9.5 24 9.5z"/>
                      <path fill="#34A853" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.5 2.7-2.1 5-4.4 6.5l6.9 5.3c4-3.7 6.3-9.1 6.3-16.3z"/>
                      <path fill="#FBBC05" d="M11 28.2c-1.3-3.9-1.3-8.1 0-12L4 10.8C.6 17.6.6 25.4 4 32.2l7-5.4z"/>
                      <path fill="#EA4335" d="M24 46.5c5.8 0 10.7-1.9 14.2-5.2l-6.9-5.3c-1.9 1.3-4.4 2-7.3 2-6 0-11.2-4.4-13-10.3l-7 5.4c3.6 7.6 11.2 12.8 20 12.8z"/>
                    </svg>
                    Google
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <motion.button
            className="close-button"
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            ✕
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Auth;