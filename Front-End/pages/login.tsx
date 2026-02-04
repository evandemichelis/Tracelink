import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useUserContext } from '../context/UserContext'

export default function Login({ navigation, setIsLogged, setStatus }: any) {
  const { setUser } = useUserContext()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  const handleLogin = async () => {
    try {
      const response = await fetch('http://172.16.27.166:6666/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      const data = await response.json()
      if (response.ok) {
        setUser(data.user)
        setStatus(data.user.status)
        console.log(data.user)
        setIsLogged(true)
      } else {
        setErrorMessage(data.message || 'Email ou mot de passe incorrect')
      }
    } catch (error) {
      console.error('Erreur lors de la connexion :', error)
      setErrorMessage('Erreur lors de la connexion')
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <ScrollView contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps="handled">
        <View style={styles.background}>
          <View style={styles.topBackground} />
          <View style={styles.bottomBackground} />
          <View style={styles.overlayContainer}>
            <View style={styles.content}>
              <Text style={styles.title}>Connexion</Text>
              <Text style={styles.titlebis}>Content de vous retrouver !</Text>
              <View style={styles.connexion}>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  placeholderTextColor="black"
                />
                <View style={styles.passwordInputContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Mot de passe"
                    secureTextEntry={!passwordVisible}
                    value={password}
                    onChangeText={setPassword}
                    placeholderTextColor="black"
                  />
                  <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIconContainer}>
                    <Ionicons name={passwordVisible ? 'eye' : 'eye-off'} size={24} color="gray" />
                  </TouchableOpacity>
                </View>
                {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
                <TouchableOpacity onPress={() => console.log('Mot de passe oublié ?')}>
                  <Text style={styles.forgottenPassword}></Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                  <Text style={styles.buttonText}>CONNEXION</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('register')
                }}
              >
                <Text style={styles.createAccount}>Créer mon compte</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6faff'
  },
  scrollViewContent: {
    flexGrow: 1
  },
  background: {
    flex: 1
  },
  topBackground: {
    height: '40%',
    backgroundColor: '#007bff'
  },
  bottomBackground: {
    height: '60%',
    backgroundColor: '#f6faff'
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    marginTop: '20%',
    width: '80%',
    height: 500,
    padding: 30,
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 10
  },
  title: {
    fontSize: 30,
    textAlign: 'center'
  },
  titlebis: {
    fontSize: 20,
    textAlign: 'center'
  },

  connexion: {
    alignItems: 'center',
    marginTop: '10%'
  },
  input: {
    height: 40,
    width: '100%',
    marginVertical: 10,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5
  },
  passwordInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10
  },
  eyeIconContainer: {
    marginRight: 10
  },
  buttonContainer: {
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 5,
    alignItems: 'center',
    shadowColor: '#007bff',
    elevation: 5
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20
  },
  forgottenPassword: {
    margin: 20,
    fontSize: 15,
    textAlign: 'center',
    color: '#001D8B'
  },
  createAccount: {
    margin: 15,
    fontSize: 18,
    textAlign: 'center',
    color: '#007bff',
    fontWeight: 'bold'
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
    width: '100%',
    textAlign: 'center'
  }
})
