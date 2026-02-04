import { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { useUserContext } from '../context/UserContext'

export default function Scanner({ navigation }: any) {
  const { user } = useUserContext()
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)
  const [QRCodeValue, setQRCodeValue] = useState(null)
  const [lotNumber, setLotNumber] = useState(0)
  const [destination, setDestination] = useState('')
  const [client, setClient] = useState('')
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

    if (data.length === 18) {
      const barrecode = data
      const serialNumber = data.substring(0, 6)
      const hardwareVersion = data.substring(6, 9)
      const firmwareVersion = data.substring(9, 12)
      const date = data.substring(12)
      const formattedDate = `${date.substring(0, 2)}/${date.substring(2, 4)}/${date.substring(4)}`

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
            destination,
            client
          })
        })

        if (response.ok) {
          const data = await response.json()
          alert(`Objet numéro ${serialNumber} bien ajouté au lot ${lotNumber}`)
          console.log(data)
        } else {
          console.error("Erreur lors de l'ajout de l'objet:", response.statusText)
          alert("Erreur lors de l'ajout de l'objet")
        }
      } catch (error) {
        console.error("Erreur lors de l'envoi des données:", error)
        alert("Erreur lors de l'envoi des données")
      }
    } else if (data.length < 18 || data.length > 18) {
      const generatedLot = data
      const QrParts = generatedLot.split(' ')

      const lotNumber = QrParts[0]
      const client = QrParts.slice(QrParts.length - 2).join(' ')
      const destination = QrParts.slice(1, QrParts.length - 2).join(' ')

      setLotNumber(lotNumber)
      setDestination(destination)
      setClient(client)
      alert(`Numéro de lot : ${lotNumber}\nDestination : ${destination}\nClient : ${client}`)
    } else {
      alert(`Format non reconnu`)
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
    backgroundColor: '#007bff',
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
