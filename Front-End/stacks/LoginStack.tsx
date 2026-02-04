import React from 'react'
import Login from '../pages/login'
import Scanner from '../pages/producterScanner'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const AppStack = createNativeStackNavigator()

export default function LoginStack() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="login" component={Login} options={{ headerShown: false }} />
      <AppStack.Screen name="scanner" component={Scanner} options={{ headerShown: false }} />
    </AppStack.Navigator>
  )
}
