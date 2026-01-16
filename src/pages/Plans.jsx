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
      id: 'nutrition',
      name: 'Nutrition Plan',
      subtitle: 'Your Diet Under Control',
      price: 49,
      duration: '1 Month',
      popular: false,
      features: [
        'Your diet under control',
        'Accurate calorie and macro calculations',
        'Food exchange list to prevent boredom',
        'Monthly nutrition updates'
      ],
      color: 'green',
      icon: '🥗'
    },
    {
      id: 'basic',
      name: 'Basic Plan',
      subtitle: 'Perfect for Independent Start',
      price: 39,
      duration: '1 Month',
      popular: false,
      features: [
        'Ideal choice for independent beginning',
        'Clear roadmap for those who need structure',
        'Customized workout plan (Gym or Home)',
        'Calculated nutrition plan (Macros/Calories)',
        'Monthly plan updates'
      ],
      color: 'blue',
      icon: '💪'
    },
    {
      id: 'elite',
      name: 'Elite Plan',
      subtitle: 'Commitment & Follow-up',
      price: 79,
      duration: '1 Month',
      popular: true,
      badge: 'Most Popular',
      features: [
        'Everything in Basic Plan',
        'Guaranteed results with commitment and follow-up',
        'Regular adjustments for optimal progress',
        'Weekly progress check-ins',
        'Chat support for your questions',
        'Supplements guidance'
      ],
      color: 'pink',
      icon: '🔥'
    },
    {
      id: 'vip',
      name: 'VIP Plan',
      subtitle: 'Complete Personal Training Experience',
      price: 149,
      duration: '1 Month',
      popular: false,
      features: [
        'Everything in Elite Plan',
        'Direct daily support',
        'Priority communication',
        'One-on-one monthly consulting session'
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