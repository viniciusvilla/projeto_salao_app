// context/agendamento_context.tsx

//Código responsável por fornecer o contexto global com as funções de adicionar e remover agendamentos no sistema

/*
Aqui vai uma pequena explicação do que é Context:

**Context**

Context == É uma fonte global de dados. Qualquer componente (arquivo) do sistema pode acessar e puxar oque precisar daqui

Por exemplo: 

É daqui que a tela service/[id].tsx chama addAgendamento() para salvar agendamentos.

É daqui que app/(tabs)/agenda.tsx pega os dados salvos no contexto com useAgendamento() e mostra os agendamentos.

E para acessar esses dados, nos usamos um Hook (Gancho) que acessa valores globais == useContext

*/

import { createContext, useState, useContext, ReactNode, useEffect } from "react"
import { Agendamento } from "../types/agendamento"
import { listarAgendamentos, salvarAgendamento, removerAgendamentoPorId } from '../database/database';


//Quando a pessoa marca um serviço, ele é salvo no vetor do type abaixo, no type se encontra as funçòes que irão adicionar e remover os serviços do vetor Agendamento[]
type AgendamentoContextData = {
  agendamentos: Agendamento[];
  addAgendamento: (ag: Agendamento) => void;
  removerAgendamento: (id: number) => void;
}

//Aqui cria o contexto, inicializa com um objeto vazio ({}), forçado para o tipo AgendamentoContextData.
const AgendamentoContext = createContext<AgendamentoContextData>({} as AgendamentoContextData)

//Aqui é criado um componente que vai encapsular as Stacks e fornecer o contexto para os componentes filhos. (O Encapsulamento pode ser vizualizado em: app/_layout)
export const AgendamentoProvider = ({ children }: { children: ReactNode }) => {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([])

  //Carregar Agendamentos do banco na inicialização
  useEffect(() => {
    const carregarAgendamentos = async () => {
      try {
        const agendamentosDoBanco = await listarAgendamentos();
        setAgendamentos(agendamentosDoBanco);
      } catch (error) {
        console.log('❌ Erro ao carregar agendamentos do banco:', error);
      }
    };

    carregarAgendamentos();
  }, []);
// Adicionar Agendamento
  const addAgendamento = async (ag: Agendamento) => {
    try {
      // Primeiro salva no banco
      await salvarAgendamento(
        ag.nomeCliente,
        ag.servico,
        ag.profissional,
        ag.data,
        ag.horario
      );
      // Depois atualiza o contexto
      const agendamentosAtualizados = await listarAgendamentos();
      setAgendamentos(agendamentosAtualizados);
    } catch (error) {
      console.log('❌ Erro ao adicionar agendamento:', error);
    }
  };


  //Usa uma função filter para idenficar o agendamento com ID informado.
  const removerAgendamento = async (id: number) => {
    try {
      await removerAgendamentoPorId(id);

      // Atualiza o contexto
      const agendamentosAtualizados = await listarAgendamentos();
      setAgendamentos(agendamentosAtualizados);
    } catch (error) {
      console.log('❌ Erro ao remover agendamento:', error);
    }
  };

  return (
    <AgendamentoContext.Provider value={{ agendamentos, addAgendamento, removerAgendamento }}>
      {children}
    </AgendamentoContext.Provider>
  );
};

//Hook para usar esse contexto em qualquer lugar
export const useAgendamento = () => useContext(AgendamentoContext)

//Com esse hook, você pode acessar os dados do contexto em qualquer componente com:

//const { agendamentos, addAgendamento, removerAgendamento } = useAgendamento()
