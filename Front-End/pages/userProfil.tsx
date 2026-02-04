import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, RefreshControl } from 'react-native'
import { useUserContext } from '../context/UserContext'

export default function Profile({ navigation }: any) {
  const { user } = useUserContext()
  const [profileData, setProfileData] = useState({
    profileImage: require('../assets/profile.jpg'),
    userObject: null
  })
  const [userObjet, setUserObjet] = useState(null)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchUserObject()
  }, [])

  const fetchUserObject = async () => {
    setLoading(true)
    try {
      const utilisateur = `${user.firstname} ${user.lastname}`
      const response = await fetch(`http://172.16.27.166:6666/api/userObject/${utilisateur}`)
      if (response.ok) {
        const data = await response.json()
        setUserObjet(data)
        console.log(data)
      } else {
        console.error("Erreur lors de la récupération des données de l'utilisateur", response.statusText)
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données de l'utilisateur", error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const handleRefresh = () => {
    setRefreshing(true)
    fetchUserObject()
  }

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContent}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
    >
      <View style={styles.container}>
        <TouchableOpacity>
          <Image source={profileData.profileImage} style={styles.profileImage} />
        </TouchableOpacity>
        <Text style={styles.name}>
          {user.firstname} {user.lastname}
        </Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.role}>{user.status}</Text>
        <View style={styles.line} />
        {loading ? (
          <Text style={styles.loadingText}>Chargement...</Text>
        ) : userObjet && Object.keys(userObjet).length > 0 ? (
          <View>
            <Text style={styles.label}>Objet numéro : {userObjet.serial_number}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('infoObjet', { serial_number: userObjet.serial_number })}
            >
              <Text style={styles.informations}>Voir les détails</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.noDataText}>Aucun objet assigné</Text>
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1
  },
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
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 20
  },
  text: {
    fontSize: 16,
    fontStyle: 'italic'
  },
  loadingText: {
    fontSize: 16,
    fontStyle: 'italic',
    marginTop: 20
  },
  noDataText: {
    fontSize: 16,
    fontStyle: 'italic',
    marginTop: 20,
    color: 'grey'
  },
  informations: {
    textAlign: 'center',
    marginTop: 20
  }
})
