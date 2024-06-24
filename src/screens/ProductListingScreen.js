import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProductListingScreen = ({ navigation }) => {
  const products = [
    { id: '1', name: 'Product 1' },
    { id: '2', name: 'Product 2' },
    { id: '3', name: 'Product 3' },
    // Add more products as needed
  ];

  const navigateToWelcomeScreen = (productName) => {
    navigation.navigate("WelcomeScreen", { productName });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Product Listing</Text>
        {products.map(product => (
          <TouchableOpacity
            key={product.id}
            style={styles.productCard}
            onPress={() => navigateToWelcomeScreen(product.name)}
          >
            <Text style={styles.productName}>{product.name}</Text>
          </TouchableOpacity>
        ))}
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
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 20,
  },
  productCard: {
    backgroundColor: "#F9A826",
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
  },
  productName: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ProductListingScreen;
