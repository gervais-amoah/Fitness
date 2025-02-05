import { getExercises } from '@/db/exercises';
import { getCurrentWorkout, getWorkouts, saveWorkout } from '@/db/workouts';
import {
  addSetsToExercise,
  cleanExercise,
  getExerciseTotalWeight,
} from '@/services/exerciseService';
import { Workout, WorkoutWithExercises } from '@/types/models';
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

const addExercisesToWorkout = async (
  workout: Workout
): Promise<WorkoutWithExercises> => {
  const exercises = await getExercises(workout.id);
  return {
    ...workout,
    exercises: await Promise.all(exercises.map(addSetsToExercise)),
  };
};

export const getCurrentWorkoutWithExercises =
  async (): Promise<WorkoutWithExercises | null> => {
    const workout = await getCurrentWorkout();

    if (!workout) return null;

    return await addExercisesToWorkout(workout);
  };

export const getWorkoutsWithExercises = async (): Promise<
  WorkoutWithExercises[]
> => {
  const workouts = await getWorkouts();

  if (!workouts || workouts.length === 0) return [];

  return await Promise.all(workouts.map(addExercisesToWorkout));
};
