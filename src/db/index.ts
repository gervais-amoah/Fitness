import * as SQLite from 'expo-sqlite';
import {
  createExercisesTableQuery,
  createWorkoutsTableQuery,
} from './commands';

export const dbName = 'fitness.db';

let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;

export const getDB = async (): Promise<SQLite.SQLiteDatabase> => {
  if (!dbPromise) {
    dbPromise = (async () => {
      try {
        const db = await SQLite.openDatabaseAsync(dbName, {
          useNewConnection: true,
        });

        await db.withTransactionAsync(async () => {
          await db.execAsync(createWorkoutsTableQuery);
          await db.execAsync(createExercisesTableQuery);
        });

        return db;
      } catch (error) {
        console.error('Database initialization error:', error);
        throw error; // Re-throw to handle it at a higher level if needed
      }
    })();
  }

  return dbPromise;
};
