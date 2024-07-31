import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions, Image, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LineChart } from 'react-native-chart-kit';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');

// Mock data for services (updated with images)
const services = [
  { id: '1', name: 'Luxury Spa', image: require('../../assets/images/la1.jpeg'), category: 'Wellness', price: 150, description: 'Indulge in our luxurious spa treatments for ultimate relaxation.' },
  { id: '2', name: 'Gourmet Dinner', image: require('../../assets/images/la2.jpeg'), category: 'Dining', price: 200, description: 'Experience fine dining with our chef\'s special gourmet menu.' },
  { id: '3', name: 'Adventure Trek', image: require('../../assets/images/la3.jpeg'), category: 'Adventure', price: 100, description: 'Embark on an exciting trek through scenic landscapes.' },
  { id: '4', name: 'Art Workshop', image: require('../../assets/images/la4.jpeg'), category: 'Culture', price: 80, description: 'Unleash your creativity in our interactive art workshops.' },
  { id: '5', name: 'Yacht Cruise', image: require('../../assets/images/la5.jpeg'), category: 'Leisure', price: 300, description: 'Enjoy a luxurious yacht cruise along the beautiful coastline.' },
  { id: '6', name: 'Wine Tasting', image: require('../../assets/images/la6.jpeg'), category: 'Experience', price: 120, description: 'Savor exquisite wines in our guided tasting sessions.' },
];

const HomeScreen = ({ route, navigation }) => {
  const { name } = route.params;
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedService, setSelectedService] = useState(null);
  const [cart, setCart] = useState([]);

  const filteredServices = selectedStatus === 'all' 
    ? services 
    : services.filter(service => service.category.toLowerCase() === selectedStatus);

  const addToCart = (service) => {
    setCart([...cart, service]);
    alert(`${service.name} added to cart!`);
  };

  const renderServiceItem = ({ item }) => (
    <TouchableOpacity
      style={styles.serviceCard}
      onPress={() => setSelectedService(item)}
    >
      <Image source={item.image} style={styles.serviceImage} />
      <View style={styles.serviceInfo}>
        <Text style={styles.serviceName}>{item.name}</Text>
        <Text style={styles.serviceCategory}>{item.category}</Text>
        <View style={styles.servicePriceContainer}>
          <Text style={styles.servicePrice}>${item.price}</Text>
          <TouchableOpacity onPress={() => addToCart(item)}>
            <Text style={styles.addToCartButton}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const getTotalSpent = () => {
    return services.reduce((total, service) => total + service.price, 0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Welcome, {name}!</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{services.length}</Text>
            <Text style={styles.statLabel}>Total Services</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>${getTotalSpent()}</Text>
            <Text style={styles.statLabel}>Total Value</Text>
          </View>
        </View>

        <Text style={styles.subtitle}>Your Activity</Text>
        <LineChart
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [{ data: [20, 45, 28, 80, 99, 43] }]
          }}
          width={Dimensions.get("window").width - 40}
          height={220}
          chartConfig={{
            backgroundColor: "#1a2a6c",
            backgroundGradientFrom: "#1a2a6c",
            backgroundGradientTo: "#005555",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: { borderRadius: 16 }
          }}
          bezier
          style={styles.chart}
        />

        <View style={styles.filterContainer}>
          {['all', 'wellness', 'dining', 'adventure', 'culture', 'leisure', 'experience'].map((status) => (
            <TouchableOpacity 
              key={status}
              style={[styles.filterButton, selectedStatus === status && styles.activeFilter]}
              onPress={() => setSelectedStatus(status)}
            >
              <Text style={styles.filterText}>{status.charAt(0).toUpperCase() + status.slice(1)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={filteredServices}
          renderItem={renderServiceItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.servicesList}
          numColumns={2}
        />

        {selectedService && (
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsTitle}>{selectedService.name}</Text>
            <Text style={styles.detailsDescription}>{selectedService.description}</Text>
            <TouchableOpacity 
              style={styles.orderButton}
              onPress={() => navigation.navigate("OrderScreen", { service: selectedService })}
            >
              <Text style={styles.orderButtonText}>Order Now</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
      <TouchableOpacity 
        style={styles.cartIndicator}
        onPress={() => navigation.navigate("Cart", { cart: cart })}
      >
        <Text style={styles.cartIndicatorText}>Cart: {cart.length}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const CartScreen = ({ route }) => {
  const { cart } = route.params;

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>Your Cart</Text>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={item.image} style={styles.cartItemImage} />
            <View style={styles.cartItemInfo}>
              <Text style={styles.cartItemName}>{item.name}</Text>
              <Text style={styles.cartItemPrice}>${item.price}</Text>
            </View>
          </View>
        )}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${getTotalPrice()}</Text>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ProfileScreen = ({ route }) => {
  const { name } = route.params;
  const [profileImage, setProfileImage] = useState(null);
  const [email, setEmail] = useState('user@example.com');
  const [phone, setPhone] = useState('(123) 456-7890');
  const [bio, setBio] = useState('I love traveling and experiencing new adventures!');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileImage(result.uri);
    }
  };

  const handleSaveChanges = () => {
    // Implement save functionality here
    console.log('Saving changes...');
  };

  return (
    <ScrollView style={styles.profileContainer}>
      <View style={styles.profileHeader}>
        <TouchableOpacity onPress={pickImage}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.profileImagePlaceholder}>
              <Text style={styles.profileImagePlaceholderText}>{name[0].toUpperCase()}</Text>
            </View>
          )}
        </TouchableOpacity>
        <Text style={styles.profileName}>{name}</Text>
      </View>

      <View style={styles.profileInfo}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Email</Text>
          <TextInput
            style={styles.infoInput}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Phone</Text>
          <TextInput
            style={styles.infoInput}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Bio</Text>
          <TextInput
            style={[styles.infoInput, styles.bioInput]}
            value={bio}
            onChangeText={setBio}
            multiline
          />
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const UserDashboardScreen = ({ route }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
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
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        initialParams={route.params}
      />
      <Tab.Screen name="Cart" component={CartScreen} initialParams={{ cart: [] }} />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        initialParams={route.params}
      />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a2a6c",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: "#fff",
    marginBottom: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 22,
    color: "#fff",
    marginBottom: 10,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 15,
    width: '48%',
  },
  statValue: {
    fontSize: 24,
    color: "#fff",
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: "#fff",
    marginTop: 5,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 10,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    margin: 5,
  },
  activeFilter: {
    backgroundColor: '#F9A826',
  },
  filterText: {
    color: "#fff",
    fontSize: 14,
  },
  servicesList: {
    flexGrow: 1,
  },
  serviceCard: {
    width: (width - 50) / 2,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
  },
  serviceImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  serviceInfo: {
    padding: 10,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  serviceCategory: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  servicePriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a2a6c',
  },
  addToCartButton: {
    color: '#F9A826',
    fontWeight: 'bold',
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
    backgroundColor: '#F9A826',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  orderButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartIndicator: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#F9A826',
    padding: 10,
    borderRadius: 20,
  },
  cartIndicatorText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#1a2a6c',
    padding: 20,
  },
  screenTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
  },
  cartItemImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
  },
  cartItemInfo: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cartItemPrice: {
    fontSize: 14,
    color: '#1a2a6c',
    marginTop: 5,
  },
  totalContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: '#F9A826',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileContainer: {
    flex: 1,
    backgroundColor: "#1a2a6c",
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 15,
  },
  profileImagePlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#F9A826',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileImagePlaceholderText: {
    fontSize: 60,
    color: '#fff',
  },
  profileName: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  profileInfo: {
    marginBottom: 30,
  },
  infoItem: {
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 16,
    color: '#F9A826',
    marginBottom: 5,
  },
  infoInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 15,
    color: '#fff',
    fontSize: 16,
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#F9A826',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UserDashboardScreen;