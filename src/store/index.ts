import { WorkoutWithExercises } from '@/types/models';
import { create } from 'zustand';
import * as Crypto from 'expo-crypto';
import { finishWorkout, newWorkout } from '@/services/workoutService';

type State = {
  currentWorkout: WorkoutWithExercises | null;
  workouts: WorkoutWithExercises[];
};

type Actions = {
  startWorkout: () => void;
  finishWorkout: () => void;
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
}));
