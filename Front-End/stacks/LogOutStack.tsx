import React from 'react'
import Login from '../pages/login'
import Profil from '../pages/profil'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const AppStack = createNativeStackNavigator()

export default function LogOutStack() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="profil" component={Profil} options={{ headerShown: false }} />
      <AppStack.Screen name="login" component={Login} options={{ headerShown: false }} />
    </AppStack.Navigator>
  )
}
