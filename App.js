import React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import OtpScreen from './screens/OtpScreen';
import OtpVerifiedScreen from './screens/OtpVerifiedScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{
        headerShown:false,
      }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen}/>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Otp" component={OtpScreen}/>
        <Stack.Screen name="OtpVerified" component={OtpVerifiedScreen}/>
        <Stack.Screen name="Home" component={HomeScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})
