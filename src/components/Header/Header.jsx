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
  const [currentLang, setCurrentLang] = useState('en'); // 'ar' or 'en'
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Prevent scrolling when menu is open
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

  // Language toggle function - will connect to Laravel API in the future
  const handleLanguageToggle = () => {
    const newLang = currentLang === 'en' ? 'ar' : 'en';
    setCurrentLang(newLang);
    
    // In the future, will send request to API
    // axios.post('/api/change-language', { language: newLang })
    
    console.log(`Language changed to: ${newLang}`);
    setMenuOpen(false);
  };

  // Page links
  const pageLinks = [
    { name: 'Home', path: '/' },
    { name: 'FAQ', path: '/faq' }
  ];

  // Section links (for homepage only)
  const sectionLinks = [
    { name: 'About Coach', href: '#about' },
    { name: 'Testimonials', href: '#testimonials' }
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
          {/* Logo - Always Centered on Mobile */}
          <Link to="/" className="logo-link">
            <motion.div 
              className="logo"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img src="https://i.ibb.co/QjtFVCQq/logo.png" alt="Rand Jarar Fitness" className="logo-image" />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className={`nav desktop-nav`}>
            {/* Page links */}
            {pageLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.path}
                className="nav-link"
              >
                {link.name}
              </Link>
            ))}

            {/* Section links (only on homepage) */}
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

          {/* Mobile Left Side: Menu Toggle */}
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

          {/* Mobile Right Side: Language Button */}
          <div className="mobile-right">
            <motion.button
              className="language-button-mobile"
              onClick={handleLanguageToggle}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              title={currentLang === 'en' ? 'Switch to Arabic' : 'التبديل للإنجليزية'}
            >
              <FaGlobe className="language-icon" />
            </motion.button>
          </div>

          {/* Desktop Actions */}
          <div className="header-actions">
            {/* Language button for large screens */}
            <motion.button
              className="language-button desktop-only"
              onClick={handleLanguageToggle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={currentLang === 'en' ? 'Switch to Arabic' : 'التبديل للإنجليزية'}
            >
              <FaGlobe className="language-icon" />
              <span className="language-text">
                {currentLang === 'en' ? 'AR' : 'EN'}
              </span>
            </motion.button>

            {/* Login button for large screens */}
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

      {/* Mobile Menu Sidebar */}
      <nav className={`nav mobile-nav ${menuOpen ? 'open' : ''}`}>
        {/* Page links */}
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

        {/* Section links (only on homepage) */}
        {isHomePage && sectionLinks.map((link, index) => (
          <motion.a
            key={link.name}
            href={link.href}
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            {link.name}
          </motion.a>
        ))}

        {/* Divider */}
        <div className="nav-divider"></div>

        {/* Login button in menu */}
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