//_layout.tsx

import { Tabs } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome'

export default function TabLayout(){
    return(
        <Tabs screenOptions={{tabBarActiveTintColor: '#0000FF'}}>
            {/* Cria a opção "Início" clicavel que fica na parte inferior */}
            <Tabs.Screen
                name = "home"
                options = {{
                    title: 'Início',
                    tabBarIcon: ({color}) => <FontAwesome
                        size = {28}
                        name = 'home'
                        color = {color}
                    />

                }}
            />

            {/* Cria a opção "Início" clicavel que fica na parte inferior */}
            <Tabs.Screen
                name = "agendamentos"
                options = {{
                    title: 'Agenda',
                    tabBarIcon: ({color}) => <FontAwesome
                        size = {28}
                        name = 'archive'
                        color = {color}
                    />

                }}
            />

        </Tabs>
    )
}