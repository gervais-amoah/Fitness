import * as SQLite from 'expo-sqlite';
import {
  createExercisesTableQuery,
  createWorkoutsTableQuery,
} from './commands';

let db: SQLite.SQLiteDatabase | null = null;
export const dbName = 'fitness.db';

export const getDB = async () => {
  if (db) {
    return db;
  }

  db = await SQLite.openDatabaseAsync(dbName, { useNewConnection: true });

  //  setup the database
  await db.execAsync(createWorkoutsTableQuery);
  await db.execAsync(createExercisesTableQuery);

  return db;
};
