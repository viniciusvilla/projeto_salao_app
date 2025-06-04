//Botão que criei para ser o botão padrão do sistema, para evitar repetição de código do mesmo botão nos arquivos

import { Pressable, View, Text, StyleSheet } from "react-native"

type Props = {
    title: string,
    onPress: () => void
}

export const Button = ({title, onPress}: Props) => {
    return (
        <Pressable onPress = {onPress} style = {styles.button}>
            <Text style = {styles.buttonText}>{title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#CFB0AB',
        borderRadius: 10,
        width: 200,
        height: 30,
        marginBottom: 20
    },

    buttonText:{
        fontSize: 16,
        color: 'white',
        textAlign: 'center'
    }
})