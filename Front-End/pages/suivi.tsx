import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  PanResponder,
  Animated,
  RefreshControl
} from 'react-native'
import { useUserContext } from '../context/UserContext'

const Suivi = () => {
  const { user } = useUserContext()
  const [selectedCategory, setSelectedCategory] = useState('Toutes')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const scrollViewRef = useRef(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const [userLots, setUserLots] = useState([])

  useEffect(() => {
    fetchUserLots()
  }, [])

  const fetchUserLots = async () => {
    try {
      const response = await fetch(`http://172.16.27.166:6666/api/userLots/${user.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const { recupered_lot } = await response.json()
        const lotInfos = await Promise.all(recupered_lot.map(fetchLotInfo))
        console.log(lotInfos)
        setUserLots(lotInfos)
      } else {
        console.error('Erreur lors de la récupération des lots', response.statusText)
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des lots', error)
    }
  }

  const fetchLotInfo = async (lotNumber: number) => {
    try {
      const response = await fetch(`http://172.16.27.166:6666/api/lotInfo/${lotNumber}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        return await response.json()
      } else {
        console.error(`Erreur lors de la récupération des informations pour le lot ${lotNumber}`, response.statusText)
        return null
      }
    } catch (error) {
      console.error(`Erreur lors de la récupération des informations pour le lot ${lotNumber}`, error)
      return null
    }
  }

  const handleCategoryPress = (category: any) => {
    setSelectedCategory(category)
  }

  const handleProductPress = async (product: any) => {
    try {
      const lotInfo = await fetchLotInfo(product.lot_number)
      setSelectedProduct(lotInfo)
      console.log(lotInfo)
      setModalVisible(true)
    } catch (error) {
      console.error('Erreur lors de la récupération des informations du lot', error)
    }
  }

  const closeModal = () => {
    setSelectedProduct(null)
    setModalVisible(false)
  }

  const panY = useRef(new Animated.Value(0)).current
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (gestureState) => {
        return gestureState.dy > 10 && gestureState.dy < 200
      },
      onPanResponderMove: Animated.event([null, { dy: panY }], {
        useNativeDriver: false
      }),
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          closeModal()
        } else {
          Animated.spring(panY, {
            toValue: 0,
            useNativeDriver: false
          }).start()
        }
      }
    })
  ).current

  const ProductItem = ({ product }) => (
    <View style={styles.productItem}>
      <Image source={require('../assets/package.png')} style={styles.icon} />
      <View>
        <Text style={styles.lotNumber}>N° Lot : {product.lot_number}</Text>
        <Text style={[styles.deliveryStatus, { color: product.delivery_date ? '#008000' : '#FFA500' }]}>
          {product.delivery_date ? 'Arrivé à destination' : 'En cours de livraison'}
        </Text>
      </View>
      <View style={styles.locationContainer}>
        <Text style={styles.location}>{product.transporteur}</Text>
        <Text style={styles.location}>{product.destination}</Text>
      </View>
    </View>
  )

  const InfoItem = ({ label, value, icon }) => (
    <View style={styles.infoContainer}>
      <Image source={icon} style={styles.infoIcon} />
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.info}>{value}</Text>
    </View>
  )

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    fetchUserLots().then(() => setRefreshing(false))
  }, [])

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity onPress={() => handleCategoryPress('Toutes')}>
            <Text style={[styles.categoryTitle, selectedCategory === 'Toutes' && styles.selectedCategory]}>Toutes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCategoryPress('En cours de livraison')}>
            <Text
              style={[styles.categoryTitle, selectedCategory === 'En cours de livraison' && styles.selectedCategory]}
            >
              En cours de livraison
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCategoryPress('Arrivé à destination')}>
            <Text
              style={[styles.categoryTitle, selectedCategory === 'Arrivé à destination' && styles.selectedCategory]}
            >
              Arrivé à destination
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View style={styles.line} />

      <ScrollView
        style={styles.scrollView}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollTo({ y: 0 })}
      >
        <View style={styles.productContainer}>
          {userLots
            .filter(
              (lot) =>
                selectedCategory === 'Toutes' ||
                (selectedCategory === 'En cours de livraison' && !lot.delivery_date) ||
                (selectedCategory === 'Arrivé à destination' && lot.delivery_date)
            )
            .map((lot) => (
              <View style={styles.productItemContainer} key={lot.id}>
                <TouchableOpacity onPress={() => handleProductPress(lot)}>
                  <ProductItem product={lot} />
                </TouchableOpacity>
              </View>
            ))}
          <View style={styles.emptyProductContainer}></View>
        </View>
      </ScrollView>

      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.overlay} />
          </TouchableWithoutFeedback>
          <Animated.View
            style={[styles.modalContent, { transform: [{ translateY: panY }] }]}
            {...panResponder.panHandlers}
          >
            <View style={styles.modalHeader}>
              <Image source={require('../assets/package.png')} style={styles.icon} />
              <View style={styles.lotInfo}>
                <Text style={styles.lotNumber}>N° Lot: {selectedProduct?.lot_number}</Text>
                <Text style={styles.deliveryStatus}>
                  {selectedProduct?.delivery_date ? 'Arrivé à destination' : 'En cours de livraison'}
                </Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Informations sur la livraison</Text>
              <View style={styles.gridContainer}>
                <InfoItem
                  label="Nombre d'objets :"
                  value={selectedProduct?.objects_number?.toString() || ''}
                  icon={require('../assets/stack.png')}
                />
                <InfoItem
                  label="Client :"
                  value={selectedProduct?.client || ''}
                  icon={require('../assets/sender.png')}
                />
                <InfoItem
                  label="Date de retrait :"
                  value={selectedProduct?.recuperation_date || ''}
                  icon={require('../assets/calendar.png')}
                />
                <InfoItem
                  label="Destination :"
                  value={selectedProduct?.destination || ''}
                  icon={require('../assets/location.png')}
                />
              </View>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Fermer</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: '20%'
  },
  categoryContainer: {
    flexDirection: 'row'
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 20
  },
  line: {
    width: '100%',
    borderWidth: 0.5,
    marginTop: 10
  },
  selectedCategory: {
    color: '#007bff'
  },
  productContainer: {
    marginTop: 20
  },
  productItemContainer: {
    marginBottom: 1
  },
  productItem: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'lightgrey',
    marginBottom: 10
  },
  icon: {
    width: 40,
    height: 40
  },
  lotNumber: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  deliveryStatus: {
    fontSize: 14,
    textAlign: 'right'
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5
  },
  location: {
    fontSize: 14,
    color: '#888'
  },
  emptyProductContainer: {
    flex: 1
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  overlay: {
    flex: 1
  },
  modalContent: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: 'black',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
    height: '80%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  lotInfo: {
    flexDirection: 'column'
  },
  section: {
    marginTop: 20
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1a1110'
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  infoContainer: {
    width: '48%',
    marginBottom: 20,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
    alignItems: 'flex-start',
    height: '48%',
    borderColor: 'lightgrey',
    borderWidth: 1,
    shadowColor: '#000',
    elevation: 5
  },
  infoIcon: {
    width: 34,
    height: 34,
    marginBottom: 15
  },
  label: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10
  },
  info: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold'
  },
  closeButton: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'blue'
  },
  closeButtonText: {
    color: '#007bff',
    fontSize: 18,
    fontWeight: 'bold'
  }
})

export default Suivi
