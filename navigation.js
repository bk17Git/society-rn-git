import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './Screens/HomeScreen'
import NewPostScreen from './Screens/NewPostScreen'
import LoginScreen from './Screens/LoginScreen'
import SignupScreen from './Screens/SignupScreen'

const Stack = createStackNavigator()

const screenOptions = {
    headerShown : false
}

export const SignedInStack = () => (
       <NavigationContainer>
            <Stack.Navigator 
            initialRouteName='Society - Your Virtual Society' 
            screenOptions={screenOptions}
            >
                <Stack.Screen  name = 'Society - Your Virtual Society' component = {HomeScreen} />
                <Stack.Screen name = 'AddNewPost' component = {NewPostScreen} />
            </Stack.Navigator>
        </NavigationContainer>
)

export const SignOutStack = () => (
    <NavigationContainer>
            <Stack.Navigator 
            initialRouteName='Login' 
            screenOptions={screenOptions}
            >
                <Stack.Screen name = 'Login' component = {LoginScreen} />
                <Stack.Screen name = 'SignUp' component = {SignupScreen} />
            </Stack.Navigator>
        </NavigationContainer>
)



