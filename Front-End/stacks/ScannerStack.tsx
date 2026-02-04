import React from 'react'
import scanner from '../pages/producterScanner'
import qrcode from '../pages/qrcode'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const AppStack = createNativeStackNavigator()

export default function CodesStack() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="scanner" component={scanner} options={{ headerShown: false }} />
      <AppStack.Screen name="qrcode" component={qrcode} options={{ headerShown: false }} />
    </AppStack.Navigator>
  )
}
