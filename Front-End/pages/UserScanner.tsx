import { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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
    console.log(data)

    const barrecode = data
    const serialNumber = data.substring(0, 6)

    try {
      const response = await fetch(`http://172.16.27.166:6666/api/updateObjectUser`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          barrecode,
          user: `${user.firstname} ${user.lastname}`,
          firstname: `${user.firstname}`,
          lastname: `${user.lastname}`,
          activation: true
        })
      })

      if (response.ok) {
        alert(`L'objet numéro ${serialNumber} est désormais le votre`)
      } else {
        console.error('Erreur lors de la mise à jour de la table objet:', response.statusText)
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la table objet:', error)
    }
  }

  if (hasPermission === null) {
    return
  }
  if (hasPermission === false) {
    return
  }

  return (
    <View style={styles.container}>
      <Text style={styles.qrCodeText}>Scannez le QR code</Text>
      <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleQRCodeScanned} style={styles.cam} />
      <TouchableOpacity style={styles.scanButton} onPress={handleScanned}>
        <Text style={styles.scanText}>Scanner</Text>
      </TouchableOpacity>
    </View>
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
