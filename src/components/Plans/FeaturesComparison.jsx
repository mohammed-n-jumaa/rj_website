import { motion } from 'framer-motion';
import { FaCheck, FaTimes } from 'react-icons/fa';

const FeaturesComparison = () => {
  const allFeatures = [
    {
      name: 'Custom workout program',
      starter: true,
      commitment: true,
      elite: true
    },
    {
      name: 'Personal nutrition plan',
      starter: true,
      commitment: true,
      elite: true
    },
    {
      name: 'Program updates',
      starter: 'Monthly',
      commitment: 'Based on progress',
      elite: 'Continuous'
    },
    {
      name: 'Follow-up',
      starter: 'Weekly',
      commitment: 'Multiple times weekly',
      elite: 'Daily'
    },
    {
      name: 'Chat with coach',
      starter: 'Private (24hr response)',
      commitment: 'Private (quick response)',
      elite: 'Private 24/7'
    },
    {
      name: 'Weight and measurements tracking',
      starter: false,
      commitment: true,
      elite: true
    },
    {
      name: 'Healthy lifestyle guidance',
      starter: false,
      commitment: true,
      elite: true
    },
    {
      name: 'Comprehensive body assessment',
      starter: false,
      commitment: false,
      elite: true
    },
    {
      name: 'Body shape improvement plan',
      starter: false,
      commitment: false,
      elite: true
    },
    {
      name: 'Psychological support and motivation',
      starter: false,
      commitment: true,
      elite: true
    },
    {
      name: 'Priority in response and support',
      starter: false,
      commitment: false,
      elite: true
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
                  <th className="plan-column starter">Healthy Start</th>
                  <th className="plan-column commitment">Commitment & Change</th>
                  <th className="plan-column elite">Complete Transformation</th>
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
                    <td className="starter">{renderCell(feature.starter)}</td>
                    <td className="commitment">{renderCell(feature.commitment)}</td>
                    <td className="elite">{renderCell(feature.elite)}</td>
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