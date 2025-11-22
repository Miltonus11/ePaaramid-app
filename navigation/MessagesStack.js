// import React, { useState } from 'react'
// import { Text, View, StyleSheet, Image, FlatList, TouchableOpacity, Dimensions, Platform } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import MessagesScreen from '../screens/Main/MessagesScreen';
import PersonalMessageScreen from '../screens/Main/PersonalMessageScreen';
const Stack = createNativeStackNavigator();


export default function MessagesStack (){
    return(
        <Stack.Navigator>
            <Stack.Screen name="main" component={MessagesScreen} options={{ headerShown: false }} />
            <Stack.Screen name="messages" component={PersonalMessageScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}