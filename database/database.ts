import * as SQLite from 'expo-sqlite';

// Abre a conexão com o banco
export const getDBConnection = async () => {
  const db = await SQLite.openDatabaseAsync('salao.db');
  if (!db) {
    throw new Error('Erro ao abrir o banco de dados: conexão nula');
  }
  return db;
};

//  SALVAR AGENDAMENTO NO BANCO
export const salvarAgendamento = async (
  nomeCliente: string,
  servico: string,
  profissional: string,
  data: string,
  horario: string
) => {
  const db = await getDBConnection();
  await db.runAsync(
    `INSERT INTO agendamentos (nomeCliente, servico, profissional, data, horario) VALUES (?, ?, ?, ?, ?);`,
    nomeCliente,
    servico,
    profissional,
    data,
    horario
  );
};

//  LISTAR AGENDAMENTOS
export const listarAgendamentos = async (): Promise<any[]> => {
  const db = await getDBConnection();
  const resultado = await db.getAllAsync('SELECT * FROM agendamentos;');
  return resultado;
};

//  REMOVER AGENDAMENTO POR ID
export const removerAgendamentoPorId = async (id: number) => {
  const db = await getDBConnection();
  await db.runAsync('DELETE FROM agendamentos WHERE id = ?;', id);
};

//  BUSCAR DADOS DO PRIMEIRO USUÁRIO COM TIPO CORRETO
export const buscarUsuario = async (): Promise<{ nome: string; telefone: string; imagem?: string } | null> => {
  const db = await getDBConnection();
  const resultado = await db.getFirstAsync<{ nome: string; telefone: string; imagem?: string }>(
    'SELECT nome, telefone, imagem FROM usuarios LIMIT 1;'
  );
  return resultado ?? null;
};

export const atualizarImagemUsuario = async (uri: string) => {
  const db = await getDBConnection();
  await db.runAsync(
    `UPDATE usuarios SET imagem = ? WHERE id = 1;`, // Se você tiver o ID ou email do usuário logado, substitua aqui
    [uri]
  );
};



