import React from 'react'
import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import QRCode from './pages/QRCode'

const AppStack = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarStyle: styles.tabBarStyle,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName

            if (route.name === 'QRCode') {
              iconName = focused ? 'qr-code' : 'qr-code-outline'
            }

            return <Ionicons name={iconName} size={size} color={color} />
          }
        })}
      >
        <AppStack.Screen name="QRCode" component={QRCode} />
      </AppStack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    fontSize: 16
  },
  tabBarStyle: {
    backgroundColor: 'white',
    height: 55,
    width: '100%'
  }
})
