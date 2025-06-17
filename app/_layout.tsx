// app/_layout.tsx

// Área dedicada às rotas principais do sistema:
// index         === Tela de login
// (tabs)        === Pasta que representa as rotas com abas inferiores (Bottom Tabs)
//               === Ela carrega automaticamente o arquivo (tabs)/_layout.tsx
//               === Dentro dela ficam as telas como "home" e "agendamentos"
// service/[id]  === Rota dinâmica para exibir os detalhes de um serviço (ex: /service/2)
import { useEffect } from 'react';
import {Stack} from 'expo-router';
import { createTables } from '../database/schema';
import { AgendamentoProvider } from '../context/agendamento_context';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';


export default function RootLayout(){
    
    useEffect(() => {
        createTables();
    }, []);

    return (
        <SafeAreaProvider>
        <AgendamentoProvider>
        <StatusBar style="auto" />    
        <Stack screenOptions = {{headerShown: false}}>
            <Stack.Screen name = "index"/>
            <Stack.Screen name = "(tabs)"/>
            <Stack.Screen name = "service/[id]" options = {{headerShown: true}}/> 
        </Stack>
        </AgendamentoProvider>
        </SafeAreaProvider>
    );
}

