import react, { useContext } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import initialServices from "../components/DamiData"
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";
import { GlobalContext } from '../context/GlobalContext';


const { width } = Dimensions.get('window');
function RentScreen({ navigation },{ route }) {
  const { addToCart, cart } = useContext(GlobalContext); // Access addToCart from context
  const [selectedService, setSelectedService] = useState(null);

  const navigateToCart = () => {
    navigation.navigate("CartScreen", { cart: cart });
  };
  const renderService = (item) => {

    return (
      <TouchableOpacity key={item.id} onPress={() => setSelectedService(item)} style={styles.serviceCard}>
        <Image source={item.image} style={styles.serviceImage} />

        <View style={styles.serviceInfo}>
          <Text style={styles.serviceName}>{item.name}</Text>
          <Text style={styles.serviceCategory}>{item.category}</Text>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={styles.servicePrice}>{item.price}</Text>
            <Text style={styles.servicePrice} onPress={() => navigation.navigate("PaymentScreen", { amount: item.price, productName: item.name, image: item.image })}>Buy</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.gridContainer}>
        {initialServices.map(renderService)}
      </ScrollView>

      {selectedService && (
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>{selectedService.name}</Text>
          <Text style={styles.detailsDescription}>{selectedService.description}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate("WelcomeScreen", { productName: selectedService.name })}
            >
              <Text style={styles.actionButtonText}>Order</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => addToCart(selectedService)}
            >
              <Text style={styles.actionButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      
    </SafeAreaView >
    
   )
 }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    color: "#1a2a6c",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 28,
    color: '#1a2a6c',
    fontWeight: 'bold',
  },
  cartIcon:
  {
    backgroundColor: "#fcc"
  },

  logoImage: {
    // width: 60,
    height: 40,
    borderRadius: 20,
  },
  timeText: {
    fontSize: 16,
    color: '#fff',
  },
  topButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#fff',
  },
  topButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#1a2a6c',
  },
  topButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: '#1a2a6c',
    textAlign: 'center',
    marginVertical: 10,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  serviceCard: {
    width: (width - 30) / 2,
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: "#ccc",
    border: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5, // for Android shadow
    // margin: 5,
    // padding: 10,

  },
  serviceImage: {
    width: '100%',
    height: '60%',
    resizeMode: 'cover',
  },
  serviceInfo: {
    padding: 10,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  serviceCategory: {
    fontSize: 12,
    color: '#666',
  },
  servicePrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1a2a6c',
  },
  detailsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,

  },
  detailsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a2a6c',
    marginBottom: 10,
  },
  detailsDescription: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#1a2a6c',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartIndicator: {
    position: 'absolute',
    display: "flex",
    flexDirection: "row",
    top: 40,
    right: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
  },
  cartIndicatorText: {
    color: '#1a2a6c',
    fontWeight: 'bold',
  },
});
 export default RentScreen