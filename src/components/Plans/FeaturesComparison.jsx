import { motion } from 'framer-motion';
import { FaCheck, FaTimes } from 'react-icons/fa';

const FeaturesComparison = ({ plans }) => {
  const allFeatures = [
    { 
      name: 'برنامج تدريب مخصص',
      basic: true,
      premium: true,
      vip: true
    },
    { 
      name: 'خطة تغذية',
      basic: 'شهرية',
      premium: 'أسبوعية',
      vip: 'أسبوعية + مكملات'
    },
    { 
      name: 'المتابعة',
      basic: 'أسبوعية',
      premium: 'يومية',
      vip: '24/7'
    },
    { 
      name: 'الدعم',
      basic: 'واتساب',
      premium: 'واتساب',
      vip: 'واتساب + مكالمات'
    },
    { 
      name: 'تحديث البرنامج',
      basic: 'شهرياً',
      premium: 'كل أسبوعين',
      vip: 'أسبوعياً'
    },
    { 
      name: 'جلسات استشارية',
      basic: '3 جلسات',
      premium: 'غير محدودة',
      vip: 'غير محدودة'
    },
    { 
      name: 'فيديوهات تدريبية',
      basic: false,
      premium: true,
      vip: true
    },
    { 
      name: 'وصفات طعام صحية',
      basic: false,
      premium: true,
      vip: true
    },
    { 
      name: 'كتاب التحول الشامل',
      basic: false,
      premium: true,
      vip: true
    },
    { 
      name: 'مكالمات فيديو',
      basic: false,
      premium: false,
      vip: 'أسبوعية'
    },
    { 
      name: 'تحليل شامل للجسم',
      basic: false,
      premium: false,
      vip: true
    },
    { 
      name: 'أولوية في الدعم',
      basic: false,
      premium: false,
      vip: true
    },
    { 
      name: 'ورشة عمل شهرية',
      basic: false,
      premium: false,
      vip: true
    },
    { 
      name: 'مجموعة VIP حصرية',
      basic: false,
      premium: false,
      vip: true
    }
  ];

  const renderCell = (value) => {
    if (value === true) {
      return <FaCheck className="check-icon" />;
    } else if (value === false) {
      return <FaTimes className="times-icon" />;
    } else {
      return <span className="feature-value">{value}</span>;
    }
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
          <h2>قارني بين الخطط</h2>
          <p>اختاري الخطة المناسبة بناءً على احتياجاتك</p>
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
                  <th className="feature-column">الميزة</th>
                  <th className="plan-column basic">الأساسي</th>
                  <th className="plan-column premium">الذهبي</th>
                  <th className="plan-column vip">VIP</th>
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
                    <td className="premium">{renderCell(feature.premium)}</td>
                    <td className="vip">{renderCell(feature.vip)}</td>
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