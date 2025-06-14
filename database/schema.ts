import { getDBConnection } from './database';

export const createTables = async () => {
  try {
    const db = getDBConnection();

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        email TEXT UNIQUE,
        telefone TEXT,
        senha TEXT
      );
    `);

    console.log('✅ Tabela "usuarios" criada com sucesso!');
  } catch (error) {
    console.log('❌ Erro ao criar tabela "usuarios":', error);
  }
};
