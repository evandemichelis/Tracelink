import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import Header from '../components/header'

export default function Confirmation({ navigation }: any) {
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <View>
        <Header page="Confirmation" />
        <Text style={styles.grey}>
          Un mail de confirmation a été envoyé à <Text style={styles.blue}>(Inserer un mail)</Text> veuillez entrez le
          code ci-dessous :
        </Text>
        <View style={styles.connexion}>
          <TextInput style={styles.input} placeholder="Entrer mon code de confirmation" secureTextEntry={true} />
        </View>
        <TouchableOpacity onPress={() => console.log('Créer mon compte')}>
          <Text style={styles.confirmation}>Renvoyer un code de confirmation</Text>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('connection2')
            }}
          >
            <Text style={styles.buttonText}>CONFIRMER</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  grey: {
    paddingTop: 20,
    color: '#605F5F',
    fontSize: 17,
    textAlign: 'center',
    margin: 12
  },
  blue: {
    color: '#001D8B',
    fontWeight: 'bold'
  },
  connexion: {
    alignItems: 'center',
    marginTop: 20
  },
  input: {
    height: 40,
    width: '80%',
    marginVertical: 10,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5
  },
  buttonContainer: {
    alignItems: 'center'
  },
  button: {
    width: '50%',
    padding: 15,
    backgroundColor: '#001F96',
    borderRadius: 10
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20
  },
  confirmation: {
    margin: 20,
    textAlign: 'center',
    color: '#001D8B'
  }
})
