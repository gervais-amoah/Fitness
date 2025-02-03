import { WorkoutWithExercises } from '@/types/models';
import { create } from 'zustand';
import * as Crypto from 'expo-crypto';

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
    const newWorkout: WorkoutWithExercises = {
      id: Crypto.randomUUID(),
      createdAt: new Date(),
      finishedAt: null,
      exercises: [],
    };

    set({ currentWorkout: newWorkout });
  },

  finishWorkout: () => {
    const { currentWorkout, workouts } = get();

    if (!currentWorkout) return;

    const finishedWorkout: WorkoutWithExercises = {
      ...currentWorkout,
      finishedAt: new Date(),
    };
    set({ currentWorkout: null, workouts: [...workouts, finishedWorkout] });
  },
}));
