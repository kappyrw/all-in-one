import React, { useRef, useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Import product images
import la1 from "../../assets/images/la1.jpeg";
import la2 from "../../assets/images/la2.jpeg";
import la3 from "../../assets/images/la3.jpeg";
import la4 from "../../assets/images/la4.jpeg";
import la5 from "../../assets/images/la5.jpeg";
import la6 from "../../assets/images/la6.jpeg";

const initialServices = [
  { id: '1', name: 'Moving Service 1', image: la1, size: 'Large', price: '$50' },
  { id: '2', name: 'Moving Service 2', image: la2, size: 'Medium', price: '$40' },
  { id: '3', name: 'Moving Service 3', image: la3, size: 'Small', price: '$30' },
  { id: '4', name: 'Moving Service 4', image: la4, size: 'Extra Large', price: '$60' },
  { id: '5', name: 'Moving Service 5', image: la5, size: 'Large', price: '$50' },
  { id: '6', name: 'Moving Service 6', image: la6, size: 'Medium', price: '$40' },
];

const HomeScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedService, setSelectedService] = useState(null);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % initialServices.length);
      scrollViewRef.current.scrollTo({ x: currentIndex * 300, animated: true });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleServicePress = (service) => {
    setSelectedService(service);
  };

  const handleOrderPress = (service) => {
    navigation.navigate("WelcomeScreen", { productName: service.name }); // Navigate to WelcomeScreen and pass service name
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to MultiService!</Text>
        <Text style={styles.description}>
          Order any product you want from our wide range of services. Make your choice below:
        </Text>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
        >
          {initialServices.map((service, index) => (
            <View key={service.id} style={styles.serviceCardContainer}>
              <TouchableOpacity
                style={styles.orderButton}
                onPress={() => handleOrderPress(service)}
              >
                <Text style={styles.orderButtonText}>Order</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.serviceCard}
                onPress={() => handleServicePress(service)}
              >
                <Image source={service.image} style={styles.serviceImage} />
                <Text style={styles.serviceName}>{service.name}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        {selectedService && (
          <View style={styles.selectedServiceInfo}>
            <Text style={styles.infoText}>Name: {selectedService.name}</Text>
            <Text style={styles.infoText}>Size: {selectedService.size}</Text>
            <Text style={styles.infoText}>Price: {selectedService.price}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#005555",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  scrollViewContent: {
    alignItems: "center",
  },
  serviceCardContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  orderButton: {
    backgroundColor: "#F9A826", // Yellow background
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    position: "absolute",
    zIndex: 1,
    alignSelf: "center",
  },
  orderButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  serviceCard: {
    width: 300,
    marginHorizontal: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#F9A826", // Light orange background
    justifyContent: "center",
    alignItems: "center",
  },
  serviceImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
  },
  serviceName: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 10,
  },
  selectedServiceInfo: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
});

export default HomeScreen;
