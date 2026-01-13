import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDumbbell, FaUser, FaGlobe } from 'react-icons/fa';
import Auth from '../Auth/Auth';
import './Header.scss';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authTab, setAuthTab] = useState('login'); // 'login' أو 'register'
  const [currentLang, setCurrentLang] = useState('ar'); // 'ar' or 'en'
  const location = useLocation();
  const navigate = useNavigate();

  // مراقبة التمرير لتغيير الهيدر
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

  // فتح تبويب Login
  const handleLoginClick = () => {
    setAuthTab('login');
    setShowAuth(true);
    setMenuOpen(false);
  };

  // فتح تبويب Register
  const handleRegisterClick = () => {
    setAuthTab('register');
    setShowAuth(true);
    setMenuOpen(false);
  };

  // تبديل اللغة
  const handleLanguageToggle = () => {
    const newLang = currentLang === 'ar' ? 'en' : 'ar';
    setCurrentLang(newLang);
    console.log(`Language changed to: ${newLang}`);
    setMenuOpen(false);
  };

  // روابط الصفحات
  const pageLinks = [
    { name: 'الرئيسية', path: '/' },
    { name: 'الأسئلة الشائعة', path: '/faq' }
  ];

  // روابط السيكشنات للصفحة الرئيسية فقط
  const sectionLinks = [
    { name: 'عن المدربة', href: '#about' },
    { name: 'آراء المتدربات', href: '#testimonials' }
  ];

  const isHomePage = location.pathname === '/';

  return (
    <>
      {/* Auth Modal */}
      <AnimatePresence>
        {showAuth && (
          <Auth 
            isOpen={showAuth} 
            onClose={() => setShowAuth(false)} 
            initialTab={authTab} // ⬅️ يفتح Login أو Register
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
            {/* روابط الصفحات */}
            {pageLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="nav-link"
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {/* روابط السيكشنات في الصفحة الرئيسية */}
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

            {/* زر تسجيل الدخول في القائمة المتحركة (الموبايل) */}
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
              {isLoggedIn ? 'حسابي' : 'تسجيل دخول'}
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
              <span className="language-text">{currentLang === 'ar' ? 'EN' : 'ع'}</span>
            </motion.button>

            {/* تبديل اللغة للموبايل والتابلت */}
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
              {isLoggedIn ? 'حسابي' : 'تسجيل دخول'}
            </motion.button>

            {/* زر احجزي الآن → يفتح Register مباشرة */}
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
