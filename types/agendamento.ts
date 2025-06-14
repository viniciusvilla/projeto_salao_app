// types/agendamento.ts

// Tipo que representa um Agendamento do salão

export type Agendamento = {
  id: number;               // ID único do agendamento (usado no banco como chave primária)
  servico: string;          // Nome do serviço (ex: "Cabelo")
  profissional: string;     // Nome do profissional (ex: "Ana")
  dia: string;              // Dia da semana (ex: "Segunda")
  horario: string;          // Horário escolhido (ex: "10:30")
}