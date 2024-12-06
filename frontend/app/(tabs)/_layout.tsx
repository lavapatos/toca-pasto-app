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
      name="settings"
      options={{
        tabBarButton: () => null,
      }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Mi cuenta',
          //headerShown: false,
          tabBarLabelStyle: {
            fontSize: 9.25,
          },
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
            ),
          }}
      />
      <Tabs.Screen
      name="user"
      options={{
        tabBarButton: () => null,
        tabBarStyle: { display: 'none' },
      }}
      />
      <Tabs.Screen
        name="usersGrid"
        options={{
          title: 'Gente',
          tabBarLabelStyle: {
            fontSize: 9.25,
          },
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'people' : 'people-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
      name="schedule"
      options={{
        tabBarButton: () => null,
      }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarLabelStyle: {
            fontSize: 9.25,
          },
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24}/>
          ),
        }}
      />
      <Tabs.Screen
      name="coincidencias"
      options={{
        tabBarButton: () => null,
      }}
      />
    </Tabs>
  );
}
