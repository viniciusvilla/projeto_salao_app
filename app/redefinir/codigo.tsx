import { SafeAreaView, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import { Button } from '../../components/button';
import { useState } from 'react';
import { router } from 'expo-router';

import { useLocalSearchParams } from 'expo-router';

export default function Screen() {
  const [codigo, setCodigo] = useState('');
  const { email } = useLocalSearchParams(); //Pega o email fornecido na tela email.tsx

  const validarCodigo = () => {
    if (!codigo) {
      Alert.alert("Atenção", "Digite o código recebido por e-mail.");
      return;
    }

    // Aqui você faria a verificação do código para vê se bate com a que foi enviado para o email.
    // Por enquanto, segue direto para senha.tsx
    router.push({
      pathname: '/redefinir/senha',
      params: { codigo, email }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.h1}>Digite o código enviado para o e-mail.</Text>

      <View style={styles.areaInput}>
        <TextInput
          style={styles.input}
          placeholder="Código"
          keyboardType="numeric"
          value={codigo}
          onChangeText={setCodigo}
        />
      </View>

      <Button title="Confirmar" onPress={validarCodigo} />
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
    width: 100,
    textAlign: 'center',
  }
});
