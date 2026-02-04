import React from 'react'
import { StyleSheet, View } from 'react-native'
import QRCode from 'react-native-qrcode-svg'

export default function QRCodeScreen() {
  function generateSerialNumber() {
    const serialNumber = Math.floor(100000 + Math.random() * 900000)
    const hardwareVersion = Math.floor(100 + Math.random() * 900)
    const firmwareVersion = Math.floor(100 + Math.random() * 900)

    const currentDate = new Date()
    const day = String(currentDate.getDate()).padStart(2, '0')
    const month = String(currentDate.getMonth() + 1).padStart(2, '0')
    const year = String(currentDate.getFullYear()).slice(2)

    const serialNumberString = `${serialNumber}${hardwareVersion}${firmwareVersion}${day}${month}${year}`

    return serialNumberString
  }

  const SerialNumber = generateSerialNumber()

  function generateLotNumber() {
    const lotNumber = Math.floor(1 + Math.random() * 100)
    return lotNumber
  }

  const lotNumber = generateLotNumber().toString()
  const address = '77 rue Victor Hugo 75008'
  const client = 'Age Impulse'

  return (
    <View>
      <View style={styles.container}>
        <h1>Serial Number</h1>
        <QRCode value={SerialNumber} size={200} />
        <h1>{SerialNumber}</h1>
      </View>
      <View style={styles.container}>
        <h1>Lot Number</h1>
        <QRCode value={`77` + ' ' + address + ' ' + client} size={200} />
        <h1>77 77 rue Victor Hugo 75008 Age Impulse</h1>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
