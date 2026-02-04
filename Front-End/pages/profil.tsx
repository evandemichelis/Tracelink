import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useUserContext } from '../context/UserContext'

export default function Profile({ navigation }: any) {
  const { user } = useUserContext()
  const [profileData, setProfileData] = useState({
    profileImage: require('../assets/profile.jpg')
  })

  const handleProfilePictureChange = async () => {
    console.log('Changing profile picture...')
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera roll is required!')
      return
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    })

    if (!pickerResult.cancelled) {
      const updatedProfileData = { ...profileData, profileImage: { uri: pickerResult.uri } }
      setProfileData(updatedProfileData)
      console.log('Updated profile data:', updatedProfileData)
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleProfilePictureChange}>
        <Image source={profileData.profileImage} style={styles.profileImage} />
      </TouchableOpacity>
      <Text style={styles.name}>
        {user.firstname} {user.lastname}
      </Text>
      <Text style={styles.email}>{user.email}</Text>
      <Text style={styles.role}>{user.status}</Text>
      <View style={styles.line} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: '20%'
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20
  },
  name: {
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 10
  },
  role: {
    fontSize: 18,
    color: 'grey',
    marginTop: 10
  },
  email: {
    fontSize: 18,
    color: 'grey'
  },
  line: {
    width: '80%',
    borderBottomWidth: 1.5,
    borderColor: 'grey',
    marginVertical: 15
  },
  logoutButton: {
    marginTop: 300,
    backgroundColor: 'red',
    borderRadius: 20,
    height: 60,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoutText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  }
})
