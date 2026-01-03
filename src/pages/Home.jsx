import { useEffect } from 'react';
import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import Certifications from '../components/Certifications/Certifications';
import About from '../components/About/About';
import Testimonials from '../components/Testimonials/Testimonials';
import CTA from '../components/CTA/CTA';
import Footer from '../components/Footer/Footer';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';

import './Home.scss';

const Home = () => {
  useEffect(() => {
    // إضافة تأثيرات CSS عند تحميل الصفحة
    const style = document.createElement('style');
    style.textContent = `
      .section-transition {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .section-transition.active {
        opacity: 1;
        transform: translateY(0);
      }
      
      .fade-in-up {
        animation: fadeInUp 0.8s ease forwards;
      }
      
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(40px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="home-page">
      <Header />
      <Hero />
      <Certifications />
      <About />
      <Testimonials />
      <CTA />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Home;