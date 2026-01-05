import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import FAQPage from './pages/FAQPage';
import AuthPage from './pages/AuthPage.jsx';
import Profile from './Profile/Profile-Clean.jsx';
import LoadingSpinner from './components/LoadingSpinner';
import './styles/global.scss';

function App() {
  const [loading, setLoading] = useState(true);
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  useEffect(() => {
    // Preload the GIF for smooth experience
    const preloadGif = new Image();
    preloadGif.src = '/Jumping Lunges.gif';

    // Check if first visit (use localStorage for persistent check)
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
    
    if (!hasVisitedBefore) {
      // First time ever visiting - show loader longer
      setIsFirstVisit(true);
      const timer = setTimeout(() => {
        setLoading(false);
        localStorage.setItem('hasVisitedBefore', 'true');
      }, 3000); // 3 seconds for first visit

      return () => clearTimeout(timer);
    } else {
      // Check session visit
      const hasVisitedThisSession = sessionStorage.getItem('hasVisitedThisSession');
      
      if (!hasVisitedThisSession) {
        // New session but has visited before - shorter loader
        const timer = setTimeout(() => {
          setLoading(false);
          sessionStorage.setItem('hasVisitedThisSession', 'true');
        }, 1500); // 1.5 seconds for returning visitors

        return () => clearTimeout(timer);
      } else {
        // Already visited in this session - skip loader
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    // تهيئة تأثيرات الصفحة
    const initPageEffects = () => {
      // إضافة CSS للتمرير السلس
      document.documentElement.style.scrollBehavior = 'smooth';

      // إضافة margin للسكرول
      const style = document.createElement('style');
      style.textContent = `
        html {
          scroll-behavior: smooth;
        }
        
        * {
          scroll-margin-top: 80px;
        }
        
        ::-webkit-scrollbar {
          width: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(233, 30, 99, 0.05);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #E91E63, #FF4081);
          border-radius: 10px;
          transition: background 0.3s;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #D81B60, #F50057);
        }
        
        .cursor-dot {
          width: 8px;
          height: 8px;
          background: #E91E63;
          border-radius: 50%;
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          transition: transform 0.2s;
        }
        
        .cursor-ring {
          width: 40px;
          height: 40px;
          border: 2px solid rgba(233, 30, 99, 0.3);
          border-radius: 50%;
          position: fixed;
          pointer-events: none;
          z-index: 9998;
          transition: all 0.3s;
        }
      `;
      document.head.appendChild(style);

      // تأثيرات المؤشر (اختياري)
      if (window.innerWidth > 768) {
        const cursorDot = document.createElement('div');
        cursorDot.className = 'cursor-dot';

        const cursorRing = document.createElement('div');
        cursorRing.className = 'cursor-ring';

        document.body.appendChild(cursorDot);
        document.body.appendChild(cursorRing);

        const moveCursor = (e) => {
          cursorDot.style.left = `${e.clientX}px`;
          cursorDot.style.top = `${e.clientY}px`;

          setTimeout(() => {
            cursorRing.style.left = `${e.clientX}px`;
            cursorRing.style.top = `${e.clientY}px`;
          }, 100);
        };

        document.addEventListener('mousemove', moveCursor);

        // تأثير عند المرور على العناصر
        const interactiveElements = document.querySelectorAll('button, a, .nav-link');
        interactiveElements.forEach(el => {
          el.addEventListener('mouseenter', () => {
            cursorDot.style.transform = 'scale(2)';
            cursorRing.style.transform = 'scale(1.5)';
            cursorRing.style.borderColor = '#E91E63';
          });

          el.addEventListener('mouseleave', () => {
            cursorDot.style.transform = 'scale(1)';
            cursorRing.style.transform = 'scale(1)';
            cursorRing.style.borderColor = 'rgba(233, 30, 99, 0.3)';
          });
        });

        return () => {
          document.removeEventListener('mousemove', moveCursor);
          document.body.removeChild(cursorDot);
          document.body.removeChild(cursorRing);
        };
      }
    };

    // Initialize page effects only after loading is complete
    if (!loading) {
      initPageEffects();
    }
  }, [loading]);

  // Show loading spinner with different messages
  if (loading) {
    const message = isFirstVisit 
      ? "مرحباً بك في عالم الصحة والرشاقة مع رند جرار 💪"
      : "مرحباً بعودتك 💕";
    
    return <LoadingSpinner message={message} />;
  }

  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;