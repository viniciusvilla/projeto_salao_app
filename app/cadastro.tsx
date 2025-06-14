// app/cadastro.tsx

// Tela Cadastro

import { SafeAreaView, StyleSheet, Image, Text, TextInput, View } from 'react-native'
import { Button } from '../components/button'
import { router } from 'expo-router'
import { useState } from 'react'

export default function Screen() {
  // Estados dos inputs

  //Nome, Email, Senha ficam armazenadas nas variáveis abaixo
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")

  // Aqui é a validação dos campos, vê se todos campos foram preenchido e verifica se as senhas coincidem
  const handleCadastro = () => {
    if (!nome || !email || !senha || !confirmarSenha) {
      alert("Preencha todos os campos.")
      return
    }

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem.")
      return
    }

    // Caso tudo der certo, exibira essa mensagem
    alert(`Usuário ${nome} cadastrado com sucesso!`)
    router.replace('/') // Redireciona de volta para o login

    //Os campos só serão enviados para o BD caso todos os campos sejam preenchidos, então acredito eu que você deva conectar a partir desse ponto BD nesse ponto.

  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/salao_logo2.png')}
        style={styles.logo}
        resizeMode='cover'
      />
      <Text style={styles.h1}>Cadastro</Text>
      <Text style={styles.h2}>Crie sua conta abaixo</Text>

      <View style={styles.areaInput}>
        <Text>Nome:</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={t => setNome(t)}
        />
      </View>

      <View style={styles.areaInput}>
        <Text>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={t => setEmail(t)}
        />
      </View>

      <View style={styles.areaInput}>
        <Text>Senha:</Text>
        <TextInput
          style={styles.input}
          value={senha}
          onChangeText={t => setSenha(t)}
          secureTextEntry={true}
        />
      </View>

      <View style={styles.areaInput}>
        <Text>Confirmar Senha:</Text>
        <TextInput
          style={styles.input}
          value={confirmarSenha}
          onChangeText={t => setConfirmarSenha(t)}
          secureTextEntry={true}
        />
      </View>

      <Button
        title="Cadastrar"
        onPress={handleCadastro}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  logo: {
    width: 200,
    height: 200,
    marginBottom: -30
  },

  h1: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Arial'
  },

  h2: {
    fontSize: 16,
    marginBottom: 20,
    fontStyle: 'italic',
    fontFamily: 'Arial'
  },

  areaInput: {
    marginBottom: 20
  },

  input: {
    width: 200,
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    paddingLeft: 10
  }
})
