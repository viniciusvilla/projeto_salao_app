//Tela da área Início

import {View, StyleSheet, Text, SafeAreaView, StatusBar, FlatList} from 'react-native'
import { getAllServices } from '../../services/service'
import { ServiceItem } from '../../components/service-item'

export default function Screen(){

    const services = getAllServices()

    return(
        <View style = {styles.container}>
            {/* Renderiza cada item de service-item.tsx */}
            <FlatList
                data = {services}
                renderItem = {({item}) => <ServiceItem data = {item}/>}
                keyExtractor={item => item.id.toString()}
                style = {styles.list}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },

    list:{
        flex: 1,
        width: '100%',
        padding: 20
    }
})