import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'

export default function InfoObjet({ route }: any) {
  const { serial_number } = route.params
  const [detailsData, setDetailsData] = useState<any>(null)

  useEffect(() => {
    fetchObjectDetails(serial_number)
  }, [serial_number])

  const fetchObjectDetails = async (serialNumber: string) => {
    try {
      const response = await fetch(`http://172.16.27.166:6666/api/objectDetails/${serial_number}`)
      if (response.ok) {
        const data = await response.json()
        setDetailsData(data)
      } else {
        console.error("Erreur lors de la récupération des détails de l'objet", response.statusText)
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des détails de l'objet", error)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.informations}>Informations de l'objet</Text>
      <View style={styles.containerdetails}>
        {detailsData ? (
          <FlatList
            data={Object.entries(detailsData)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Text style={styles.label}>{item[0]}</Text>
                <Text style={styles.value}>{item[1]}</Text>
              </View>
            )}
          />
        ) : (
          <Text style={styles.loadingText}>Chargement des informations...</Text>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5F5F5'
  },
  informations: {
    padding: 70,
    fontWeight: 'bold',
    fontSize: 20
  },
  containerdetails: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    paddingBottom: 20,
    marginBottom: 20
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16
  },
  value: {
    fontSize: 16
  },
  loadingText: {
    fontSize: 16,
    fontStyle: 'italic',
    marginTop: 20
  }
})
