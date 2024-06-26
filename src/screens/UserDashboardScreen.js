import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LineChart } from "react-native-chart-kit";

const services = [
  { id: '1', name: 'Luxury Spa', status: 'pending', orderDate: '2024-06-26', price: 150 },
  { id: '2', name: 'Gourmet Dinner', status: 'shipped', orderDate: '2024-06-25', price: 200 },
  { id: '3', name: 'Adventure Trek', status: 'processing', orderDate: '2024-06-24', price: 100 },
  { id: '4', name: 'Art Workshop', status: 'pending', orderDate: '2024-06-27', price: 80 },
  { id: '5', name: 'Yacht Cruise', status: 'shipped', orderDate: '2024-06-28', price: 300 },
  { id: '6', name: 'Wine Tasting', status: 'processing', orderDate: '2024-06-29', price: 120 },
];

const UserDashboardScreen = ({ navigation, route }) => {
  const { name } = route.params;
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredServices = selectedStatus === 'all' 
    ? services 
    : services.filter(service => service.status === selectedStatus);

  const renderServiceItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.serviceCard, getStatusColor(item.status)]}
      onPress={() => navigation.navigate("ProductDetailScreen", {
        productName: item.name,
        orderDate: item.orderDate,
        status: item.status,
        price: item.price
      })}
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
      <View style={styles.content}>
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
          <TouchableOpacity 
            style={[styles.filterButton, selectedStatus === 'all' && styles.activeFilter]}
            onPress={() => setSelectedStatus('all')}
          >
            <Text style={styles.filterText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, selectedStatus === 'pending' && styles.activeFilter]}
            onPress={() => setSelectedStatus('pending')}
          >
            <Text style={styles.filterText}>Pending</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, selectedStatus === 'shipped' && styles.activeFilter]}
            onPress={() => setSelectedStatus('shipped')}
          >
            <Text style={styles.filterText}>Shipped</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, selectedStatus === 'processing' && styles.activeFilter]}
            onPress={() => setSelectedStatus('processing')}
          >
            <Text style={styles.filterText}>Processing</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredServices}
          renderItem={renderServiceItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.servicesList}
          numColumns={2}
        />
      </View>
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
});

export default UserDashboardScreen;
