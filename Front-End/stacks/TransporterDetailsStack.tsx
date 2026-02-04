import React from 'react'
import scanner from '../pages/transporterScanner'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const AppStack = createNativeStackNavigator()

export default function TransporterDetailsStack() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="scanner" component={scanner} options={{ headerShown: false }} />
    </AppStack.Navigator>
  )
}
