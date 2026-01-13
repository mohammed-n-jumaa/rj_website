import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import PlanCard from '../components/Plans/PlanCard';
import PaymentModal from '../components/Plans/PaymentModal';
import FeaturesComparison from '../components/Plans/FeaturesComparison';
import './Plans.scss';

const Plans = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  /* =======================
     Plans Data
  ======================= */
  const plans = [
    {
      id: 'starter',
      name: 'البداية الصحية',
      subtitle: 'للمبتدئات',
      price: 149,
      duration: 'شهر واحد',
      popular: false,
      features: [
        'برنامج تمارين مخصص حسب مستواك',
        'نظام غذائي خاص بك',
        'متابعة أسبوعية',
        'شات خاص مع المدربة (رد خلال 24 ساعة)',
        'نصائح وتحفيز مستمر'
      ],
      color: 'blue',
      icon: '💪'
    },
    {
      id: 'commitment',
      name: 'الالتزام والتغيير',
      subtitle: 'الأكثر اختيارًا',
      price: 349,
      duration: '3 أشهر',
      popular: true,
      features: [
        'برنامج تمارين مخصص ويتم تحديثه حسب التقدم',
        'نظام غذائي شخصي لكل متدربة',
        'متابعة مستمرة طوال الأسبوع',
        'شات خاص مباشر مع المدربة (رد سريع)',
        'متابعة الوزن والقياسات',
        'إرشادات لنمط حياة صحي'
      ],
      color: 'pink',
      icon: '🔥'
    },
    {
      id: 'elite',
      name: 'التحول الكامل',
      subtitle: 'لمن تريد نتائج قوية',
      price: 549,
      duration: '3 أشهر',
      popular: false,
      features: [
        'برنامج تمارين احترافي متقدم',
        'نظام غذائي دقيق حسب الهدف',
        'متابعة يومية مباشرة',
        'شات خاص مع المدربة 24/7',
        'تقييم شامل للجسم',
        'خطة مخصصة لشكل الجسم',
        'تحفيز ومتابعة نفسية',
        'أولوية قصوى في الرد والدعم'
      ],
      color: 'gold',
      icon: '👑'
    }
  ];

  /* =======================
     Handlers
  ======================= */
  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    navigate('/profile');
  };

  return (
    <div className="plans-page">
      <Header />

      {/* =======================
          Hero Section
      ======================= */}
      <section className="plans-hero">
        <div className="hero-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>

        <div className="container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="hero-label">خطط التدريب والاشتراك</span>

            <h1 className="hero-title">
              طريقك لجسم صحي  
              <span className="gradient-text"> يبدأ من هنا</span>
            </h1>

            <p className="hero-description">
              برامج تدريب ونظام غذائي مصممين خصيصًا لك،  
              مع شات خاص مباشر مع المدربة لمتابعة تقدمك خطوة بخطوة
            </p>
          </motion.div>
        </div>
      </section>

      {/* =======================
          Plans Section
      ======================= */}
      <section className="plans-section">
        <div className="container">
          <div className="plans-grid">
            {plans.map((plan, index) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                onSelect={handleSelectPlan}
                delay={index * 0.15}
              />
            ))}
          </div>

          {/* Trust Badges */}
          <motion.div
            className="trust-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="trust-badge">
              <span className="badge-icon">🥗</span>
              <span>نظام غذائي مخصص لكل متدربة</span>
            </div>

            <div className="trust-badge">
              <span className="badge-icon">💬</span>
              <span>شات خاص مباشر مع المدربة</span>
            </div>

            <div className="trust-badge">
              <span className="badge-icon">⚡</span>
              <span>بدء فوري بعد الاشتراك</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =======================
          Features Comparison
      ======================= */}
      <FeaturesComparison plans={plans} />

      {/* =======================
          Payment Modal
      ======================= */}
      {showPaymentModal && (
        <PaymentModal
          plan={selectedPlan}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default Plans;
