import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import your screens
import HomeScreen from '../screens/Main/HomeScreen';
import MessagesScreen from '../screens/Main/MessagesScreen';
import PersonalMessageScreen from '../screens/Main/PersonalMessageScreen';
import ProfileScreen from '../screens/Main/ProfileScreen';
import WorkersScreen from '../screens/Main/WorkersScreen';
import NearbyScreen from '../screens/Main/NearbyScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Messages Stack Navigation
const MessagesStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="messagesList" component={MessagesScreen} />
      <Stack.Screen name="messages" component={PersonalMessageScreen} />
    </Stack.Navigator>
  );
};

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#496B01',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
          paddingBottom: 5,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>🏠</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Workers"
        component={WorkersScreen}
        options={{
          tabBarLabel: 'Workers',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>👷</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Nearby"
        component={NearbyScreen}
        options={{
          tabBarLabel: 'Nearby',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>📍</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesStack}
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>💬</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>👤</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}