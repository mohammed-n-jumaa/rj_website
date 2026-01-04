import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDumbbell, FaUser } from 'react-icons/fa';
import Auth from '../Auth/Auth';
import './Header.scss';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // منع السكرول عند فتح القائمة
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  const handleLoginClick = () => {
    if (isLoggedIn) {
      console.log('عرض الحساب');
    } else {
      setShowAuth(true);
      setMenuOpen(false);
    }
  };

  // روابط الصفحات
  const pageLinks = [
    { name: 'الرئيسية', path: '/' },
    { name: 'الأسئلة الشائعة', path: '/faq' }
  ];

  // روابط السيكشنات (للصفحة الرئيسية فقط)
  const sectionLinks = [
    { name: 'عن المدربة', href: '#about' },
    { name: 'آراء المتدربات', href: '#testimonials' }
  ];

  const isHomePage = location.pathname === '/';

  return (
    <>
      {/* Auth Modal */}
      <AnimatePresence>
        <Auth isOpen={showAuth} onClose={() => setShowAuth(false)} />
      </AnimatePresence>

      {/* Menu Overlay */}
      {menuOpen && (
        <motion.div 
          className="menu-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setMenuOpen(false)}
        />
      )}
      
      <motion.header 
        className={`header ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
      <div className="header-container">
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

        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          {/* روابط الصفحات */}
          {pageLinks.map((link, index) => (
            <Link
              key={link.name}
              to={link.path}
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          {/* روابط السيكشنات (فقط في الصفحة الرئيسية) */}
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
          
          {/* زر تسجيل الدخول في القائمة المتحركة */}
          <motion.button
            className="login-button mobile-only"
            onClick={() => {
              handleLoginClick();
              setMenuOpen(false);
            }}
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

        <div className="header-actions">
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

          <motion.button 
            className="cta-button"
            onClick={() => navigate('/auth')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            احجزي الآن
          </motion.button>
        </div>

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