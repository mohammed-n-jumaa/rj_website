import { useState } from 'react';
import MacrosSummary from './nutrition/MacrosSummary';
import NutritionCalendar from './nutrition/NutritionCalendar';
import MealsList from './nutrition/MealsList';
import { FaFilePdf, FaCalendarAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const NutritionTab = ({ nutritionPlan }) => {
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [selectedDay, setSelectedDay] = useState(1);
  const [viewMode, setViewMode] = useState('daily'); // 'daily' or 'calendar'

  const handleDownloadMonthlyPDF = () => {
    if (nutritionPlan.monthlyPdfUrl) {
      window.open(nutritionPlan.monthlyPdfUrl, '_blank');
      console.log('Downloading monthly PDF:', nutritionPlan.monthlyPdfUrl);
    }
  };

  return (
    <div className="nutrition-tab">
      {/* Macros Summary */}
      <MacrosSummary macros={nutritionPlan.days[selectedDay - 1]} />

      {/* View Mode Toggle & Monthly PDF */}
      <div className="nutrition-controls">
        <div className="view-toggle">
          <button
            className={`toggle-btn ${viewMode === 'daily' ? 'active' : ''}`}
            onClick={() => setViewMode('daily')}
          >
            <FaCalendarAlt />
            <span>Daily View</span>
          </button>
          <button
            className={`toggle-btn ${viewMode === 'calendar' ? 'active' : ''}`}
            onClick={() => setViewMode('calendar')}
          >
            <FaCalendarAlt />
            <span>10-Day Calendar</span>
          </button>
        </div>

        <motion.button
          className="monthly-pdf-btn"
          onClick={handleDownloadMonthlyPDF}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaFilePdf />
          <span>Download Monthly Plan (PDF)</span>
        </motion.button>
      </div>

      {/* Content based on view mode */}
      {viewMode === 'daily' ? (
        <>
          {/* Day Selector */}
          <div className="day-selector">
            {nutritionPlan.days.map((day, index) => (
              <button
                key={index}
                className={`day-btn ${selectedDay === index + 1 ? 'active' : ''}`}
                onClick={() => {
                  setSelectedDay(index + 1);
                  setSelectedMeal(null);
                }}
              >
                <span className="day-number">Day {index + 1}</span>
                <span className="day-date">{day.date}</span>
              </button>
            ))}
          </div>

          {/* Meals List for Selected Day */}
          <MealsList
            meals={nutritionPlan.days[selectedDay - 1].meals}
            selectedMeal={selectedMeal}
            setSelectedMeal={setSelectedMeal}
            dayNumber={selectedDay}
          />
        </>
      ) : (
        <NutritionCalendar
          nutritionPlan={nutritionPlan}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          setViewMode={setViewMode}
        />
      )}
    </div>
  );
};

export default NutritionTab;