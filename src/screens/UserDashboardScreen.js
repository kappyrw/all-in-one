import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions, Image, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LineChart } from 'react-native-chart-kit';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import {  DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { createDrawerNavigator } from '@react-navigation/drawer';
import NotificationScreen from './NotificationScreen';

// Mock data for user and services
 // Replace with actual user data

const services = [
  { id: '1', name: 'Luxury Spa', status: 'pending', orderDate: '2024-06-26', price: 150 },
  { id: '2', name: 'Gourmet Dinner', status: 'shipped', orderDate: '2024-06-25', price: 200 },
  { id: '3', name: 'Adventure Trek', status: 'processing', orderDate: '2024-06-24', price: 100 },
  { id: '4', name: 'Art Workshop', status: 'pending', orderDate: '2024-06-27', price: 80 },
  { id: '5', name: 'Yacht Cruise', status: 'shipped', orderDate: '2024-06-28', price: 300 },
  { id: '6', name: 'Wine Tasting', status: 'processing', orderDate: '2024-06-29', price: 120 },
];

const HomeScreen = ({ route }) => {
  const name  = "my name";
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredServices = selectedStatus === 'all'
    ? services
    : services.filter(service => service.status === selectedStatus);

  const renderServiceItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.serviceCard, getStatusColor(item.status)]}
      onPress={() => {/* Navigate to product detail screen */ }}
    >
      <Text style={styles.serviceName}>{item.name}</Text>
      <Text style={styles.serviceInfo}>{`$${item.price}`}</Text>
      <Text style={styles.serviceInfo}>{item.orderDate}</Text>
      <Text style={styles.statusIcon}>{renderStatusIcon(item.status)}</Text>
    </TouchableOpacity>
  );

  const renderStatusIcon = (status) => {
    switch (status) {
      case 'pending': return '⏳';
      case 'shipped': return '📦';
      case 'processing': return '⚙️';
      default: return '';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return { backgroundColor: '#F9A826' };
      case 'shipped': return { backgroundColor: '#4CAF50' };
      case 'processing': return { backgroundColor: '#2196F3' };
      default: return { backgroundColor: '#F9A826' };
    }
  };

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
            <Text style={styles.statLabel}>Total Orders</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>${getTotalSpent()}</Text>
            <Text style={styles.statLabel}>Total Spent</Text>
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
          {['all', 'pending', 'shipped', 'processing'].map((status) => (
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
      </ScrollView>
    </SafeAreaView>
  );
};

const CartScreen = () => (
  <View style={styles.screenContainer}>
    <Text style={styles.screenTitle}>Cart</Text>
    {/* Implement cart functionality here */}
  </View>
);

const ProfileScreen = ({ route }) => {
  const  name  = "damm Name";
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

// Custom drawer content





const Tab = createBottomTabNavigator();

const DashboardTabs = ({ route }) => {
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
          } else if (route.name === 'Notification') {
            iconName = focused ? 'notifications' : 'notifications-outline';
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
      <Tab.Screen name="Home" component={HomeScreen} initialParams={route.params} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} initialParams={route.params} />
      <Tab.Screen name="Notification" component={NotificationScreen} />
    </Tab.Navigator>
  );
};

const UserDashboardScreen = ({ route }) => {
  return (
    <SafeAreaView style={styles.container}>
      
      <DashboardTabs route={route} />
    </SafeAreaView>
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
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
    flex: 1,
    borderRadius: 10,
    padding: 15,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  serviceInfo: {
    color: "#fff",
    fontSize: 14,
  },
  statusIcon: {
    fontSize: 24,
    color: "#fff",
    marginTop: 5,
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a2a6c',
  },
  screenTitle: {
    fontSize: 24,
    color: '#fff',
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
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  navbarProfileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  navbarProfileName: {
    color: '#fff',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  navbarSearch: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 10,
  },
  drawerHeader: {
    padding: 20,
    alignItems: 'center',
  },
  drawerProfileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  drawerProfileName: {
    color: '#fff',
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default UserDashboardScreen;
