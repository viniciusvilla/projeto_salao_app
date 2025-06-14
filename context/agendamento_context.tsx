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

import { createContext, useState, useContext, ReactNode } from "react"
import { Agendamento } from "../types/agendamento"

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
  //Abaixo está fazendo oque comentei anteriormente, está marcando e desmarcando serviços do usúario.
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([])

  const addAgendamento = (ag: Agendamento) => {
    setAgendamentos(prev => [...prev, ag])

    //Você adicionaria a conexão do banco de dados para ADICIONAR aqui.
  }

  //Usa uma função filter para idenficar o agendamento com ID informado.
  const removerAgendamento = (id: number) => {
    setAgendamentos(prev => prev.filter(ag => ag.id !== id))

    //Você adicionaria a conexão do banco de dados para REMOVER aqui.
  }

  //Retorna tudo isso via contexto, o value possui todos os dados e funções, fazendo com que possam ser acessados em qualquer lugar ou componente, ou seja, global.
  return (
    <AgendamentoContext.Provider value={{ agendamentos, addAgendamento, removerAgendamento }}>
      {children}
    </AgendamentoContext.Provider>
  )
}

//Hook para usar esse contexto em qualquer lugar
export const useAgendamento = () => useContext(AgendamentoContext)

//Com esse hook, você pode acessar os dados do contexto em qualquer componente com:

//const { agendamentos, addAgendamento, removerAgendamento } = useAgendamento()
