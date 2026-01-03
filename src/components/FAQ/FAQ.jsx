import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaChevronDown,
  FaQuestion,
  FaDumbbell,
  FaAppleAlt,
  FaCreditCard,
  FaClock,
  FaCheckCircle,
  FaUserFriends
} from 'react-icons/fa';
import './FAQ.scss';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const faqCategories = [
    {
      category: 'عام',
      icon: <FaQuestion />,
      color: '#E91E63',
      questions: [
        {
          id: 1,
          question: 'من هي رند جرار؟',
          answer: 'رند جرار مدربة لياقة بدنية معتمدة دولياً مع أكثر من 5 سنوات من الخبرة في تحويل حياة النساء. حاصلة على شهادات من NASM، ACE، ISSA وغيرها من المنظمات العالمية المرموقة.'
        },
        {
          id: 2,
          question: 'هل التدريب مناسب للمبتدئات؟',
          answer: 'نعم بالتأكيد! البرامج مصممة لتناسب جميع المستويات من المبتدئات إلى المتقدمات. كل برنامج يتم تخصيصه حسب مستواك الحالي وأهدافك الشخصية.'
        },
        {
          id: 3,
          question: 'كم عدد المتدربات اللواتي تم تدريبهن؟',
          answer: 'تم تدريب أكثر من 500 متدربة بنجاح، وحققن نتائج مذهلة في اللياقة والصحة. نسبة النجاح تصل إلى 98% مع الالتزام بالبرنامج.'
        }
      ]
    },
    {
      category: 'البرامج التدريبية',
      icon: <FaDumbbell />,
      color: '#9C27B0',
      questions: [
        {
          id: 4,
          question: 'ما هي أنواع البرامج المتوفرة؟',
          answer: 'نقدم برامج متنوعة تشمل: تنشيف وحرق الدهون، نحت القوام، زيادة الكتلة العضلية، تدريب للحوامل، تدريب ما بعد الولادة، وبرامج مخصصة للمبتدئات.'
        },
        {
          id: 5,
          question: 'كم مدة البرنامج التدريبي؟',
          answer: 'تتراوح مدة البرامج من شهرين إلى 6 أشهر حسب الهدف المطلوب. البرامج القصيرة (2-3 أشهر) مناسبة للتنشيف، بينما البرامج الأطول (4-6 أشهر) مناسبة لإعادة بناء الجسم بالكامل.'
        },
        {
          id: 6,
          question: 'هل التدريب أونلاين أم في الجيم؟',
          answer: 'التدريب أونلاين بالكامل! تحصلين على جلسات تدريب مباشرة عبر الفيديو، برنامج تمارين مخصص، متابعة يومية، ودعم مستمر عبر الواتساب.'
        },
        {
          id: 7,
          question: 'كم عدد الجلسات التدريبية في الأسبوع؟',
          answer: 'عادةً 3-5 جلسات أسبوعياً حسب البرنامج المختار ومستوى اللياقة. كل جلسة تتراوح بين 45-60 دقيقة، مع إمكانية التعديل حسب جدولك.'
        }
      ]
    },
    {
      category: 'التغذية',
      icon: <FaAppleAlt />,
      color: '#4CAF50',
      questions: [
        {
          id: 8,
          question: 'هل يشمل البرنامج نظام غذائي؟',
          answer: 'نعم! كل برنامج يتضمن خطة تغذية مخصصة مصممة خصيصاً لك بناءً على أهدافك، نمط حياتك، وتفضيلاتك الغذائية. النظام مرن ويمكن تعديله حسب احتياجاتك.'
        },
        {
          id: 9,
          question: 'هل النظام الغذائي صارم؟',
          answer: 'لا! نؤمن بالتوازن وليس الحرمان. النظام الغذائي مرن ويسمح بتناول الأطعمة التي تحبينها ضمن حدود معقولة، مع التركيز على خيارات صحية ومستدامة.'
        },
        {
          id: 10,
          question: 'هل يمكن تعديل النظام الغذائي؟',
          answer: 'بالتأكيد! يتم مراجعة وتعديل النظام الغذائي بشكل دوري حسب تقدمك ونتائجك. إذا كان هناك أطعمة لا تحبينها أو لديك حساسية، يتم استبدالها ببدائل مناسبة.'
        }
      ]
    },
    {
      category: 'الأسعار والدفع',
      icon: <FaCreditCard />,
      color: '#FF9800',
      questions: [
        {
          id: 11,
          question: 'كم تكلفة البرنامج التدريبي؟',
          answer: 'الأسعار تبدأ من 199$ للبرنامج الشهري، مع خصومات للباقات الطويلة (3-6 أشهر). للحصول على سعر دقيق حسب احتياجاتك، يرجى التواصل معنا للاستشارة المجانية.'
        },
        {
          id: 12,
          question: 'ما هي طرق الدفع المتاحة؟',
          answer: 'نقبل الدفع عبر: التحويل البنكي، بطاقات الائتمان (Visa/Mastercard)، PayPal، وخدمات الدفع الإلكتروني المحلية. يمكن الدفع دفعة واحدة أو على أقساط شهرية.'
        },
        {
          id: 13,
          question: 'هل يوجد ضمان استرداد الأموال؟',
          answer: 'نعم! نقدم ضمان استرداد كامل خلال أول 14 يوم إذا لم تكوني راضية عن البرنامج. نحن واثقون من جودة خدماتنا ونريدك أن تكوني راضية تماماً.'
        }
      ]
    },
    {
      category: 'النتائج والالتزام',
      icon: <FaCheckCircle />,
      color: '#2196F3',
      questions: [
        {
          id: 14,
          question: 'متى ستظهر النتائج؟',
          answer: 'النتائج الأولية تظهر خلال 2-4 أسابيع مع الالتزام بالبرنامج. النتائج الملموسة والتحول الكامل يظهر بعد 8-12 أسبوع. كل جسم مختلف، لكن الالتزام يضمن النجاح.'
        },
        {
          id: 15,
          question: 'ماذا لو لم ألتزم ببعض الأيام؟',
          answer: 'لا مشكلة! الحياة تحدث والمرونة مهمة. إذا فاتك يوم أو اثنين، يمكن تعديل الجدول والاستمرار. المهم هو الالتزام الإجمالي والعودة للمسار الصحيح بسرعة.'
        },
        {
          id: 16,
          question: 'كم كيلو يمكن أن أخسر؟',
          answer: 'بشكل صحي ومستدام، يمكن خسارة 2-4 كيلو شهرياً. المتوسط هو 8-15 كيلو خلال 3 أشهر مع الالتزام الكامل. نركز على خسارة الدهون وليس الوزن فقط، مع الحفاظ على العضلات.'
        }
      ]
    },
    {
      category: 'المتابعة والدعم',
      icon: <FaUserFriends />,
      color: '#795548',
      questions: [
        {
          id: 17,
          question: 'كيف تتم المتابعة؟',
          answer: 'متابعة يومية عبر الواتساب، جلسات فيديو أسبوعية للتقييم، تقارير تقدم شهرية، ودعم مستمر طوال فترة البرنامج. أنت لست وحدك في هذه الرحلة!'
        },
        {
          id: 18,
          question: 'هل يمكن التواصل في أي وقت؟',
          answer: 'نعم! يمكنك إرسال الأسئلة والاستفسارات في أي وقت عبر الواتساب. الرد يكون خلال 24 ساعة كحد أقصى، وعادة أسرع من ذلك. للحالات الطارئة، هناك خط مباشر متاح.'
        }
      ]
    }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="faq-section" id="faq">
      <div className="faq-container">
        {/* Header */}
        <motion.div 
          className="faq-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">الأسئلة الشائعة</span>
          <h2 className="section-title">كل ما تحتاجين معرفته</h2>
          <p className="section-description">
            إجابات واضحة على جميع أسئلتك. لم تجدي سؤالك؟ تواصلي معنا مباشرة!
          </p>

          {/* Search Bar */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="ابحثي عن سؤال..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <FaQuestion className="search-icon" />
          </div>
        </motion.div>

        {/* FAQ Categories */}
        <motion.div 
          className="faq-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {filteredFAQs.map((category, categoryIndex) => (
            <motion.div 
              key={categoryIndex} 
              className="faq-category"
              variants={itemVariants}
            >
              <div className="category-header">
                <div 
                  className="category-icon"
                  style={{ background: `linear-gradient(135deg, ${category.color}, ${category.color}dd)` }}
                >
                  {category.icon}
                </div>
                <h3 className="category-title">{category.category}</h3>
              </div>

              <div className="questions-list">
                {category.questions.map((item, index) => {
                  const globalIndex = `${categoryIndex}-${index}`;
                  const isActive = activeIndex === globalIndex;

                  return (
                    <motion.div
                      key={item.id}
                      className={`faq-item ${isActive ? 'active' : ''}`}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <button
                        className="faq-question"
                        onClick={() => toggleAccordion(globalIndex)}
                      >
                        <span className="question-text">{item.question}</span>
                        <motion.div
                          className="question-icon"
                          animate={{ rotate: isActive ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <FaChevronDown />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            className="faq-answer"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="answer-content">
                              <p>{item.answer}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div 
          className="faq-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3>لم تجدي إجابة لسؤالك؟</h3>
          <p>تواصلي معنا مباشرة وسنكون سعداء بمساعدتك</p>
          <div className="cta-buttons">
            <motion.button 
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              تواصلي معنا
            </motion.button>
            <motion.button 
              className="btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              احجزي استشارة مجانية
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Background Decoration */}
      <div className="faq-bg">
        <div className="bg-circle circle-1"></div>
        <div className="bg-circle circle-2"></div>
        <div className="bg-circle circle-3"></div>
      </div>
    </section>
  );
};

export default FAQ;