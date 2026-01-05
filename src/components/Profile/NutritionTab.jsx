import { useState } from 'react';
import MacrosSummary from './nutrition/MacrosSummary';
import MealsList from './nutrition/MealsList';

const NutritionTab = ({ nutritionPlan }) => {
  const [selectedMeal, setSelectedMeal] = useState(null);

  return (
    <div className="nutrition-tab">
      <MacrosSummary macros={nutritionPlan} />
      <MealsList 
        meals={nutritionPlan.meals}
        selectedMeal={selectedMeal}
        setSelectedMeal={setSelectedMeal}
      />
    </div>
  );
};

export default NutritionTab;