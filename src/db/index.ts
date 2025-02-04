import * as SQLite from 'expo-sqlite';
import { createWorkoutsTableQuery } from './commands';

let db: SQLite.SQLiteDatabase | null = null;
export const dbName = 'fitness.db';

export const getDB = async () => {
  if (db) {
    return db;
  }

  db = await SQLite.openDatabaseAsync(dbName);

  //  setup the database
  await db.execAsync(createWorkoutsTableQuery);

  return db;
};
