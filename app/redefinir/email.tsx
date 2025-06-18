//email.tsx

import { SafeAreaView, StyleSheet, Image, Text, TextInput, View, Alert } from 'react-native';
import { Button } from '../../components/button';
//import { router } from 'expo-router';
import { useState } from 'react';
//import { getDBConnection } from '../database/database'; // usa sua conexão

import { router } from 'expo-router';
import { getDBConnection } from '../../database/database';

export default function Screen() {

    const [email, setEmail] = useState('');

    const enviarEmail = async () => {
        if (!email) {
            Alert.alert("Atenção", "Preencha o campo de e-mail.");
            return;
        }

        try {
            const db = await getDBConnection();

            const result = await db.getFirstAsync(`SELECT * FROM usuarios WHERE email = ?`, [email]);

            if (result) {
                // Aqui você pode gerar o código e salvar no banco, ou apenas redirecionar

                // Backend deve gerar um código aleatório aqui, salvar esse código no banco (ex: tabela codigos_recuperacao)
                
                // e enviar para o e-mail informado usando um serviço de envio (ex: Nodemailer ou outro).
                router.push({
                    pathname: '/redefinir/codigo',
                    params: { email } // Passando o e-mail para a próxima tela
                });
            } else {
                Alert.alert("Erro", "E-mail não encontrado.");
            }
        } catch (error) {
            console.error("Erro ao verificar e-mail:", error);
            Alert.alert("Erro", "Ocorreu um erro ao verificar o e-mail.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.h1}>Digite o Email Cadastrado</Text>

            <View style={styles.areaInput}>
                <Text>Email:</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                />
            </View>

            <Button title="Confirmar" onPress={enviarEmail} />
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
});
