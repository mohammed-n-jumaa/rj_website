import { motion } from 'framer-motion';
import DayCard from './DayCard';

const WorkoutWeek = ({ workoutPlan, expandedDay, setExpandedDay }) => {
  return (
    <div className="workout-week">
      {workoutPlan.map((day, dayIndex) => (
        <DayCard
          key={dayIndex}
          day={day}
          dayIndex={dayIndex}
          isExpanded={expandedDay === dayIndex}
          onToggle={() => setExpandedDay(expandedDay === dayIndex ? null : dayIndex)}
        />
      ))}
    </div>
  );
};

export default WorkoutWeek;