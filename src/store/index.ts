import { createExercise } from '@/services/exerciseService';
import { finishWorkout, newWorkout } from '@/services/workoutService';
import { WorkoutWithExercises } from '@/types/models';
import { create } from 'zustand';

type State = {
  currentWorkout: WorkoutWithExercises | null;
  workouts: WorkoutWithExercises[];
};

type Actions = {
  startWorkout: () => void;
  finishWorkout: () => void;

  addExercise: (name: string) => void;
  // removeExercise: (exercise: ExerciseWithSets) => void;
};

export const useWorkoutStore = create<State & Actions>()((set, get) => ({
  //  States
  currentWorkout: null,
  workouts: [],

  // Actions
  startWorkout: () => {
    set({ currentWorkout: newWorkout() });
  },

  finishWorkout: () => {
    const { currentWorkout, workouts } = get();

    if (!currentWorkout) return;

    set({
      workouts: [...workouts, finishWorkout(currentWorkout)],
      currentWorkout: null,
    });
  },

  addExercise: (name: string) => {
    const { currentWorkout } = get();

    if (!currentWorkout) return;

    set({
      currentWorkout: {
        ...currentWorkout,
        exercises: [
          ...currentWorkout.exercises,
          createExercise(name, currentWorkout.id),
        ],
      },
    });
  },
}));
