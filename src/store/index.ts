import { deleteExerciseInLocalDB } from '@/db/exercises';
import { deleteSetInLocalDB } from '@/db/sets';
import { createExercise } from '@/services/exerciseService';
import { createSet, updateSet } from '@/services/setService';
import {
  finishWorkout,
  getCurrentWorkoutWithExercises,
  getWorkoutsWithExercises,
  newWorkout,
} from '@/services/workoutService';
import { ExerciseSet, WorkoutWithExercises } from '@/types/models';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type State = {
  currentWorkout: WorkoutWithExercises | null;
  workouts: WorkoutWithExercises[];
};

type Actions = {
  loadWorkouts: () => void;
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
    loadWorkouts: async () => {
      const currentWorkout = await getCurrentWorkoutWithExercises();
      const finishedWorkouts = await getWorkoutsWithExercises();
      set({ currentWorkout, workouts: finishedWorkouts });
    },

    startWorkout: () => {
      set({ currentWorkout: newWorkout() });
    },

    finishWorkout: () => {
      const { currentWorkout } = get();
      if (!currentWorkout) return;

      const finishedWorkout = finishWorkout(currentWorkout);

      set((state) => {
        state.currentWorkout = null;
        if (finishedWorkout) {
          state.workouts.unshift(finishedWorkout);
        }
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
      deleteSetInLocalDB(setId);

      set(({ currentWorkout }) => {
        if (!currentWorkout) return;

        const exercise = currentWorkout.exercises.find((ex) =>
          ex.sets.some((set) => set.id === setId)
        );

        if (exercise) {
          exercise.sets = exercise.sets.filter((set) => set.id !== setId);

          if (exercise.sets.length === 0) {
            deleteExerciseInLocalDB(exercise.id);
            currentWorkout.exercises = currentWorkout.exercises.filter(
              (ex) => ex.id !== exercise.id
            );
          }
        }
      });
    },
  }))
);
