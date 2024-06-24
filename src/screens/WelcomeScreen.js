import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";

const WelcomeScreen = ({ navigation, route }) => {
  const { productName } = route.params;

  const images = {
    mine: require("../../assets/images/mine.png"),
    g1: require("../../assets/images/g1.png"),
    g2: require("../../assets/images/g2.png"),
    g3: require("../../assets/images/g3.png"),
    g4: require("../../assets/images/g4.png"),
    g5: require("../../assets/images/g5.png"),
    p4: require("../../assets/images/p4.png"),
    messi: require("../../assets/images/messi.png"),
    g6: require("../../assets/images/g6.png"),
    p6: require("../../assets/images/p6.png"),
    g8: require("../../assets/images/g8.png"),
    p7: require("../../assets/images/p7.png"),
    g7: require("../../assets/images/g7.png"),
    p9: require("../../assets/images/p9.png"),
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={images.mine} style={styles.backgroundImage} />
      <View style={styles.overlay}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to {productName}</Text>
          <Text style={styles.subtitle}>We will send your package or anything to your destination</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("SignUpScreen")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Fungura</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("SignInScreen")}
            style={styles.buttonAlt}
          >
            <Text style={styles.buttonText}>Injira</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.footerText}>By joining you agree to our Terms of Service and Privacy Policy</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: 'center',
  },
  subtitle: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: "#F9A826", // Adjusted color to match the image
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginHorizontal: 10,
  },
  buttonAlt: {
    backgroundColor: "#005555", // Adjusted color to match the image
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "700",
  },
  footerText: {
    color: "#ffffff",
    fontSize: 12,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default WelcomeScreen;
