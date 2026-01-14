import { motion } from 'framer-motion';
import { FaFire, FaDumbbell, FaAppleAlt, FaBolt } from 'react-icons/fa';

const MacrosSummary = ({ macros }) => {
  const macroCards = [
    { icon: FaFire, label: 'Calories', value: macros.totalCalories, type: 'calories' },
    { icon: FaDumbbell, label: 'Protein', value: `${macros.protein}g`, type: 'protein' },
    { icon: FaAppleAlt, label: 'Carbs', value: `${macros.carbs}g`, type: 'carbs' },
    { icon: FaBolt, label: 'Fats', value: `${macros.fats}g`, type: 'fats' }
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
            <div className="macro-value">{macro.value}</div>
            <div className="macro-label">{macro.label}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MacrosSummary;