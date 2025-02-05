import { Exercise } from '@/types/models';
import { getDB } from '.';
import {
  deleteExerciseQuery,
  getExercisesQuery,
  saveExerciseQuery,
} from './commands';
import { DbExercise } from './db';

export const saveExercise = async (exercise: Exercise) => {
  try {
    const db = await getDB();
    const res = await db.runAsync(saveExerciseQuery, [
      exercise.id,
      exercise.workoutId,
      exercise.name,
    ]);
  } catch (error) {
    console.warn('An error occurs while saving the exercise', error);
  }
};

const parseExercise = (exercise: DbExercise): Exercise => {
  return {
    id: exercise.id,
    workoutId: exercise.workout_id,
    name: exercise.name,
  };
};

export const getExercises = async (workout_id: string): Promise<Exercise[]> => {
  try {
    const db = await getDB();
    const exercises = await db.getAllAsync<DbExercise>(
      getExercisesQuery,
      workout_id
    );

    if (!exercises) return [];
    return exercises.map(parseExercise);
  } catch (error) {
    console.warn('An error occurs while getting the exercises', error);
    return [];
  }
};

export const deleteExerciseInLocalDB = async (exerciseId: string) => {
  try {
    const db = await getDB();
    await db.runAsync(deleteExerciseQuery, [exerciseId]);
  } catch (error) {
    console.warn('An error occurs while deleting the exercise', error);
  }
};
