import { deleteExerciseInLocalDB, saveExercise } from '@/db/exercises';
import { getSetsFromLocalDB } from '@/db/sets';
import { cleanSets, createSet, getSetTotalWeight } from '@/services/setService';
import { Exercise, ExerciseWithSets } from '@/types/models';
import * as Crypto from 'expo-crypto';

export const getExerciseTotalWeight = (exercise: ExerciseWithSets) => {
  return exercise.sets.reduce(
    (totalSetWeight, set) => totalSetWeight + getSetTotalWeight(set),
    0
  );
};

export const createExercise = (
  name: string,
  workoutId: string
): ExerciseWithSets => {
  const newExercise: ExerciseWithSets = {
    id: Crypto.randomUUID(),
    name,
    workoutId,
    sets: [],
  };

  //  save exercise to the database
  saveExercise(newExercise);

  //  add a default set
  const epmtySet = createSet(newExercise.id);
  newExercise.sets.push(epmtySet);

  return newExercise;
};

export const cleanExercise = (exercise: ExerciseWithSets) => {
  const cleanedExercise = cleanSets(exercise.sets);

  if (cleanedExercise.length === 0) {
    deleteExerciseInLocalDB(exercise.id);
    return null;
  }

  return {
    ...exercise,
    sets: cleanedExercise,
  };
};

export const addSetsToExercise = async (
  exercise: Exercise
): Promise<ExerciseWithSets> => {
  const sets = await getSetsFromLocalDB(exercise.id);
  return {
    ...exercise,
    sets,
  };
};

export const deleteExercise = (exerciseId: string) => {
  deleteExerciseInLocalDB(exerciseId);
};
