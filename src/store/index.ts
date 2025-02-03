import { createExercise } from '@/services/exerciseService';
import { finishWorkout, newWorkout } from '@/services/workoutService';
import { WorkoutWithExercises } from '@/types/models';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

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

export const useWorkoutStore = create<State & Actions>()(
  immer((set, get) => ({
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

      set((state) => {
        state.currentWorkout = null;
        state.workouts.unshift(currentWorkout);
      });
    },

    addExercise: (name: string) => {
      const { currentWorkout } = get();

      if (!currentWorkout) return;

      const newExercise = createExercise(name, currentWorkout.id);

      set((state) => {
        state.currentWorkout?.exercises.push(newExercise);
      });
    },
  }))
);
