import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import QRCode from 'react-native-qrcode-svg'

export default function QRCodeScreen({ route }: any) {
  const { QRCodeValue } = route.params

  return (
    <View style={styles.container}>
      <Text>QR Code:</Text>
      <QRCode value={QRCodeValue} size={200} />
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
