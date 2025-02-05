import { Workout } from '@/types/models';
import { getDB } from '.';
import {
  deleteWorkoutQuery,
  getCurrentWorkoutQuery,
  getWorkoutsQuery,
  saveWorkoutQuery,
} from './commands';
import { DbWorkout } from './db';

export const saveWorkout = async (workout: Workout) => {
  try {
    const db = await getDB();
    const res = await db.runAsync(saveWorkoutQuery, [
      workout.id,
      workout.createdAt.toISOString(),
      workout.finishedAt?.toISOString() || null,
    ]);
  } catch (error) {
    console.warn('An error occurs while saving the workout', error);
  }
};

const parseWorkout = (workout: DbWorkout): Workout => {
  return {
    id: workout.id,
    createdAt: new Date(workout.created_at),
    finishedAt: workout.finished_at ? new Date(workout.finished_at) : null,
  };
};

export const getCurrentWorkout = async (): Promise<Workout | null> => {
  try {
    const db = await getDB();
    const workout = await db.getFirstAsync<DbWorkout>(getCurrentWorkoutQuery);

    return workout ? parseWorkout(workout) : null;
  } catch (error) {
    console.warn('An error occurs while getting the current workout', error);
    return null;
  }
};

export const getWorkouts = async (): Promise<Workout[]> => {
  try {
    const db = await getDB();
    const workouts = await db.getAllAsync<DbWorkout>(getWorkoutsQuery);
    return workouts.map(parseWorkout);
  } catch (error) {
    console.warn('An error occurs while getting the workouts', error);
    return [];
  }
};

export const deleteWorkoutInLocalDB = async (workoutId: string) => {
  try {
    const db = await getDB();
    await db.runAsync(deleteWorkoutQuery, [workoutId]);
  } catch (error) {
    console.warn('An error occurs while deleting the workout', error);
  }
};
