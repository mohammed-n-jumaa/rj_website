import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaDumbbell,
  FaInstagram, 
  FaFacebookF, 
  FaTwitter, 
  FaYoutube,
  FaTiktok,
  FaWhatsapp,
  FaHeart
} from 'react-icons/fa';
import './Footer.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaInstagram />, name: 'Instagram', url: '#', color: '#E4405F' },
    { icon: <FaFacebookF />, name: 'Facebook', url: '#', color: '#1877F2' },
    { icon: <FaTwitter />, name: 'Twitter', url: '#', color: '#1DA1F2' },
    { icon: <FaYoutube />, name: 'YouTube', url: '#', color: '#FF0000' },
    { icon: <FaTiktok />, name: 'TikTok', url: '#', color: '#000000' },
    { icon: <FaWhatsapp />, name: 'WhatsApp', url: '#', color: '#25D366' }
  ];

  const quickLinks = [
    { name: 'الرئيسية', href: '#home' },
    { name: 'عن المدربة', href: '#about' },
    { name: 'البرامج', href: '#programs' },
    { name: 'آراء المتدربات', href: '#testimonials' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '#privacy' },
    { name: 'Terms & Conditions', href: '#terms' }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-main">
          {/* Brand Section */}
          <motion.div 
            className="footer-brand"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="brand-logo">
              <FaDumbbell className="logo-icon" />
              <span className="logo-text">RAND JARAR</span>
            </div>
            <p className="brand-description">
              مدربة لياقة بدنية معتمدة دولياً
              <br />
              نساعدك على تحقيق أهدافك بطريقة صحية ومستدامة
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className="footer-links"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="footer-title">روابط سريعة</h4>
            <ul className="links-list">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href}>{link.name}</a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Social */}
          <motion.div 
            className="footer-social"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="footer-title">تابعينا</h4>
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  className="social-link"
                  aria-label={social.name}
                  whileHover={{ 
                    scale: 1.1, 
                    y: -3,
                    backgroundColor: social.color 
                  }}
                  whileTap={{ scale: 0.95 }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div 
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="footer-legal">
            {legalLinks.map((link, index) => (
              <React.Fragment key={index}>
                <a href={link.href} className="legal-link">
                  {link.name}
                </a>
                {index < legalLinks.length - 1 && <span className="separator">|</span>}
              </React.Fragment>
            ))}
          </div>
          
          <p className="footer-copyright">
            © {currentYear} Rand Jarar. All rights reserved. Made with <FaHeart className="heart-icon" /> by Your Team
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;