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
      name: 'Healthy Start',
      subtitle: 'For Beginners',
      price: 149,
      duration: '1 Month',
      popular: false,
      features: [
        'Customized workout program based on your level',
        'Personal nutrition plan',
        'Weekly follow-up',
        'Private chat with coach (24-hour response)',
        'Continuous tips and motivation'
      ],
      color: 'blue',
      icon: '💪'
    },
    {
      id: 'commitment',
      name: 'Commitment & Change',
      subtitle: 'Most Popular',
      price: 349,
      duration: '3 Months',
      popular: true,
      features: [
        'Custom workout program updated based on progress',
        'Personal nutrition plan for each trainee',
        'Continuous weekly follow-up',
        'Direct private chat with coach (quick response)',
        'Weight and measurements tracking',
        'Healthy lifestyle guidance'
      ],
      color: 'pink',
      icon: '🔥'
    },
    {
      id: 'elite',
      name: 'Complete Transformation',
      subtitle: 'For Strong Results',
      price: 549,
      duration: '3 Months',
      popular: false,
      features: [
        'Advanced professional workout program',
        'Precise nutrition plan based on goal',
        'Direct daily follow-up',
        'Private chat with coach 24/7',
        'Comprehensive body assessment',
        'Custom plan for body shape',
        'Motivation and psychological follow-up',
        'Top priority in response and support'
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