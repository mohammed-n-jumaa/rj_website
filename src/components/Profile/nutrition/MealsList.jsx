import { motion } from 'framer-motion';
import MealCard from './MealCard';

const MealsList = ({ meals, selectedMeal, setSelectedMeal }) => {
  return (
    <div className="meals-list">
      {meals.map((meal, index) => (
        <MealCard
          key={meal.id}
          meal={meal}
          index={index}
          isSelected={selectedMeal === meal.id}
          onToggle={() => setSelectedMeal(selectedMeal === meal.id ? null : meal.id)}
        />
      ))}
    </div>
  );
};

export default MealsList;