import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Import product images (assuming they're still needed)
import la1 from "../../assets/images/la1.jpeg";
import la2 from "../../assets/images/la2.jpeg";
import la3 from "../../assets/images/la3.jpeg";
import la4 from "../../assets/images/la4.jpeg";
import la5 from "../../assets/images/la5.jpeg";
import la6 from "../../assets/images/la6.jpeg";

const { width } = Dimensions.get('window');

const initialServices = [
  { id: '1', name: 'Luxury Spa', image: la1, category: 'Wellness', price: '$150', description: 'Indulge in our luxurious spa treatments for ultimate relaxation.' },
  { id: '2', name: 'Gourmet Dinner', image: la2, category: 'Dining', price: '$200', description: 'Experience fine dining with our chef\'s special gourmet menu.' },
  { id: '3', name: 'Adventure Trek', image: la3, category: 'Adventure', price: '$100', description: 'Embark on an exciting trek through scenic landscapes.' },
  { id: '4', name: 'Art Workshop', image: la4, category: 'Culture', price: '$80', description: 'Unleash your creativity in our interactive art workshops.' },
  { id: '5', name: 'Yacht Cruise', image: la5, category: 'Leisure', price: '$300', description: 'Enjoy a luxurious yacht cruise along the beautiful coastline.' },
  { id: '6', name: 'Wine Tasting', image: la6, category: 'Experience', price: '$120', description: 'Savor exquisite wines in our guided tasting sessions.' },
];

const HomeScreen = ({ navigation }) => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const timerID = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timerID);
  }, []);

  const renderService = (item) => {
    return (
      <TouchableOpacity key={item.id} onPress={() => setSelectedService(item)} style={styles.serviceCard}>
        <Image source={item.image} style={styles.serviceImage} />
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceName}>{item.name}</Text>
          <Text style={styles.serviceCategory}>{item.category}</Text>
          <Text style={styles.servicePrice}>{item.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>MultiService</Text>
        <Text style={styles.timeText}>{currentTime}</Text>
      </View>

      <View style={styles.topButtons}>
        <TouchableOpacity style={styles.topButton}>
          <Text style={styles.topButtonText}>Buy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.topButton}>
          <Text style={styles.topButtonText}>Rent</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.topButton}>
          <Text style={styles.topButtonText}>Order</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>Discover Extraordinary Experiences</Text>

      <ScrollView contentContainerStyle={styles.gridContainer}>
        {initialServices.map(renderService)}
      </ScrollView>

      {selectedService && (
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>{selectedService.name}</Text>
          <Text style={styles.detailsDescription}>{selectedService.description}</Text>
          <TouchableOpacity 
            style={styles.orderButton}
            onPress={() => navigation.navigate("WelcomeScreen", { productName: selectedService.name })}
          >
            <Text style={styles.orderButtonText}>Order</Text>
          </TouchableOpacity>
        </View>
      )}

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a2a6c',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
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
    color: '#fff',
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
  orderButton: {
    backgroundColor: '#1a2a6c',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  orderButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  footerText: {
    color: '#1a2a6c',
    fontSize: 16,
    marginBottom: 5,
  },
});

export default HomeScreen;