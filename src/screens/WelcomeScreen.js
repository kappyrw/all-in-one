import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, Animated, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";

const { width } = Dimensions.get('window');

const WelcomeScreen = ({ navigation, route }) => {
  const { productName } = route.params;
  const [fadeAnim] = useState(new Animated.Value(0));

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

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={images.mine} style={styles.backgroundImage} />
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to</Text>
          <Text style={styles.productName}>{productName}</Text>
          <Text style={styles.subtitle}>Order anything, anytime, anywhere</Text>
        </View>
        <View style={styles.featuresContainer}>
          <FeatureItem icon="shoppingcart" text="Wide Selection" />
          <FeatureItem icon="clockcircle" text="Fast Delivery" />
          <FeatureItem icon="star" text="Top Quality" />
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("SignUpScreen")}
            style={[styles.button, styles.signUpButton]}
          >
            <Text style={styles.buttonText}>Fungura</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("SignInScreen")}
            style={[styles.button, styles.signInButton]}
          >
            <Text style={styles.buttonText}>Injira</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.footerText}>By joining you agree to our Terms of Service and Privacy Policy</Text>
      </Animated.View>
    </SafeAreaView>
  );
};

const FeatureItem = ({ icon, text }) => (
  <View style={styles.featureItem}>
    <AntDesign name={icon} size={24} color="#F9A826" />
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

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
    backgroundColor: 'rgba(0, 85, 85, 0.8)',
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
    fontSize: 32,
    fontWeight: "bold",
    textAlign: 'center',
  },
  productName: {
    color: "#F9A826",
    fontSize: 40,
    fontWeight: "bold",
    textAlign: 'center',
    marginVertical: 10,
  },
  subtitle: {
    color: "#ffffff",
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 40,
  },
  featureItem: {
    alignItems: 'center',
  },
  featureText: {
    color: "#ffffff",
    marginTop: 5,
    fontSize: 14,
  },
  buttonsContainer: {
    width: '100%',
    marginTop: 20,
  },
  button: {
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  signUpButton: {
    backgroundColor: "#F9A826",
  },
  signInButton: {
    backgroundColor: "#ffffff",
  },
  buttonText: {
    fontSize: 18,
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