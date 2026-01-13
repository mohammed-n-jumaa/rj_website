import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUser, FaEnvelope, FaLock, FaTimes, FaEye, FaEyeSlash,
  FaPhone, FaCalendarAlt, FaRuler, FaWeight, FaBullseye,
  FaArrowRight, FaArrowLeft, FaCheckCircle
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Auth.scss';

const Register = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    // الخطوة 1: المعلومات الأساسية
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    
    // الخطوة 2: المعلومات الشخصية
    age: '',
    height: '',
    weight: '',
    
    // الخطوة 3: الأهداف
    goal: '',
    
    // الموافقة على الشروط
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const goals = [
    { id: 'lose-weight', name: 'خسارة وزن', icon: '🔥' },
    { id: 'gain-muscle', name: 'بناء عضلات', icon: '💪' },
    { id: 'get-fit', name: 'لياقة عامة', icon: '⚡' },
    { id: 'tone-body', name: 'تنشيف وشد', icon: '✨' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleGoalSelect = (goalId) => {
    setFormData(prev => ({ ...prev, goal: goalId }));
    if (errors.goal) {
      setErrors(prev => ({ ...prev, goal: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.name) newErrors.name = 'الاسم مطلوب';
      if (!formData.email) {
        newErrors.email = 'البريد الإلكتروني مطلوب';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'البريد الإلكتروني غير صحيح';
      }
      if (!formData.phone) {
        newErrors.phone = 'رقم الهاتف مطلوب';
      } else if (!/^[0-9]{10,}$/.test(formData.phone)) {
        newErrors.phone = 'رقم الهاتف غير صحيح';
      }
      if (!formData.password) {
        newErrors.password = 'كلمة المرور مطلوبة';
      } else if (formData.password.length < 6) {
        newErrors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'كلمتا المرور غير متطابقتين';
      }
    }

    if (step === 2) {
      if (!formData.age) {
        newErrors.age = 'العمر مطلوب';
      } else if (formData.age < 16 || formData.age > 100) {
        newErrors.age = 'العمر يجب أن يكون بين 16 و 100';
      }
      if (!formData.height) {
        newErrors.height = 'الطول مطلوب';
      } else if (formData.height < 100 || formData.height > 250) {
        newErrors.height = 'الطول غير صحيح';
      }
      if (!formData.weight) {
        newErrors.weight = 'الوزن مطلوب';
      } else if (formData.weight < 30 || formData.weight > 300) {
        newErrors.weight = 'الوزن غير صحيح';
      }
    }

    if (step === 3) {
      if (!formData.goal) newErrors.goal = 'الرجاء اختيار هدفك';
      if (!formData.agreeToTerms) newErrors.agreeToTerms = 'يجب الموافقة على الشروط';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(3)) return;

    setIsLoading(true);

    try {
      // في المستقبل: إرسال البيانات إلى Laravel API
      // const response = await axios.post('/api/register', formData);
      
      setTimeout(() => {
        setIsLoading(false);
        
        Swal.fire({
          title: 'تم التسجيل بنجاح! 🎉',
          text: 'مرحباً بك في عائلتنا',
          icon: 'success',
          confirmButtonText: 'ابدأي الآن',
          confirmButtonColor: '#E91E63'
        });

        onClose();
        navigate('/profile');
      }, 1500);

    } catch (error) {
      setIsLoading(false);
      console.error('Registration error:', error);
      
      Swal.fire({
        title: 'خطأ في التسجيل',
        text: 'حدث خطأ أثناء التسجيل. الرجاء المحاولة مرة أخرى',
        icon: 'error',
        confirmButtonText: 'حسناً',
        confirmButtonColor: '#E91E63'
      });
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="auth-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="auth-container register-container"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>
          <FaTimes />
        </button>

        {/* Progress Steps */}
        <div className="steps-indicator">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`step ${currentStep >= step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`}
            >
              <div className="step-circle">
                {currentStep > step ? <FaCheckCircle /> : step}
              </div>
              <span className="step-label">
                {step === 1 ? 'حساب' : step === 2 ? 'معلومات' : 'هدف'}
              </span>
            </div>
          ))}
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {/* الخطوة 1: المعلومات الأساسية */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                className="form-step"
              >
                <div className="step-header">
                  <h3>إنشاء حساب</h3>
                  <p>أدخلي بياناتك الأساسية</p>
                </div>

                <div className="form-group">
                  <label htmlFor="name">
                    <FaUser /> الاسم الكامل
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="اسمك الكامل"
                    className={errors.name ? 'error' : ''}
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <FaEnvelope /> البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">
                    <FaPhone /> رقم الهاتف
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="07xxxxxxxx"
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="password">
                    <FaLock /> كلمة المرور
                  </label>
                  <div className="password-input">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className={errors.password ? 'error' : ''}
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && <span className="error-message">{errors.password}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">
                    <FaLock /> تأكيد كلمة المرور
                  </label>
                  <div className="password-input">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className={errors.confirmPassword ? 'error' : ''}
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                </div>

                <motion.button
                  type="button"
                  className="submit-btn"
                  onClick={handleNext}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  التالي <FaArrowLeft />
                </motion.button>
              </motion.div>
            )}

            {/* الخطوة 2: المعلومات الشخصية */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                className="form-step"
              >
                <div className="step-header">
                  <h3>معلوماتك الشخصية</h3>
                  <p>لنتعرف عليك أكثر</p>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="age">
                      <FaCalendarAlt /> العمر
                    </label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="25"
                      className={errors.age ? 'error' : ''}
                    />
                    {errors.age && <span className="error-message">{errors.age}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="height">
                      <FaRuler /> الطول (cm)
                    </label>
                    <input
                      type="number"
                      id="height"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                      placeholder="165"
                      className={errors.height ? 'error' : ''}
                    />
                    {errors.height && <span className="error-message">{errors.height}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="weight">
                    <FaWeight /> الوزن (kg)
                  </label>
                  <input
                    type="number"
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="65"
                    className={errors.weight ? 'error' : ''}
                  />
                  {errors.weight && <span className="error-message">{errors.weight}</span>}
                </div>

                <div className="form-buttons">
                  <motion.button
                    type="button"
                    className="back-btn"
                    onClick={handleBack}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaArrowRight /> السابق
                  </motion.button>

                  <motion.button
                    type="button"
                    className="submit-btn"
                    onClick={handleNext}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    التالي <FaArrowLeft />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* الخطوة 3: الأهداف */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                className="form-step"
              >
                <div className="step-header">
                  <h3>ما هو هدفك؟</h3>
                  <p>اختاري هدفك لنصمم برنامجك المثالي</p>
                </div>

                <div className="goals-grid">
                  {goals.map((goal) => (
                    <motion.div
                      key={goal.id}
                      className={`goal-card ${formData.goal === goal.id ? 'selected' : ''}`}
                      onClick={() => handleGoalSelect(goal.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="goal-icon">{goal.icon}</span>
                      <span className="goal-name">{goal.name}</span>
                      {formData.goal === goal.id && (
                        <FaCheckCircle className="check-icon" />
                      )}
                    </motion.div>
                  ))}
                </div>
                {errors.goal && <span className="error-message center">{errors.goal}</span>}

                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                    />
                    <span>
                      أوافق على <Link to="/terms" onClick={onClose}>الشروط والأحكام</Link>
                    </span>
                  </label>
                  {errors.agreeToTerms && <span className="error-message">{errors.agreeToTerms}</span>}
                </div>

                <div className="form-buttons">
                  <motion.button
                    type="button"
                    className="back-btn"
                    onClick={handleBack}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaArrowRight /> السابق
                  </motion.button>

                  <motion.button
                    type="submit"
                    className={`submit-btn ${isLoading ? 'loading' : ''}`}
                    disabled={isLoading}
                    whileHover={!isLoading ? { scale: 1.02 } : {}}
                    whileTap={!isLoading ? { scale: 0.98 } : {}}
                  >
                    {isLoading ? (
                      <>
                        <div className="spinner"></div>
                        <span>جاري التسجيل...</span>
                      </>
                    ) : (
                      'إنشاء الحساب'
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        {/* رابط تسجيل الدخول */}
        <div className="auth-footer">
          <p>
            لديك حساب بالفعل؟{' '}
            <Link to="/login" onClick={onClose}>
              سجلي دخولك
            </Link>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Register;