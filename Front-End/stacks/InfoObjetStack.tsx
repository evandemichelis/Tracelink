import React from 'react'
import profil from '../pages/userProfil'
import infoObjet from '../pages/infoObjet'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const AppStack = createNativeStackNavigator()

export default function InfoObjetStack() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="profil" component={profil} options={{ headerShown: false }} />
      <AppStack.Screen name="infoObjet" component={infoObjet} options={{ headerShown: false }} />
    </AppStack.Navigator>
  )
}
