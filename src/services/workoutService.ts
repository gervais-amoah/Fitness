import { getCurrentWorkout, getWorkouts, saveWorkout } from '@/db/workouts';
import {
  cleanExercise,
  getExerciseTotalWeight,
} from '@/services/exerciseService';
import { ExerciseWithSets, WorkoutWithExercises } from '@/types/models';
import * as Crypto from 'expo-crypto';

export const getWorkoutTotalWeight = (workout: WorkoutWithExercises) => {
  return workout.exercises.reduce(
    (total, exercise) => total + getExerciseTotalWeight(exercise),
    0
  );
};

export const newWorkout = () => {
  const newWorkout: WorkoutWithExercises = {
    id: Crypto.randomUUID(),
    createdAt: new Date(),
    finishedAt: null,
    exercises: [],
  };

  //  save the workout to the database
  saveWorkout(newWorkout);

  return newWorkout;
};

export const finishWorkout = (workout: WorkoutWithExercises) => {
  const cleanedWorkout = cleanWorkout(workout);

  const finishedWorkout = { ...cleanedWorkout, finishedAt: new Date() };

  //  save the workout to the database
  saveWorkout(finishedWorkout);
  return finishedWorkout;
};

export const cleanWorkout = (workout: WorkoutWithExercises) => {
  const cleanedExercises = workout.exercises
    .map(cleanExercise)
    .filter((e) => e !== null);

  return {
    ...workout,
    exercises: cleanedExercises,
  };
};

export const getCurrentWorkoutWithExercises =
  async (): Promise<WorkoutWithExercises | null> => {
    const workout = await getCurrentWorkout();

    if (!workout) return null;

    return {
      ...workout,
      exercises: [],
    };
  };

export const getWorkoutsWithExercises = async (): Promise<
  WorkoutWithExercises[]
> => {
  const workouts = await getWorkouts();

  if (workouts.length === 0) return [];

  return workouts.map((workout) => {
    return { ...workout, exercises: [] as ExerciseWithSets[] };
  });
};
