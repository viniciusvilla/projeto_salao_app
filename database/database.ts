import * as SQLite from 'expo-sqlite';

export const getDBConnection = () => {
  return SQLite.openDatabaseSync('salao.db');
};