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
      id: 'basic',
      name: 'Basic Plan',
      nameAr: 'الباقة الأساسية',
      subtitle: 'Self-Guided',
      subtitleAr: 'الاشتراك الذاتي',
      price: 49,
      duration: '1 Month',
      popular: false,
      features: [
        'Customized workout plan (Gym or Home)',
        'جدول تمارين مخصص (جيم أو منزل)',
        'Calculated nutrition plan (Macros/Calories)',
        'خطة تغذية محسوبة السعرات',
        'Monthly plan updates',
        'تحديث الخطة كل شهر'
      ],
      color: 'blue',
      icon: '💪'
    },
    {
      id: 'elite',
      name: 'Elite Plan',
      nameAr: 'باقة النخبة',
      subtitle: 'Weekly Follow-up',
      subtitleAr: 'متابعة أسبوعية',
      price: 99,
      duration: '1 Month',
      popular: true,
      badge: 'Best Seller',
      badgeAr: 'الأكثر مبيعاً',
      features: [
        'Everything in Basic Plan',
        'كل ما في الباقة الأساسية',
        'Weekly progress check-ins and adjustments',
        'متابعة أسبوعية لتقييم النتائج وتعديل الخطط',
        'Chat support for your questions',
        'رد على الاستفسارات عبر الشات',
        'Supplements guidance',
        'نصائح للمكملات الغذائية'
      ],
      color: 'pink',
      icon: '🔥'
    },
    {
      id: 'vip',
      name: 'VIP Ultimate Plan',
      nameAr: 'الباقة الشاملة',
      subtitle: 'Ultimate Support',
      subtitleAr: 'دعم شامل',
      price: 149,
      duration: '1 Month',
      popular: false,
      features: [
        'Everything in Elite Plan',
        'كل ما في باقة النخبة',
        'Daily direct support and priority replies',
        'دعم يومي مباشر وأولوية في الرد',
        'Exercise form correction via video',
        'تصحيح تكنيك التمارين عبر الفيديو',
        'One-on-one monthly consulting session',
        'جلسة استشارية شهرياً (أونلاين)'
      ],
      color: 'gold',
      icon: '👑'
    },
    {
      id: 'nutrition',
      name: 'Nutrition Only Plan',
      nameAr: 'باقة التغذية فقط',
      subtitle: 'Food & Diet Focus',
      subtitleAr: 'تركيز على الأكل',
      price: 39,
      duration: '1 Month',
      popular: false,
      features: [
        'Flexible nutrition plan tailored to your goal',
        'خطة تغذية مرنة تناسب هدفك (تنشيف/تضخيم)',
        'Food exchange list to prevent boredom',
        'قائمة بدائل للأطعمة لكسر الملل',
        'Macros and calories calculation',
        'حساب السعرات والبروتينات',
        'Monthly nutrition updates',
        'تحديث خطة التغذية شهرياً'
      ],
      color: 'green',
      icon: '🥗'
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
            <span className="hero-label">Training & Subscription Plans</span>

            <h1 className="hero-title">
              Your Path to a Healthy Body
              <span className="gradient-text"> Starts Here</span>
            </h1>

            <p className="hero-description">
              Training programs and nutrition plans designed specifically for you,
              with direct private chat with the coach to track your progress step by step
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
              <span>Custom nutrition plan for each trainee</span>
            </div>

            <div className="trust-badge">
              <span className="badge-icon">💬</span>
              <span>Direct private chat with coach</span>
            </div>

            <div className="trust-badge">
              <span className="badge-icon">⚡</span>
              <span>Instant start after subscription</span>
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