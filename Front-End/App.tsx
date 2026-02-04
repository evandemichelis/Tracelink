import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Animated, StyleSheet, Image } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'

import Register from './pages/register'
import Login from './pages/login'
import Profil from './pages/profil'
import Suivi from './pages/suivi'
import { UserProvider, useUserContext } from './context/UserContext'
import TransporterDetailsStack from './stacks/TransporterDetailsStack'
import UserScanner from './pages/UserScanner'
import ProducteurScanner from './pages/producterScanner'
import InfoObjetStack from './stacks/InfoObjetStack'

const AuthStack = createNativeStackNavigator()
const TransporterTab = createBottomTabNavigator()
const ProducterTab = createBottomTabNavigator()
const ClientTab = createBottomTabNavigator()

const TransporterNavigator = () => {
  return (
    <TransporterTab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarStyle: styles.tabBarStyle,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === 'Scanner') {
            iconName = focused ? 'qr-code' : 'qr-code-outline'
          } else if (route.name === 'Suivi') {
            iconName = focused ? 'swap-horizontal' : 'swap-horizontal-outline'
          } else if (route.name === 'Profil') {
            iconName = focused ? 'person' : 'person-outline'
          }

          return <Ionicons name={iconName} size={size} color={color} />
        }
      })}
    >
      <TransporterTab.Screen name="Scanner" component={TransporterDetailsStack} options={{ headerShown: false }} />
      <TransporterTab.Screen name="Suivi" component={Suivi} options={{ headerShown: false }} />
      <TransporterTab.Screen name="Profil" component={Profil} options={{ headerShown: false }} />
    </TransporterTab.Navigator>
  )
}

const ProducterNavigator = () => {
  return (
    <ProducterTab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarStyle: styles.tabBarStyle,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === 'Scanner') {
            iconName = focused ? 'qr-code' : 'qr-code-outline'
          } else if (route.name === 'Profil') {
            iconName = focused ? 'person' : 'person-outline'
          }

          return <Ionicons name={iconName} size={size} color={color} />
        }
      })}
    >
      <ProducterTab.Screen name="Scanner" component={ProducteurScanner} options={{ headerShown: false }} />
      <ProducterTab.Screen name="Profil" component={Profil} options={{ headerShown: false }} />
    </ProducterTab.Navigator>
  )
}

const ClientNavigator = () => {
  return (
    <ClientTab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarStyle: styles.tabBarStyle,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === 'Scanner') {
            iconName = focused ? 'qr-code' : 'qr-code-outline'
          } else if (route.name === 'Profil') {
            iconName = focused ? 'person' : 'person-outline'
          }

          return <Ionicons name={iconName} size={size} color={color} />
        }
      })}
    >
      <ClientTab.Screen name="Scanner" component={UserScanner} options={{ headerShown: false }} />
      <ClientTab.Screen name="Profil" component={InfoObjetStack} options={{ headerShown: false }} />
    </ClientTab.Navigator>
  )
}

const App = () => {
  const { user } = useUserContext()
  const [isLoading, setIsLoading] = useState(true)
  const [isLogged, setIsLogged] = useState(false)
  const [status, setStatus] = useState('')
  const [animation, setAnimation] = useState(new Animated.Value(1))

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 4000)
  }, [])

  useEffect(() => {
    console.log(status)
  }, [status])

  return (
    <UserProvider>
      <NavigationContainer>
        {isLoading ? (
          <Animated.View style={[styles.loadingContainer, { opacity: animation }]}>
            <Image source={require('./assets/loading.png')} style={styles.loadingImage} />
          </Animated.View>
        ) : (
          <>
            {!isLogged ? (
              <AuthStack.Navigator screenOptions={{ headerShown: false }}>
                <AuthStack.Screen name="login">
                  {({ navigation }) => (
                    <Login navigation={navigation} setIsLogged={setIsLogged} setStatus={setStatus} />
                  )}
                </AuthStack.Screen>
                <AuthStack.Screen name="register" component={Register} />
              </AuthStack.Navigator>
            ) : status === 'Transporteur' ? (
              <TransporterNavigator />
            ) : status === 'Producteur' ? (
              <ProducterNavigator />
            ) : (
              <ClientNavigator />
            )}
          </>
        )}
      </NavigationContainer>
    </UserProvider>
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
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingImage: {
    width: '100%',
    height: '100%'
  }
})

export default App
