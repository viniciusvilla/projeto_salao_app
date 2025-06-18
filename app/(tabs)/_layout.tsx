// app/(tabs)/_layout.tsx

import { Tabs } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Text, Pressable, Alert } from 'react-native';
import { router } from 'expo-router';
import { StyleSheet } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage'; // Descomente quando for usar

export default function TabLayout() {
  const handleLogout = async () => {
    Alert.alert(
      'Sair',
      'Deseja realmente sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            // Aqui você vai limpar a sessão de quem está logado.

            /*
            // Exemplo:
            await AsyncStorage.removeItem('@usuario_logado'); 
            ou
            await AsyncStorage.clear(); // se quiser apagar tudo
            */

            //Ai ao final vai rodar o código abaixo que irá voltar para a tela de login.

            router.replace('/'); // Redireciona para tela de login
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#0000FF' }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Início',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
          headerRight: () => (
            <Pressable
              onPress={handleLogout}
              style={styles.sairButton}
            >
              <Text style={styles.buttonText}>Sair</Text>
            </Pressable>
          ),
        }}
      />

      <Tabs.Screen
        name="agenda"
        options={{
          title: 'Agenda',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="archive" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  sairButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CFB0AB',
    borderRadius: 10,
    width: 50,
    height: 30,
    marginRight: 20
  },

  buttonText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center'
  }
});
