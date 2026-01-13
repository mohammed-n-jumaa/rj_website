import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Auth.scss';

const Login = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // مسح الخطأ عند الكتابة
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صحيح';
    }

    if (!formData.password) {
      newErrors.password = 'كلمة المرور مطلوبة';
    } else if (formData.password.length < 6) {
      newErrors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // في المستقبل: إرسال البيانات إلى Laravel API
      // const response = await axios.post('/api/login', formData);
      
      // محاكاة تسجيل الدخول
      setTimeout(() => {
        setIsLoading(false);
        
        Swal.fire({
          title: 'تم تسجيل الدخول! 🎉',
          text: 'مرحباً بك مجدداً',
          icon: 'success',
          confirmButtonText: 'متابعة',
          confirmButtonColor: '#E91E63'
        });

        onClose();
        navigate('/profile');
      }, 1500);

    } catch (error) {
      setIsLoading(false);
      console.error('Login error:', error);
      
      Swal.fire({
        title: 'خطأ في تسجيل الدخول',
        text: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
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
        className="auth-container"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="auth-header">
          <h2>تسجيل الدخول</h2>
          <p>مرحباً بعودتك! سجلي دخولك للمتابعة</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {/* البريد الإلكتروني */}
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

          {/* كلمة المرور */}
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

          {/* تذكرني و نسيت كلمة المرور */}
          <div className="form-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <span>تذكرني</span>
            </label>
            <Link to="/forgot-password" className="forgot-link" onClick={onClose}>
              نسيت كلمة المرور؟
            </Link>
          </div>

          {/* زر تسجيل الدخول */}
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
                <span>جاري تسجيل الدخول...</span>
              </>
            ) : (
              'تسجيل الدخول'
            )}
          </motion.button>
        </form>

        {/* رابط التسجيل */}
        <div className="auth-footer">
          <p>
            ليس لديك حساب؟{' '}
            <Link to="/register" onClick={onClose}>
              سجلي الآن
            </Link>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Login;