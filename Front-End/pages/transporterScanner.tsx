import { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { useUserContext } from '../context/UserContext'

export default function Scanner({ navigation }: any) {
  const { user } = useUserContext()
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)
  const [QRCodeValue, setQRCodeValue] = useState(null)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    }

    getBarCodeScannerPermissions()
  }, [])

  const onRefresh = () => {
    setRefreshing(true)
    setScanned(false)
    setRefreshing(false)
  }

  const handleScanned = () => {
    setScanned(false)
  }

  const handleQRCodeScanned = async ({ data }: any) => {
    setScanned(true)
    setQRCodeValue(data)

    const qrCodeParts = data.split(' ')
    const lotNumber = qrCodeParts[0]

    try {
      const scannedLotResponse = await fetch(`http://172.16.27.166:6666/api/checkScannedLot/${lotNumber}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (scannedLotResponse.ok) {
        const { hasReceivedDate } = await scannedLotResponse.json()
        console.log(hasReceivedDate)

        if (hasReceivedDate) {
          const deliveredLotResponse = await fetch('http://172.16.27.166:6666/api/deliveredLot', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              lotNumber,
              transporterId: user.id
            })
          })

          if (deliveredLotResponse.ok) {
            const deliveredLotData = await deliveredLotResponse.json()
            console.log(deliveredLotData)
            alert('Lot livré avec succès')
          } else {
            console.error('Erreur lors de la mise à jour du lot délivré:', deliveredLotResponse.statusText)
          }
        } else {
          const updateResponse = await fetch('http://172.16.27.166:6666/api/updateLot', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              lotNumber,
              transporterName: `${user.firstname} ${user.lastname}`,
              transporterFirstname: `${user.firstname}`,
              transporterLastname: `${user.lastname}`,
              receptionDate: new Date().toLocaleDateString('fr-FR')
            })
          })

          if (updateResponse.ok) {
            const updateData = await updateResponse.json()
            console.log(updateData)
            alert('Lot récupéré avec succès')
          } else {
            console.error('Erreur lors de la mise à jour des données:', updateResponse.statusText)
          }
        }
      } else {
        console.error('Erreur lors de la vérification du lot scanné:', scannedLotResponse.statusText)
      }
    } catch (error) {
      console.error('Erreur lors du traitement du QR code:', error)
    }
  }

  if (hasPermission === null) {
    return
  }
  if (hasPermission === false) {
    return
  }
  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <Text style={styles.qrCodeText}>Scannez le QR code</Text>
      <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleQRCodeScanned} style={styles.cam} />
      <TouchableOpacity style={styles.scanButton} onPress={handleScanned}>
        <Text style={styles.scanText}>Scanner</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  qrCodeText: {
    fontSize: 25,
    color: 'black',
    textAlign: 'center',
    marginTop: 80
  },
  cam: {
    width: 700,
    height: 450,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 60,
    alignSelf: 'center'
  },
  scanButton: {
    backgroundColor: '#001F96',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
    marginTop: 20,
    alignItems: 'center',
    width: 200,
    alignSelf: 'center'
  },
  scanText: {
    color: 'white',
    fontSize: 18
  },
  text: {
    color: 'black'
  }
})
