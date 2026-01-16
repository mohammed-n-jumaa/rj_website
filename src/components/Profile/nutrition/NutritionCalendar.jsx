import { motion } from 'framer-motion';
import { FaFire, FaDumbbell, FaAppleAlt, FaBolt, FaEye } from 'react-icons/fa';

const NutritionCalendar = ({ nutritionPlan, selectedDay, setSelectedDay, setViewMode }) => {
  const handleViewDay = (dayNumber) => {
    setSelectedDay(dayNumber);
    setViewMode('daily');
  };

  return (
    <div className="nutrition-calendar">
      <div className="calendar-header">
        <h3>10-Day Nutrition Overview</h3>
        <p>Click on any day to view detailed meal plan</p>
      </div>

      <div className="calendar-grid">
        {nutritionPlan.days.map((day, index) => {
          const dayNumber = index + 1;
          const isSelected = selectedDay === dayNumber;

          return (
            <motion.div
              key={dayNumber}
              className={`calendar-day-card ${isSelected ? 'selected' : ''}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="day-header">
                <div className="day-number-badge">Day {dayNumber}</div>
                <div className="day-date">{day.date}</div>
              </div>

              <div className="day-macros-grid">
                <div className="macro-mini calories">
                  <FaFire />
                  <div className="macro-mini-info">
                    <span className="macro-mini-value">{day.totalCalories}</span>
                    <span className="macro-mini-label">kcal</span>
                  </div>
                </div>

                <div className="macro-mini protein">
                  <FaDumbbell />
                  <div className="macro-mini-info">
                    <span className="macro-mini-value">{day.protein}g</span>
                    <span className="macro-mini-label">Protein</span>
                  </div>
                </div>

                <div className="macro-mini carbs">
                  <FaAppleAlt />
                  <div className="macro-mini-info">
                    <span className="macro-mini-value">{day.carbs}g</span>
                    <span className="macro-mini-label">Carbs</span>
                  </div>
                </div>

                <div className="macro-mini fats">
                  <FaBolt />
                  <div className="macro-mini-info">
                    <span className="macro-mini-value">{day.fats}g</span>
                    <span className="macro-mini-label">Fats</span>
                  </div>
                </div>
              </div>

              <div className="day-meals-summary">
                <h5>Meals ({day.meals.length})</h5>
                <ul>
                  {day.meals.slice(0, 3).map((meal, mealIndex) => (
                    <li key={mealIndex}>
                      <span className="meal-name">{meal.name}</span>
                      <span className="meal-calories">{meal.calories} kcal</span>
                    </li>
                  ))}
                  {day.meals.length > 3 && (
                    <li className="more-meals">+{day.meals.length - 3} more meals</li>
                  )}
                </ul>
              </div>

              <button
                className="view-day-btn"
                onClick={() => handleViewDay(dayNumber)}
              >
                <FaEye />
                <span>View Full Day</span>
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default NutritionCalendar;