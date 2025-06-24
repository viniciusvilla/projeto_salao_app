import { getDBConnection } from './database';

export const createTables = async () => {
  try {
    const db = await getDBConnection();

    // ✅ Criação da tabela de usuários (já existente)
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        email TEXT UNIQUE,
        telefone TEXT,
        senha TEXT
      );
    `);
    // Adiciona colunas extras se ainda não existirem
    await db.execAsync(`ALTER TABLE usuarios ADD COLUMN tipo TEXT DEFAULT 'usuario';`).catch(() => {});
    await db.execAsync(`ALTER TABLE usuarios ADD COLUMN imagem TEXT;`).catch(() => {});


    // ✅ Nova tabela de agendamentos
    await db.execAsync(`

      CREATE TABLE IF NOT EXISTS agendamentos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nomeCliente TEXT,
        servico TEXT,
        profissional TEXT,
        data TEXT,
        horario TEXT
      );
    `);

    console.log('✅ Tabelas criadas com sucesso!');

  } catch (error) {
    console.log('❌ Erro ao criar tabelas:', error);
  }
};
