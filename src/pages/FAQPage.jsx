import React from 'react';
import Header from '../components/Header/Header';
import FAQ from '../components/FAQ/FAQ';
import Footer from '../components/Footer/Footer';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';
import './FAQPage.scss';

const FAQPage = () => {
  return (
    <div className="faq-page">
      <Header />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default FAQPage;