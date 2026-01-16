import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaClock, FaChevronDown } from 'react-icons/fa';

const MealCard = ({ meal, index, isSelected, onToggle, dayNumber }) => {
  const handleCheckToggle = (e) => {
    e.stopPropagation();
    // Handle meal check toggle
    console.log(`Toggling meal: ${meal.name} for day ${dayNumber}`);
  };

  return (
    <motion.div
      className={`meal-card ${meal.checked ? 'checked' : ''} ${isSelected ? 'expanded' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="meal-header" onClick={onToggle}>
        <div className="meal-main">
          <button
            className={`check-btn ${meal.checked ? 'checked' : ''}`}
            onClick={handleCheckToggle}
          >
            {meal.checked && <FaCheckCircle />}
          </button>
          <div className="meal-info">
            <h4>{meal.name}</h4>
            <span className="meal-time">
              <FaClock /> {meal.time}
            </span>
          </div>
        </div>
        <div className="meal-summary">
          <span className="calories">{meal.calories} kcal</span>
          <FaChevronDown
            className="expand-icon"
            style={{ transform: isSelected ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        </div>
      </div>

      <AnimatePresence>
        {isSelected && (
          <motion.div
            className="meal-details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="macros-row">
              <div className="macro-item">
                <span className="macro-label">Protein</span>
                <span className="macro-value">{meal.protein}g</span>
              </div>
              <div className="macro-item">
                <span className="macro-label">Carbs</span>
                <span className="macro-value">{meal.carbs}g</span>
              </div>
              <div className="macro-item">
                <span className="macro-label">Fats</span>
                <span className="macro-value">{meal.fats}g</span>
              </div>
            </div>

            <div className="meal-items">
              <h5>Ingredients:</h5>
              <ul>
                {meal.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            {meal.instructions && (
              <div className="meal-instructions">
                <h5>Preparation Instructions:</h5>
                <p>{meal.instructions}</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MealCard;