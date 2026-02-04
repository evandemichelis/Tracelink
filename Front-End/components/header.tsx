import { StyleSheet, Text, View, Image } from 'react-native'

export default function Header({ page }: any) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
      <Text style={styles.block}>{page}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center'
  },
  logo: {
    marginBottom: 40,
    width: '80%'
  },
  block: {
    backgroundColor: '#EAEAEA',
    fontSize: 27,
    color: '#001F96',
    width: '100%',
    textAlign: 'center',
    padding: 10,
    marginTop: -80
  }
})
