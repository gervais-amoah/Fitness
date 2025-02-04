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
`;
