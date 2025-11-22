import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import LoginScreen from './screens/Login/LoginScreen';
import RegisterScreen from './screens/Login/RegisterScreen';
import TabNavigator from './navigation/TabNavigator';
import HomeScreen from './screens/Main/HomeScreen';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name ="Login" component={LoginScreen}/>
        <Stack.Screen name ="Register" component={RegisterScreen}/>
        <Stack.Screen name ="Main" component={TabNavigator}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8a8383ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
