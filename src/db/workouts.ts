import { Workout } from '@/types/models';
import { getDB } from '.';
import { getCurrentWorkoutQuery, saveWorkoutQuery } from './commands';

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

export const getCurrentWorkout = async () => {
  try {
    const db = await getDB();
    const res = await db.getFirstAsync(getCurrentWorkoutQuery);

    console.log('getCurrentWorkout RES:', res);
    return null;
  } catch (error) {
    console.warn('An error occurs while getting the current workout', error);

    return null;
  }
};
