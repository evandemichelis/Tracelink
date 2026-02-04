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
import { Picker } from '@react-native-picker/picker'

export default function Inscription({ navigation }: any) {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [status, setStatus] = useState()
  const [errorMessage, setErrorMessage] = useState('')

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible)
  }

  const handleRegister = async () => {
    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      setErrorMessage('Tous les champs sont obligatoires')
      return
    }

    if (password !== confirmPassword) {
      setErrorMessage('Les mots de passe ne correspondent pas')
      return
    }

    try {
      const response = await fetch('http://172.16.27.166:6666/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstname, lastname, email, password, status })
      })
      console.log(status)
      if (response.ok) {
        navigation.navigate('login')
      } else {
        throw new Error('Impossible de créer le compte utilisateur')
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error)
      setErrorMessage('Impossible de créer le compte utilisateur')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBackground} />
      <View style={styles.bottomBackground} />
      <View style={styles.overlayContainer}>
        <KeyboardAvoidingView style={styles.content} behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <ScrollView contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps="handled">
            <Text style={styles.title}>Inscription</Text>
            <Text style={styles.titlebis}>Bienvenue sur TraceLink !</Text>
            <View style={styles.connexion}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input_names}
                  placeholder="Prénom"
                  value={firstname}
                  onChangeText={setFirstname}
                  placeholderTextColor="black"
                />
                <TextInput
                  style={styles.input_names}
                  placeholder="Nom"
                  value={lastname}
                  onChangeText={setLastname}
                  placeholderTextColor="black"
                />
              </View>
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
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Confirmer mon mot de passe"
                  secureTextEntry={!confirmPasswordVisible}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholderTextColor="black"
                />
                <TouchableOpacity onPress={toggleConfirmPasswordVisibility} style={styles.eyeIconContainer}>
                  <Ionicons name={confirmPasswordVisible ? 'eye' : 'eye-off'} size={24} color="gray" />
                </TouchableOpacity>
              </View>
              <View style={styles.dropdownContainer}>
                <Picker
                  selectedValue={status}
                  style={styles.dropdown}
                  onValueChange={(itemValue) => setStatus(itemValue)}
                >
                  <Picker.Item label="Selectionner un rôle" value="" enabled={false} />
                  <Picker.Item label="Client" value="Client" />
                  <Picker.Item label="Transporteur" value="Transporteur" />
                  <Picker.Item label="Producteur" value="Producteur" />
                </Picker>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>S'INSCRIRE</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('login')}>
                <Text style={styles.buttonText1}>Se connecter</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
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
  title: {
    fontSize: 30,
    textAlign: 'center'
  },
  titlebis: {
    fontSize: 20,
    textAlign: 'center'
  },

  content: {
    marginTop: '20%',
    width: '80%',
    height: 600,
    padding: 10,
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 10
  },
  scrollViewContent: {
    flexGrow: 1
  },
  connexion: {
    alignItems: 'center',
    paddingTop: 30
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%'
  },
  input_names: {
    height: 40,
    width: '49%',
    marginVertical: 10,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 5
  },
  input: {
    height: 40,
    width: '80%',
    marginVertical: 10,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 5
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
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
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    width: '80%',
    marginVertical: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5
  },
  dropdownLabel: {
    marginRight: 10,
    fontSize: 16,
    color: 'black'
  },
  dropdown: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20
  },
  loginButton: {
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15
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
  buttonText1: {
    fontSize: 18,
    color: '#007bff',
    fontWeight: 'bold'
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20
  },
  errorMessage: {
    color: 'red',
    marginTop: 15,
    width: '80%',
    textAlign: 'center'
  }
})
