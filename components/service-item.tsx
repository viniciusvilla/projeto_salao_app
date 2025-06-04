// Componente que renderiza um item de serviço clicável na tela Início
// Cada item exibe imagem, título, descrição e preço
// Ao clicar, redireciona para a tela de detalhes do serviço via rota dinâmica

import { Link } from "expo-router"
import { Service } from "../types/service"
import { Pressable, Text, StyleSheet, Image, View } from "react-native"
type Props = {
    data: Service
}

export const ServiceItem = ({data}: Props) =>{
    return (
        <Link href = {`/service/${data.id}`} asChild>
            <Pressable style = {styles.container}>
                <Image
                    style = {styles.img}
                    source = {{uri: data.image}}
                    resizeMode = "cover"
                />

                 <View style = {styles.info}>
                <Text style = {styles.title}>{data.title}</Text>
                <Text style = {styles.description}>{data.description}</Text>
                <Text style = {styles.price}>R${data.price.toFixed(2)}</Text>
            </View>
            </Pressable>
        </Link>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        marginBottom: 20
    },

    img:{
        width: 100,
        height: 100,
        borderRadius: 10,
        backgroundColor: '#CCCCCC',
        marginRight: 20
    },

    info:{
        flex: 1
    },

    title:{
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10
    },

    description:{
        fontSize: 13,
        color: '#555555',
        marginBottom: 10
    },

    price:{
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'right'
    }
})