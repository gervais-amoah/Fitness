import { Workout } from '@/types/models';
import { getDB } from '.';
import { saveWorkoutQuery } from './commands';

export const saveWorkout = async (workout: Workout) => {
  try {
    const db = await getDB();
    const res = await db.runAsync(saveWorkoutQuery, [
      workout.id,
      workout.createdAt.toISOString(),
      workout.finishedAt?.toISOString() || null,
    ]);
    console.log(res);
  } catch (error) {
    console.warn('An error occurs', error);
  }
};
