// senha.tsx

//Resumo do que essa tela faz:
// Tela final do fluxo de redefinição de senha:
// - Recebe o e-mail como parâmetro via router.
// - Permite o usuário digitar e confirmar uma nova senha.
// - Caso os campos estejam válidos, atualiza a senha no banco.
// - Após sucesso, redireciona para a tela de login.

import { SafeAreaView, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import { Button } from '../../components/button';
import { useState } from 'react';
import { getDBConnection } from '../../database/database';
import { router } from 'expo-router';
import * as Crypto from 'expo-crypto';


import { useLocalSearchParams } from 'expo-router';

export default function Screen() {
  const { email } = useLocalSearchParams(); // recebe o email da tela email.tsx para codigo.tsx que agora está aqui.
  const emailString = Array.isArray(email) ? email[0] : email; //Definindo como string
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const novaSenha = async () => {
    if (!senha || !confirmarSenha) {
      Alert.alert("Atenção", "Preencha todos os campos");
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    //Aqui faria a mudança da senha no banco de dados, deixei +/- como seria.
    try {
      const db = await getDBConnection();
      const senhaCriptografada = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA256,
            senha
      );
      console.log('Senha redefinida criptografada:', senhaCriptografada);
      await db.runAsync(
        `UPDATE usuarios SET senha = ? WHERE email = ?`,
        [senhaCriptografada, emailString]
      );

      Alert.alert('Sucesso', 'Senha redefinida com sucesso!');
      router.replace('/'); // Voltar para tela de login (raiz "/")
    } catch (error) {
      console.error('Erro ao redefinir senha:', error);
      Alert.alert('Erro', 'Não foi possível redefinir a senha');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.h1}>Digite sua nova senha.</Text>

      <View style={styles.areaInput}>
        <TextInput
          style={styles.input}
          placeholder="Nova Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="Confirmar Nova Senha"
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          secureTextEntry
        />
      </View>

      <Button title="Confirmar" onPress={novaSenha} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  h1: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Arial',
    width: 250,
    textAlign: 'center',
  },
  areaInput: {
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    textAlign: 'center',
    width: 250,
  },
});
