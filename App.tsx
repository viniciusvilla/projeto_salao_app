import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';
import { createTables } from './database/schema';


export default function App() {
  // Chama a criação das tabelas quando o app inicia
  useEffect(() => {
  const init = async () => {
    try {
      await createTables();
    } catch (err) {
      console.log('❌ Erro ao iniciar banco de dados:', err);
    }
  };

  init();
}, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
