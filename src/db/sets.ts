import { ExerciseSet } from '@/types/models';
import { getDB } from '.';
import { getSetsQuery, saveSetQuery } from './commands';
import { DbExerciseSet } from './db';

export const saveSet = async (exerciseSet: ExerciseSet) => {
  try {
    const db = await getDB();
    const res = await db.runAsync(saveSetQuery, [
      exerciseSet.id,
      exerciseSet.exerciseId,
      exerciseSet.reps ?? null,
      exerciseSet.weight ?? null,
      exerciseSet.oneRM ?? null,
    ]);
  } catch (error) {
    console.warn('An error occurs while saving the set', error);
  }
};

const parseExerciseSet = (exerciseSet: DbExerciseSet): ExerciseSet => {
  return {
    id: exerciseSet.id,
    exerciseId: exerciseSet.exercise_id,
    reps: exerciseSet.reps,
    weight: exerciseSet.weight,
    oneRM: exerciseSet.one_rm,
  };
};

export const getSets = async (exerciseId: string): Promise<ExerciseSet[]> => {
  try {
    const db = await getDB();
    const sets = await db.getAllAsync<DbExerciseSet>(getSetsQuery, [
      exerciseId,
    ]);
    return sets.map(parseExerciseSet);
  } catch (error) {
    console.warn('An error occurs while getting the sets', error);
    return [];
  }
};
