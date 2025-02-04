import { createExercise } from '@/services/exerciseService';
import { createSet, updateSet } from '@/services/setService';
import { finishWorkout, newWorkout } from '@/services/workoutService';
import { ExerciseSet, WorkoutWithExercises } from '@/types/models';
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

  addSet: (exerciseId: string) => void;
  updateSet: (
    setId: string,
    updatedFields: Pick<ExerciseSet, 'weight' | 'reps'>
  ) => void;
  deleteSet: (setId: string) => void;
};

export const useWorkoutStore = create<State & Actions>()(
  immer((set, get) => ({
    //  States
    currentWorkout: null,
    workouts: [],

    // Actions
    startWorkout: async () => {
      set({ currentWorkout: await newWorkout() });
    },

    finishWorkout: async () => {
      const { currentWorkout } = get();

      if (!currentWorkout) return;

      const finishedWorkout = await finishWorkout(currentWorkout);

      set((state) => {
        state.currentWorkout = null;
        state.workouts.unshift(finishedWorkout);
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

    addSet: (exerciseId: string) => {
      const newSet = createSet(exerciseId);

      set(({ currentWorkout }) => {
        const exercise = currentWorkout?.exercises.find(
          (ex) => ex.id === newSet.exerciseId
        );
        if (exercise) {
          exercise.sets.push(newSet);
        }
      });
    },
    updateSet: (
      setId: string,
      updatedFields: Pick<ExerciseSet, 'weight' | 'reps'>
    ) => {
      set(({ currentWorkout }) => {
        const exercise = currentWorkout?.exercises.find((ex) =>
          ex.sets.some((set) => set.id === setId)
        );

        if (exercise) {
          const setToUpdate = exercise.sets.find((set) => set.id === setId);
          if (setToUpdate) {
            const newSet = updateSet(setToUpdate, updatedFields);
            Object.assign(setToUpdate, newSet);
          }
        }
      });
    },
    deleteSet: (setId) => {
      set(({ currentWorkout }) => {
        if (!currentWorkout) return;

        const exercise = currentWorkout.exercises.find((ex) =>
          ex.sets.some((set) => set.id === setId)
        );

        if (exercise) {
          exercise.sets = exercise.sets.filter((set) => set.id !== setId);

          if (exercise.sets.length === 0) {
            currentWorkout.exercises = currentWorkout.exercises.filter(
              (ex) => ex.id !== exercise.id
            );
          }
        }
      });
    },
  }))
);
