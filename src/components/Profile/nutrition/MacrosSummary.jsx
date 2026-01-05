import { motion } from 'framer-motion';
import { FaFire, FaDumbbell, FaAppleAlt, FaBolt } from 'react-icons/fa';

const MacrosSummary = ({ macros }) => {
  const macroCards = [
    { icon: FaFire, label: 'سعرة حرارية', value: macros.totalCalories, type: 'calories' },
    { icon: FaDumbbell, label: 'بروتين', value: `${macros.protein}g`, type: 'protein' },
    { icon: FaAppleAlt, label: 'كربوهيدرات', value: `${macros.carbs}g`, type: 'carbs' },
    { icon: FaBolt, label: 'دهون', value: `${macros.fats}g`, type: 'fats' }
  ];

  return (
    <div className="macros-summary">
      {macroCards.map((macro, index) => (
        <motion.div
          key={index}
          className="macro-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className={`macro-icon ${macro.type}`}>
            <macro.icon />
          </div>
          <div className="macro-info">
            <span className="macro-value">{macro.value}</span>
            <span className="macro-label">{macro.label}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MacrosSummary;