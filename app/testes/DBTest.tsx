// app/testes/DBTest.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getDBConnection } from '../../database/database';

export default function DBTest() {
  const [mensagem, setMensagem] = useState('Testando conexão...');

  useEffect(() => {
    const testarConexao = async () => {
      try {
        const db = await getDBConnection();
        if (db) {
          setMensagem('✅ Conexão com o banco de dados OK!');
        } else {
          setMensagem('❌ Falha ao conectar com o banco (db retornou null).');
        }
      } catch (error) {
        console.error('Erro ao conectar com o banco:', error);
        setMensagem(`❌ Erro ao conectar: ${error.message}`);
      }
    };

    testarConexao();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>{mensagem}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
    fontSize: 18,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
});
