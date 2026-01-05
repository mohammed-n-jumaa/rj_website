import { useState } from 'react';
import WorkoutWeek from './workout/WorkoutWeek';

const WorkoutTab = ({ workoutPlan }) => {
  const [expandedDay, setExpandedDay] = useState(null);

  return (
    <div className="workout-tab">
      <WorkoutWeek 
        workoutPlan={workoutPlan}
        expandedDay={expandedDay}
        setExpandedDay={setExpandedDay}
      />
    </div>
  );
};

export default WorkoutTab;