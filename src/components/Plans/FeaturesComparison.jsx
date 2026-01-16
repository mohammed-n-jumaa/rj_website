import { motion } from 'framer-motion';
import { FaCheck, FaTimes } from 'react-icons/fa';

const FeaturesComparison = ({ plans }) => {
  const allFeatures = [
    {
      name: 'Customized workout program',
      basic: true,
      elite: true,
      vip: true,
      nutrition: false
    },
    {
      name: 'Personal nutrition plan',
      basic: true,
      elite: true,
      vip: true,
      nutrition: true
    },
    {
      name: 'Program updates',
      basic: 'Monthly',
      elite: 'Weekly adjustments',
      vip: 'Daily updates',
      nutrition: 'Monthly'
    },
    {
      name: 'Follow-up frequency',
      basic: 'Self-guided',
      elite: 'Weekly check-ins',
      vip: 'Daily support',
      nutrition: 'Self-guided'
    },
    {
      name: 'Chat support',
      basic: false,
      elite: 'Standard response time',
      vip: 'Priority 24/7',
      nutrition: false
    },
    {
      name: 'Supplements guidance',
      basic: false,
      elite: true,
      vip: true,
      nutrition: false
    },
    {
      name: 'Exercise form correction',
      basic: false,
      elite: false,
      vip: 'Video analysis',
      nutrition: false
    },
    {
      name: 'Monthly consulting session',
      basic: false,
      elite: false,
      vip: true,
      nutrition: false
    },
    {
      name: 'Food exchange lists',
      basic: false,
      elite: false,
      vip: false,
      nutrition: true
    },
    {
      name: 'Macros calculation',
      basic: true,
      elite: true,
      vip: true,
      nutrition: true
    }
  ];

  const renderCell = (value) => {
    if (value === true) {
      return <FaCheck className="check-icon" />;
    }
    if (value === false) {
      return <FaTimes className="times-icon" />;
    }
    return <span className="feature-value">{value}</span>;
  };

  return (
    <section className="comparison-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2>Compare Training Plans</h2>
          <p>
            Each plan is designed to suit a different level of commitment and goal
          </p>
        </motion.div>

        <motion.div
          className="comparison-table"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th className="feature-column">Feature</th>
                  <th className="plan-column basic">Basic Plan</th>
                  <th className="plan-column elite">Elite Plan</th>
                  <th className="plan-column vip">VIP Ultimate</th>
                  <th className="plan-column nutrition">Nutrition Only</th>
                </tr>
              </thead>

              <tbody>
                {allFeatures.map((feature, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <td className="feature-name">{feature.name}</td>
                    <td className="basic">{renderCell(feature.basic)}</td>
                    <td className="elite">{renderCell(feature.elite)}</td>
                    <td className="vip">{renderCell(feature.vip)}</td>
                    <td className="nutrition">{renderCell(feature.nutrition)}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesComparison;