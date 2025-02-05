import { ExerciseSet } from '@/types/models';
import { getDB } from '.';
import { saveSetQuery } from './commands';

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
