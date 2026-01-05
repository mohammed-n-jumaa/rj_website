import { motion } from 'framer-motion';
import ExerciseItem from './ExerciseItem';

const ExercisesList = ({ exercises, dayIndex }) => {
  return (
    <motion.div
      className="exercises-list"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {exercises.map((exercise, exerciseIndex) => (
        <ExerciseItem
          key={exerciseIndex}
          exercise={exercise}
          dayIndex={dayIndex}
          exerciseIndex={exerciseIndex}
        />
      ))}
    </motion.div>
  );
};

export default ExercisesList;