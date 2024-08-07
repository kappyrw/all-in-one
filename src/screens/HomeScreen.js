import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Import product images (assuming they're still needed)
import la1 from "../../assets/images/la1.jpeg";
import la2 from "../../assets/images/la2.jpeg";
import la3 from "../../assets/images/la3.jpeg";
import la4 from "../../assets/images/la4.jpeg";
import la5 from "../../assets/images/la5.jpeg";
import la6 from "../../assets/images/la6.jpeg";
import imcLogZoomed from "../../assets/imcLogZoomed.png";
import { Ionicons } from "@expo/vector-icons";
import RentScreen from "../screens/RentScreen";
import OrderScreen from "../screens/OrderScreen";
import ServiceScreen from "../screens/ServiceScreen";
import { GlobalContext } from '../context/GlobalContext';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BuyScreen from "./BuyScreen";

const { width } = Dimensions.get('window');


const Tab = createBottomTabNavigator();
const DashboardTabs = ({ route }) => {

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Buy') {
            iconName = focused ? 'ios-cart' : 'ios-cart-outline';
          } else if (route.name === 'Rent') {
            iconName = focused ? 'ios-key' : 'ios-key-outline';
          } else if (route.name === 'Order') {
            iconName = focused ? 'ios-list' : 'ios-list-outline';
          } else if (route.name === 'Service') {
            iconName = focused ? 'ios-construct' : 'ios-construct-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#F9A826',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#1a2a6c',
          borderTopColor: '#1a2a6c',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Buy" component={BuyScreen} initialParams={route.params} />
      <Tab.Screen name="Rent" component={RentScreen} initialParams={{ cart: [] }} />
      <Tab.Screen name="Order" component={OrderScreen} initialParams={route.params} />
      <Tab.Screen name="Service" component={ServiceScreen} />
    </Tab.Navigator>
  );
};


const HomeScreen = ({ navigation, route }) => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const {  cart } = useContext(GlobalContext); // Access addToCart from context
  

  useEffect(() => {
    const timerID = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timerID);
  }, []);

  

  const navigateToCart = () => {
    navigation.navigate("CartScreen", { cart: cart });
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={imcLogZoomed} style={styles.logoImage} />
        <Text style={styles.title}>IMC Ltd</Text>        
        <TouchableOpacity
          style={styles.cartIcon}
          onPress={navigateToCart}
        >
          <Ionicons name="cart" size={32} color="#1a2a6c" style={styles.icon} />
          <Text style={styles.cartIndicatorText}> {cart.length}</Text>
        </TouchableOpacity>
      </View>     
      <Text style={styles.subtitle}>Discover Extraordinary Experiences</Text>
      <DashboardTabs  route={route} />
      
    </SafeAreaView>
  );
};

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
    color:"#1a2a6c",
    backgroundColor:"#fff",
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
    backgroundColor:"#fff",
    display:"flex",
    flexDirection:"row",
    fontWeight:"bold",
    fontSize:20
  },
 
  logoImage: {
    width: 60,
    height:40,
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
    fontWeight:"bold",
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
    shadowColor:"#ccc",
    border:2,
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
    display:"flex",
    flexDirection:"row",
    top: 70,
    right: 120,
    // backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
  },
  cartIndicatorText: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default HomeScreen;

