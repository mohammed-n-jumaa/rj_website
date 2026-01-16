import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaGlobe } from 'react-icons/fa';
import Auth from '../Auth/Auth';
import './Header.scss';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [currentLang, setCurrentLang] = useState('en'); 
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
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
      console.log('View Account');
    } else {
      setShowAuth(true);
      setMenuOpen(false);
    }
  };

  const handleLanguageToggle = () => {
    const newLang = currentLang === 'en' ? 'ar' : 'en';
    setCurrentLang(newLang);
    console.log(`Language changed to: ${newLang}`);
    setMenuOpen(false);
  };

  const pageLinks = [
    { name: 'Home', path: '/' },
    { name: 'FAQ', path: '/faq' }
  ];

  const sectionLinks = [
    { name: 'About Coach', href: '#about' },
    { name: 'Testimonials', href: '#testimonials' }
  ];

  const isHomePage = location.pathname === '/';

  return (
    <>
      <AnimatePresence>
        <Auth isOpen={showAuth} onClose={() => setShowAuth(false)} />
      </AnimatePresence>

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
          {/* تم تحديث رابط الشعار هنا */}
          <Link to="/" className="logo-link">
            <motion.div 
              className="logo"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img 
                src="https://i.ibb.co/FLsmS14y/logo2.png" 
                alt="Rand Jarar Fitness Logo" 
                className="logo-image" 
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className={`nav desktop-nav`}>
            {pageLinks.map((link) => (
              <Link key={link.name} to={link.path} className="nav-link">
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
              >
                {link.name}
              </motion.a>
            ))}
          </nav>

          <div className="mobile-left">
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

          <div className="mobile-right">
            <motion.button
              className="language-button-mobile"
              onClick={handleLanguageToggle}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGlobe className="language-icon" />
            </motion.button>
          </div>

          <div className="header-actions">
            <motion.button
              className="language-button desktop-only"
              onClick={handleLanguageToggle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGlobe className="language-icon" />
              <span className="language-text">
                {currentLang === 'en' ? 'AR' : 'EN'}
              </span>
            </motion.button>

            <motion.button
              className="login-button desktop-only"
              onClick={handleLoginClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaUser className="login-icon" />
              {isLoggedIn ? 'My Account' : 'Login'}
            </motion.button>

            <motion.button 
              className="cta-button"
              onClick={() => navigate('/auth')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Now
            </motion.button>
          </div>
        </div>
      </motion.header>

      <nav className={`nav mobile-nav ${menuOpen ? 'open' : ''}`}>
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

        {isHomePage && sectionLinks.map((link) => (
          <motion.a
            key={link.name}
            href={link.href}
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            {link.name}
          </motion.a>
        ))}

        <div className="nav-divider"></div>

        <motion.button
          className="login-button mobile-menu"
          onClick={() => {
            handleLoginClick();
            setMenuOpen(false);
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaUser className="login-icon" />
          {isLoggedIn ? 'My Account' : 'Login'}
        </motion.button>
      </nav>
    </>
  );
};

export default Header;