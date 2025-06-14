// app/(tabs)/_layout.tsx

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

            {/* Cria a opção "Agenda" clicavel que fica na parte inferior */}
            {/*No caso, esse código abaixo seria a Tab "Agenda", e nessa tab que eu gostaria que os serviços agendados */}
            <Tabs.Screen
                /*Agora resolveu? */
                name = "agenda"
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