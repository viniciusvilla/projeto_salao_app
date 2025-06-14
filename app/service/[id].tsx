//service/[id].tsx
//Tela de quando seleciona um dos serviços

import { router, Stack, useLocalSearchParams } from "expo-router"
import { StyleSheet, SafeAreaView, View, Text, ScrollView, Image, TouchableOpacity } from "react-native"
import { Picker } from "@react-native-picker/picker"
import { useState } from "react"
import { Button } from "../../components/button"
import { getServiceById } from "../../services/service"

import { useAgendamento } from "../../context/agendamento_context";


//Vetores utilizados para registrar profissionais / dias da semana / horários
const profissionais = ["Ana", "Carlos", "Beatriz"]
const diasSemana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"]
const horarios = ["09:00", "10:30", "13:00", "15:00", "17:30"]

export default function Screen() {

  //Pega o id da rota dinâmica e pega o serviço relacionado a este id
  const { id } = useLocalSearchParams()
  const idService = parseInt(id as string)
  const service = getServiceById(idService)
  const { addAgendamento } = useAgendamento();

  //funções que fazem a ação de selecionar as opções e armazenam as escolhas do usúario.
  const [profissionalSelecionado, setProfissionalSelecionado] = useState(profissionais[0])
  const [diaSelecionado, setDiaSelecionado] = useState("")
  const [horarioSelecionado, setHorarioSelecionado] = useState("")

  if (!service) {
    return router.back()
  }

  //Verifica se o usúario escolheu um dia ou horário
  const handleAgendar = () => {
    if (!diaSelecionado || !horarioSelecionado) {
      alert("Selecione o dia e o horário para agendamento.")
      return
    }

    //Agendando o serviço em context/agendamento_context.tsx
    addAgendamento({
    id: Date.now(), // Gera id temporário único
    servico: service.title,
    profissional: profissionalSelecionado,
    dia: diaSelecionado,
    horario: horarioSelecionado,
  });

    alert(`Agendado com ${profissionalSelecionado} na ${diaSelecionado} às ${horarioSelecionado}`)
    
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'Agendamento' }} />
      <ScrollView style={styles.area}>
        <Image
          style={styles.img}
          source={{ uri: service.image }}
          resizeMode='cover'
        />

        <Text style={styles.title}>Escolha o profissional:</Text>
        <Picker
          selectedValue={profissionalSelecionado}
          onValueChange={(itemValue) => setProfissionalSelecionado(itemValue)}
          style={styles.picker}
        >
          {/* Usa uma função map para adicionar cada prof do vetor profissionais no select. (OBS: Picker === select) */}
          {profissionais.map((prof, index) => (
            <Picker.Item label={prof} value={prof} key={index} />
          ))}
        </Picker>

        <Text style={styles.title}>Escolha o dia:</Text>
        <View style={styles.optionsContainer}>
          {/*Função que cria as opções de dia / compara o dia da semana das opções com o do array diasSemana / armazena o diaSelecionado*/}
          {diasSemana.map((dia, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                diaSelecionado === dia && styles.optionSelected
              ]}
              onPress={() => setDiaSelecionado(dia)}
            >
              <Text>{dia}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.title}>Escolha o horário:</Text>
        <View style={styles.optionsContainer}>
          {horarios.map((hora, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                horarioSelecionado === hora && styles.optionSelected
              ]}
              onPress={() => setHorarioSelecionado(hora)}
            >
              <Text>{hora}</Text>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>

      <View style={styles.buttonArea}>
        <Button
          title="Agendar"
          onPress={handleAgendar}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  area: {
    flex: 1,
    padding: 10
  },
  buttonArea: {
    padding: 10,
    marginBottom: 20,
    alignItems: 'center'
  },
  img: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 20
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10
  },
  picker: {
    backgroundColor: '#eee',
    borderRadius: 10
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 10
  },
  option: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 8
  },
  optionSelected: {
    backgroundColor: '#aaa'
  },
  priceArea: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#cccccc'
  },
  price: {
    fontSize: 22,
    textAlign: 'center'
  }
})