import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaQuestionCircle } from 'react-icons/fa';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'كيف يتم الدفع؟',
      answer: 'الدفع يتم بشكل آمن 100% عبر PayPal. بعد اختيار الخطة، ستتم إعادة توجيهك إلى صفحة PayPal لإكمال عملية الدفع. يمكنك استخدام بطاقة الائتمان أو حساب PayPal الخاص بك.'
    },
    {
      question: 'هل يمكنني تغيير الخطة لاحقاً؟',
      answer: 'نعم بالطبع! يمكنك الترقية من خطة لأخرى في أي وقت. سيتم احتساب الفرق في السعر فقط للفترة المتبقية من اشتراكك.'
    },
    {
      question: 'ماذا يحدث بعد انتهاء الاشتراك؟',
      answer: 'قبل انتهاء اشتراكك بـ 7 أيام، سنرسل لك تذكير. يمكنك التجديد والحصول على خصم 10% للمشتركات القديمات. إذا لم تجددي، سيتم إيقاف الوصول إلى المحتوى الحصري.'
    },
    {
      question: 'هل هناك ضمان لاسترجاع المال؟',
      answer: 'نعم! نقدم ضمان استرجاع المال خلال 14 يوم الأولى إذا لم تكوني راضية عن الخدمة. لا أسئلة تُطرح.'
    },
    {
      question: 'هل المتابعة شخصية فعلاً؟',
      answer: 'نعم 100%! أنا (راند جرار) شخصياً أتابع كل متدربة. كل برنامج مصمم خصيصاً بناءً على أهدافك، مستواك الحالي، وتفضيلاتك الغذائية.'
    },
    {
      question: 'ماذا أحتاج للبدء؟',
      answer: 'فقط التزامك وهاتفك! سنرسل لك استبيان تفصيلي لفهم أهدافك، ثم نبدأ بتصميم برنامجك الخاص خلال 24 ساعة.'
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <FaQuestionCircle className="section-icon" />
          <h2>الأسئلة الشائعة</h2>
          <p>إجابات على أكثر الأسئلة شيوعاً</p>
        </motion.div>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <button 
                className="faq-question"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaChevronDown />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div 
                    className="faq-answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="contact-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p>لديك سؤال آخر؟</p>
          <a href="#contact" className="contact-link">
            تواصلي معنا
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;