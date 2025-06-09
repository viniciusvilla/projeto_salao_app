import { getDBConnection } from './database';

export const createTables = async () => {
  const db = await getDBConnection();
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        email TEXT UNIQUE,
        telefone TEXT,
        senha TEXT
      );`,
      [],
      () => {
        console.log('Tabela "usuarios" criada com sucesso');
      },
      (_, error) => {
        console.log('Erro ao criar tabela "usuarios":', error);
        return false;
      }
    );
  });
};
