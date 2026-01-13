import { motion } from 'framer-motion';
import { FaCheck, FaTimes } from 'react-icons/fa';

const FeaturesComparison = () => {
  const allFeatures = [
    {
      name: 'برنامج تمارين مخصص',
      starter: true,
      commitment: true,
      elite: true
    },
    {
      name: 'نظام غذائي شخصي',
      starter: true,
      commitment: true,
      elite: true
    },
    {
      name: 'تحديث البرنامج',
      starter: 'شهري',
      commitment: 'حسب التقدم',
      elite: 'مستمر'
    },
    {
      name: 'المتابعة',
      starter: 'أسبوعية',
      commitment: 'عدة مرات أسبوعيًا',
      elite: 'يومية'
    },
    {
      name: 'الشات مع المدربة',
      starter: 'خاص (رد خلال 24 ساعة)',
      commitment: 'خاص (رد سريع)',
      elite: 'خاص 24/7'
    },
    {
      name: 'متابعة الوزن والقياسات',
      starter: false,
      commitment: true,
      elite: true
    },
    {
      name: 'إرشادات نمط حياة صحي',
      starter: false,
      commitment: true,
      elite: true
    },
    {
      name: 'تقييم شامل للجسم',
      starter: false,
      commitment: false,
      elite: true
    },
    {
      name: 'خطة لتحسين شكل الجسم',
      starter: false,
      commitment: false,
      elite: true
    },
    {
      name: 'دعم وتحفيز نفسي',
      starter: false,
      commitment: true,
      elite: true
    },
    {
      name: 'أولوية في الرد والدعم',
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
          <h2>قارني بين خطط التدريب</h2>
          <p>
            كل خطة مصممة لتناسب مستوى مختلف من الالتزام والهدف
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
                  <th className="feature-column">الميزة</th>
                  <th className="plan-column starter">البداية الصحية</th>
                  <th className="plan-column commitment">الالتزام والتغيير</th>
                  <th className="plan-column elite">التحول الكامل</th>
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
