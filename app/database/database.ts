import * as SQLite from 'expo-sqlite';

export const getDBConnection = () => {
  return SQLite.openDatabase('salao.db');
};
