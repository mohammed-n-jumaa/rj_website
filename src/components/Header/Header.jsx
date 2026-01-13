import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDumbbell, FaUser, FaGlobe } from 'react-icons/fa';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import './Header.scss';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [currentLang, setCurrentLang] = useState('ar'); // 'ar' or 'en'

  const location = useLocation();
  const navigate = useNavigate();

  // التعامل مع السكرول لتغيير حالة الهيدر
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // منع التمرير عند فتح القائمة
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [menuOpen]);

  const handleLoginClick = () => {
    setShowLogin(true);
    setMenuOpen(false);
  };

  const handleRegisterClick = () => {
    setShowRegister(true);
    setMenuOpen(false);
  };

  const handleLanguageToggle = () => {
    const newLang = currentLang === 'ar' ? 'en' : 'ar';
    setCurrentLang(newLang);
    console.log(`Language changed to: ${newLang}`);
    setMenuOpen(false);
  };

  const pageLinks = [
    { name: 'الرئيسية', path: '/' },
    { name: 'الأسئلة الشائعة', path: '/faq' }
  ];

  const sectionLinks = [
    { name: 'عن المدربة', href: '#about' },
    { name: 'آراء المتدربات', href: '#testimonials' }
  ];

  const isHomePage = location.pathname === '/';

  return (
    <>
      {/* Login Modal */}
      <AnimatePresence>
        {showLogin && (
          <Login 
            isOpen={showLogin} 
            onClose={() => setShowLogin(false)} 
          />
        )}
      </AnimatePresence>

      {/* Register Modal */}
      <AnimatePresence>
        {showRegister && (
          <Register 
            isOpen={showRegister} 
            onClose={() => setShowRegister(false)} 
          />
        )}
      </AnimatePresence>

      {/* Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.header
        className={`header ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="header-container">
          {/* الشعار */}
          <Link to="/">
            <motion.div 
              className="logo"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaDumbbell className="logo-icon" />
              <span className="logo-text">RAND JARAR</span>
            </motion.div>
          </Link>

          {/* القائمة */}
          <nav className={`nav ${menuOpen ? 'open' : ''}`}>
            {pageLinks.map(link => (
              <Link
                key={link.name}
                to={link.path}
                className="nav-link"
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {isHomePage && sectionLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="nav-link"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </motion.a>
            ))}

            {/* زر تسجيل الدخول للقائمة المتحركة */}
            <motion.button
              className="login-button mobile-only"
              onClick={handleLoginClick}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaUser className="login-icon" />
              تسجيل دخول
            </motion.button>
          </nav>

          {/* أزرار الهيدر */}
          <div className="header-actions">
            {/* تبديل اللغة للشاشات الكبيرة */}
            <motion.button
              className="language-button desktop-only"
              onClick={handleLanguageToggle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={currentLang === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
            >
              <FaGlobe className="language-icon" />
              <span className="language-text">
                {currentLang === 'ar' ? 'EN' : 'ع'}
              </span>
            </motion.button>

            {/* تبديل اللغة للتابلت والموبايل */}
            <motion.button
              className="language-button mobile-tablet-only"
              onClick={handleLanguageToggle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={currentLang === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
            >
              <FaGlobe className="language-icon" />
            </motion.button>

            {/* زر تسجيل الدخول للشاشات الكبيرة */}
            <motion.button
              className="login-button desktop-only"
              onClick={handleLoginClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaUser className="login-icon" />
              تسجيل دخول
            </motion.button>

            {/* زر احجزي الآن */}
            <motion.button 
              className="cta-button"
              onClick={handleRegisterClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              احجزي الآن
            </motion.button>
          </div>

          {/* زر القائمة للهواتف */}
          <button 
            className={`menu-toggle ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </motion.header>
    </>
  );
};

export default Header;
