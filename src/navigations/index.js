import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import PlayerScreen from '../screens/MusicPlayer';
import LibraryScreen from '../screens/Library';

const Tab = createBottomTabNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName = 'home';
            if (route.name === 'Home') iconName = 'home';
            if (route.name === 'Library') iconName = 'library';
            if (route.name === 'Player') iconName = 'play-circle';

            const map = {
              home: 'home-outline',
              library: 'musical-notes-outline',
              'play-circle': 'play-circle-outline',
            };
            return <Ionicons name={map[iconName]} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Library" component={LibraryScreen}/>
        <Tab.Screen name="Player" component={PlayerScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
