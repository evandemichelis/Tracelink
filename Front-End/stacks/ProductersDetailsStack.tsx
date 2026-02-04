import React from 'react'
import scanner from '../pages/producterScanner'
import productersDetails from '../pages/productersDetails'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const AppStack = createNativeStackNavigator()

export default function ProducterDetailsStack() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="scanner" component={scanner} options={{ headerShown: false }} />
      <AppStack.Screen name="productersDetails" component={productersDetails} options={{ headerShown: false }} />
    </AppStack.Navigator>
  )
}
