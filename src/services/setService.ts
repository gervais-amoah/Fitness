import { deleteSetInLocalDB, saveSetIntoLocalDB } from '@/db/sets';
import { ExerciseSet } from '@/types/models';
import * as Crypto from 'expo-crypto';

export const getBestSet = (sets: ExerciseSet[]) => {
  return sets.reduce((bestSet: ExerciseSet | null, set) => {
    return (set?.oneRM || 0) > (bestSet?.oneRM || 0) ? set : bestSet;
  }, null);
};

export const getSetTotalWeight = (set: ExerciseSet) => {
  return (set.weight || 0) * (set.reps || 0);
};

export const getSetOneRM = (weight: number, reps: number) => {
  return weight * (36 / (37 - reps));
};

export const createSet = (exerciseId: string) => {
  const newSet: ExerciseSet = {
    id: Crypto.randomUUID(),
    exerciseId,
  };

  saveSetIntoLocalDB(newSet);

  return newSet;
};

export const updateSet = (
  set: ExerciseSet,
  updatedFields: Pick<ExerciseSet, 'weight' | 'reps'>
) => {
  const updatedSet = { ...set };

  if (updatedFields.weight !== undefined) {
    updatedSet.weight = updatedFields.weight;
  }
  if (updatedFields.reps !== undefined) {
    updatedSet.reps = updatedFields.reps;
  }

  if (updatedSet.reps !== undefined && updatedSet.weight !== undefined) {
    updatedSet.oneRM = getSetOneRM(updatedSet.weight, updatedSet.reps);
  }

  saveSetIntoLocalDB(updatedSet);

  return updatedSet;
};

const isSetComplete = (set: ExerciseSet) => {
  return set.reps && set.reps > 0;
};

export const cleanSets = (sets: ExerciseSet[]) => {
  sets
    .filter((set) => !isSetComplete(set))
    .forEach((set) => deleteSetInLocalDB(set.id));

  return sets.filter(isSetComplete);
};
