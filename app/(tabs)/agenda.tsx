// app/(tabs)/agenda.tsx

import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useAgendamento } from '../../context/agendamento_context';
import { Button } from '../../components/button';

export default function AgendaScreen() {
  const { agendamentos, removerAgendamento } = useAgendamento();

  // Função para confirmar o cancelamento
  const confirmarCancelamento = (id: number) => {
    Alert.alert(
      "Cancelar Agendamento",
      "Tem certeza que deseja cancelar?",
      [
        {
          text: "Não",
          style: "cancel"
        },
        {
          text: "Sim",
          style: "destructive",
          onPress: () => removerAgendamento(id)
        }
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {agendamentos.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum serviço agendado.</Text>
      ) : (
        agendamentos.map(ag => (
          <View key={ag.id} style={styles.card}>
            <Text style={styles.servico}>{ag.servico}</Text>
            <Text>Profissional: {ag.profissional}</Text>
            <Text>Dia da Semana: {ag.data}</Text>
            <Text>Horário: {ag.horario}</Text>

            <View style={styles.buttonArea}>
              <Button
                title="Cancelar"
                onPress={() => confirmarCancelamento(ag.id)}
              />
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#555',
    marginTop: 50,
  },
  card: {
    width: 300,
    backgroundColor: '#eee',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  servico: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonArea: {
    marginTop: 15,
    alignItems: 'center',
  },
});
