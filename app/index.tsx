//index.html

import { SafeAreaView, StyleSheet, Image, Text, TextInput, View, Alert, Pressable } from 'react-native';
import { Button } from '../components/button';
import { router } from 'expo-router';
import { useState } from 'react';
import { getDBConnection } from '../database/database'; // usa sua conexão

export default function Screen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Atenção', 'Preencha todos os campos');
      return;
    }

    try {
      const db = await getDBConnection();

      const results = await db.getAllAsync(
        `SELECT * FROM usuarios WHERE email = ? AND senha = ? AND tipo = ?`,
        [email, senha, 'usuario'] // somente usuário comum
      );

      if (results.length > 0) {
        const usuario = results[0];

        // Redireciona para a tela de perfil
        router.replace('/home');
      } else {
        Alert.alert('Erro', 'Usuário ou senha inválidos');
      }
    } catch (error) {
      console.error('Erro ao consultar usuário:', error);
      Alert.alert('Erro', 'Não foi possível fazer login');
    }
  };

  const cadastrarPress = () => {
    router.push('/cadastro');
  };

  const redefinirPress = () => {
    router.push('/redefinir/email'); // Manda para a tela redefinir/email.tsx
  };


  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/salao_logo2.png')}
        style={styles.logo}
        resizeMode="cover"
      />
      <Text style={styles.h1}>Salão RE Santos</Text>
      <Text style={styles.h2}>Cabelo bonito nos traz felicidade</Text>

      <View style={styles.areaInput}>
        <Text>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.areaInput}>
        <Text>Senha:</Text>
        <TextInput
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />
      </View>

      <Button title="Entrar" onPress={handleLogin} />
      <Button title="Cadastrar" onPress={cadastrarPress} />
      {/*<Button title="Esqueci a senha" onPress={redefinirPress} />*/}

      <Pressable onPress = {redefinirPress}>
        <Text style = {styles.textForget}>Esqueci a Senha 😭</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: -30,
  },
  h1: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Arial',
  },
  h2: {
    fontSize: 16,
    marginBottom: 20,
    fontStyle: 'italic',
    fontFamily: 'Arial',
  },
  areaInput: {
    marginBottom: 30,
  },
  input: {
    width: 200,
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    paddingHorizontal: 10,
  },

  textForget:{
    color: 'blue',
    textDecorationLine: 'underline',
    fontSize: 16
  }
});
