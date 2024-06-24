import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const pendingServices = [
  { id: '1', name: 'Pending Service 1', status: 'pending', orderDate: '2024-06-26' },
  { id: '2', name: 'Pending Service 2', status: 'pending', orderDate: '2024-06-27' },
];

const shippedServices = [
  { id: '3', name: 'Shipped Service 1', status: 'shipped', orderDate: '2024-06-25' },
  { id: '4', name: 'Shipped Service 2', status: 'shipped', orderDate: '2024-06-28' },
];

const processingServices = [
  { id: '5', name: 'Processing Service 1', status: 'processing', orderDate: '2024-06-24' },
  { id: '6', name: 'Processing Service 2', status: 'processing', orderDate: '2024-06-29' },
];

const UserDashboardScreen = ({ navigation, route }) => {
  const { name } = route.params;

  const renderServiceItem = ({ item }) => (
    <TouchableOpacity
      style={styles.serviceCard}
      onPress={() => navigation.navigate("ProductDetailScreen", {
        productName: item.name,
        orderDate: item.orderDate,
        // Add more parameters as needed
      })}
    >
      <Text style={styles.serviceName}>{item.name}</Text>
      <Text style={styles.statusIcon}>{renderStatusIcon(item.status)}</Text>
    </TouchableOpacity>
  );

  const renderStatusIcon = (status) => {
    let icon;
    switch (status) {
      case 'pending':
        icon = '⏳'; // Hourglass or loading icon for pending
        break;
      case 'shipped':
        icon = '📦'; // Package icon for shipped
        break;
      case 'processing':
        icon = '⚙️'; // Gear icon for processing
        break;
      default:
        icon = '';
    }
    return icon;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome, {name}!</Text>
        
        <Text style={styles.subtitle}>Pending Services</Text>
        <FlatList
          key="pending"
          data={pendingServices}
          renderItem={renderServiceItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.servicesList}
          numColumns={2} // Display two columns
        />

        <Text style={styles.subtitle}>Shipped Services</Text>
        <FlatList
          key="shipped"
          data={shippedServices}
          renderItem={renderServiceItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.servicesList}
          numColumns={2} // Display two columns
        />

        <Text style={styles.subtitle}>Processing Services</Text>
        <FlatList
          key="processing"
          data={processingServices}
          renderItem={renderServiceItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.servicesList}
          numColumns={2} // Display two columns
        />
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
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: "#fff",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 22,
    color: "#fff",
    marginBottom: 10,
  },
  servicesList: {
    flexGrow: 1,
  },
  serviceCard: {
    flex: 1,
    backgroundColor: "#F9A826",
    borderRadius: 10,
    padding: 20,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statusIcon: {
    fontSize: 24,
    color: "#fff",
    marginTop: 10,
  },
});

export default UserDashboardScreen;
