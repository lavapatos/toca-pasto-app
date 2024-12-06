import { Tabs } from 'expo-router';

import Ionicons from '@expo/vector-icons/Ionicons';


export default function TabLayout() {
  return (
    <Tabs
  screenOptions={{
    tabBarActiveTintColor: '#ffd33d',
    headerStyle: {
      backgroundColor: '#25292e',
    },
    headerShadowVisible: false,
    headerTintColor: '#fff',
    headerShown: false, //descomentar para que no se vea niuna wea arriba
    tabBarStyle: {
    backgroundColor: '#25292e',
    },
  }}
>

      <Tabs.Screen
        name="index"
        options={{
          title: 'Mi cuenta',
          //headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="usersGrid"
        options={{
          title: 'Enanos hot',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'people' : 'people-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'Acerca de',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24}/>
          ),
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: 'user',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'people-circle' : 'people-circle-outline'} color={color} size={24}/>
          ),
          //tabBarButton: () => null, //quiero borrar la wea pero no cacho, calmao
        }}
      />
    </Tabs>
    
  );
}
