import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'

export default function ProducterDetails({ route, navigation }: any) {
  const { barrecode, serialNumber, hardwareVersion, firmwareVersion, formattedDate, lotNumber, destination } =
    route.params

  const data = [
    { label: 'Numéro de série', value: serialNumber },
    { label: 'Numéro de lot', value: lotNumber },
    { label: 'Version Hardware', value: hardwareVersion },
    { label: 'Version Fireware', value: firmwareVersion },
    { label: 'Date de création', value: formattedDate }
  ]

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://172.16.27.166:6666/api/addObject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          barrecode,
          serialNumber,
          hardwareVersion,
          firmwareVersion,
          formattedDate,
          lotNumber,
          destination
        })
      })

      if (response.ok) {
        const data = await response.json()
        navigation.navigate('scanner')
        console.log(data)
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi des données:", error)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.informations}>Informations de l'objet</Text>
      <View style={styles.containerdetails}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.label}>{item.label}</Text>
              <Text style={styles.value}>{item.value}</Text>
            </View>
          )}
        />
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
  }
})
