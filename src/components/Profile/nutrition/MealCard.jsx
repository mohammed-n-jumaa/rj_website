import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaClock, FaChevronDown, FaFilePdf } from 'react-icons/fa';

const MealCard = ({ meal, index, isSelected, onToggle }) => {
  const handleCheckToggle = (e) => {
    e.stopPropagation();
    // Handle meal check toggle
  };

  const handleDownloadPDF = (e) => {
    e.stopPropagation();
    if (meal.pdfUrl) {
      // في المستقبل سيتم تحميل PDF من Laravel API
      window.open(meal.pdfUrl, '_blank');
      console.log('Downloading PDF:', meal.pdfUrl);
    }
  };

  return (
    <motion.div
      className={`meal-card ${meal.checked ? 'checked' : ''} ${isSelected ? 'expanded' : ''}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="meal-header" onClick={onToggle}>
        <div className="meal-main">
          <motion.button
            className={`check-btn ${meal.checked ? 'checked' : ''}`}
            onClick={handleCheckToggle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {meal.checked && <FaCheckCircle />}
          </motion.button>
          <div className="meal-info">
            <h4>{meal.name}</h4>
            <span className="meal-time">
              <FaClock /> {meal.time}
            </span>
          </div>
        </div>
        <div className="meal-summary">
          <span className="calories">{meal.calories} kcal</span>
          {meal.pdfUrl && (
            <motion.button
              className="pdf-btn"
              onClick={handleDownloadPDF}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="تحميل النظام الغذائي PDF"
            >
              <FaFilePdf />
            </motion.button>
          )}
          <motion.div 
            className="expand-icon"
            animate={{ rotate: isSelected ? 180 : 0 }}
          >
            <FaChevronDown />
          </motion.div>
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
                <span className="macro-label">بروتين</span>
                <span className="macro-value">{meal.protein}g</span>
              </div>
              <div className="macro-item">
                <span className="macro-label">كارب</span>
                <span className="macro-value">{meal.carbs}g</span>
              </div>
              <div className="macro-item">
                <span className="macro-label">دهون</span>
                <span className="macro-value">{meal.fats}g</span>
              </div>
            </div>
            <div className="meal-items">
              <h5>المكونات:</h5>
              <ul>
                {meal.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            
            {meal.pdfUrl && (
              <motion.button
                className="download-full-pdf"
                onClick={handleDownloadPDF}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaFilePdf />
                تحميل النظام الغذائي الكامل PDF
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MealCard;