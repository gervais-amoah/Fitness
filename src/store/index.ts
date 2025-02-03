import { WorkoutWithExercises } from '@/types/models';
import { create } from 'zustand';

type State = {
  currentWorkout: WorkoutWithExercises | null;
};

type Actions = {
  startWorkout: () => void;
};

export const useWorkoutStore = create<State & Actions>()((set) => ({
  //  States
  currentWorkout: null,

  // Actions
  startWorkout: () => {
    const newWorkout: WorkoutWithExercises = {
      id: '1',
      createdAt: new Date(),
      finishedAt: null,
      exercises: [],
    };

    set({ currentWorkout: newWorkout });
  },
}));
