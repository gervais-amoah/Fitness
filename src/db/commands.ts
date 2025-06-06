// WORKOUT COMMANDS
export const createWorkoutsTableQuery = `
CREATE TABLE IF NOT EXISTS workouts (
  id TEXT PRIMARY KEY, 
  created_at TEXT, 
  finished_at TEXT
);`;

export const saveWorkoutQuery = `
INSERT OR REPLACE INTO workouts (id, created_at, finished_at) VALUES (?, ?, ?)
`;

export const getCurrentWorkoutQuery = `
SELECT * FROM workouts
WHERE finished_at IS NULL
ORDER BY created_at DESC
LIMIT 1
`;

export const getWorkoutsQuery = `
SELECT * FROM workouts
WHERE finished_at IS NOT NULL
ORDER BY created_at DESC
LIMIT 20
`;

export const deleteWorkoutQuery = `
DELETE FROM workouts
WHERE id = ?
`;

// EXERCISE COMMANDS
export const createExercisesTableQuery = `
  CREATE TABLE IF NOT EXISTS exercises (
    id TEXT PRIMARY KEY, 
    workout_id TEXT, 
    name TEXT, 
    FOREIGN KEY (workout_id) REFERENCES workouts (id)
  );
`;

export const saveExerciseQuery = `
INSERT OR REPLACE INTO exercises (id, workout_id, name) VALUES (?, ?, ?)
`;

export const getExercisesQuery = `
SELECT * FROM exercises
WHERE workout_id = ?
ORDER BY name ASC
`;

export const deleteExerciseQuery = `
DELETE FROM exercises
WHERE id = ?
`;

// SET COMMANDS
export const createSetsTableQuery = `
CREATE TABLE IF NOT EXISTS sets (
  id TEXT PRIMARY KEY, 
  exercise_id TEXT, 
  reps INTEGER, 
  weight REAL, 
  one_rm REAL,
  FOREIGN KEY (exercise_id) REFERENCES exercises (id)
);`;

export const saveSetQuery = `
INSERT OR REPLACE INTO sets (id, exercise_id, reps, weight, one_rm) VALUES (?, ?, ?, ?, ?)
`;

export const getSetsQuery = `
SELECT * FROM sets
WHERE exercise_id = ?
ORDER BY reps ASC 
`;

export const deleteSetQuery = `
DELETE FROM sets
WHERE id = ?
`;
