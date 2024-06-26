import React, { useRef, useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, Animated, Dimensions } from "react-native";
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
  const scrollX = useRef(new Animated.Value(0)).current;
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const timerID = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timerID);
  }, []);

  const renderService = ({ item, index }) => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: 'clamp'
    });

    return (
      <TouchableOpacity onPress={() => setSelectedService(item)}>
        <Animated.View style={[styles.serviceCard, { transform: [{ scale }] }]}>
          <Image source={item.image} style={styles.serviceImage} />
          <View style={styles.serviceInfo}>
            <Text style={styles.serviceName}>{item.name}</Text>
            <Text style={styles.serviceCategory}>{item.category}</Text>
            <Text style={styles.servicePrice}>{item.price}</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>MultiService</Text>
        <Text style={styles.timeText}>{currentTime}</Text>
      </View>

      <Text style={styles.subtitle}>Discover Extraordinary Experiences</Text>

      <Animated.FlatList
        data={initialServices}
        renderItem={renderService}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
      />

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

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerButtonText}>Explore</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerButtonText}>Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerButtonText}>Profile</Text>
        </TouchableOpacity>
      </View>
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
  subtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  serviceCard: {
    width: width - 40,
    height: 300,
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  serviceImage: {
    width: '100%',
    height: '70%',
    resizeMode: 'cover',
  },
  serviceInfo: {
    padding: 15,
  },
  serviceName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  serviceCategory: {
    fontSize: 16,
    color: '#666',
    marginVertical: -1,
  },
  servicePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a2a6c',
  },
  detailsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  footerButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  footerButtonText: {
    color: '#1a2a6c',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
