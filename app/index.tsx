//Tela Login

import {SafeAreaView, StyleSheet, Image, Text, TextInput, View} from 'react-native'
import { Button } from '../components/button'
import {router} from 'expo-router'
import { useState } from 'react'

export default function Screen(){

    //Função que redireciona para a tela Início
    const handleStart = () =>{
        router.replace('/home')
    }

    //Função que redireciona para a tela Cadastro, porém ainda não criei essa tela
    const cadastrarPress = () =>{
        router.replace('/cadastro') 
    }

    //Dentro de email e senha estão os valores do input
    const[email, setEmail] = useState("")
    const [senha, setSenha] = useState("");

    return (
        <SafeAreaView style = {styles.container}>
            <Image
                source = {require('../assets/salao_logo2.png')}
                style = {styles.logo}
                resizeMode = 'cover'
            />
            <Text style = {styles.h1}>Salão RE Santos</Text>
            <Text style = {styles.h2}>Cabelo bonito nos traz felicidade</Text>
            <View style = {styles.areaInput}>
                <Text>Email:</Text>
                <TextInput
                style = {styles.input}
                value = {email}
                onChangeText = {t => setEmail(t)}
            />
            </View>
            <View style = {styles.areaInput}>
                <Text>Senha:</Text>
                <TextInput
                style = {styles.input}
                value = {senha}
                onChangeText = {t => setSenha(t)}
                secureTextEntry = {true}
            />
            </View>
            
            <Button
                title = "Entrar"
                onPress = {handleStart}
            />

            <Button
                title = "Cadastrar"
                onPress = {cadastrarPress}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    logo:{
        width: 200,
        height: 200,
        marginBottom: -30
    },

    h1:{
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        fontFamily: 'Arial'
    },

    h2:{
        fontSize: 16,
        marginBottom: 20,
        fontStyle: 'italic',
        fontFamily: 'Arial'
    },

    areaInput:{
        marginBottom: 30
    },

    input: {
    width: 200,
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10
    
  },

  button:{
    marginBottom: 20
  }
})