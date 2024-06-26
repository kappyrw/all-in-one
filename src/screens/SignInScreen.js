import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';

const SignInScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [animation] = useState(new Animated.Value(0));

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignIn = () => {
    const { name, email, password } = form;

    if (!name || !email || !password) {
      Alert.alert("Oops!", "All fields are required for your adventure");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Hold on!", "That email doesn't look quite right");
      return;
    }

    console.log("Embarking on a journey", form);

    // Animate before navigation
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate("UserDashboardScreen", { name: form.name });
    });
  };

  const inputScale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.9],
  });

  return (
    <LinearGradient colors={['#1a2a6c', '#005555']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Animated.View style={[styles.formContainer, { transform: [{ scale: inputScale }] }]}>
            <Text style={styles.title}>Welcome Back, Explorer!</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Your Name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Eric Uwanyagasani"
                placeholderTextColor="#aaa"
                value={form.name}
                onChangeText={(text) => handleChange("name", text)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="your@email.com"
                placeholderTextColor="#aaa"
                keyboardType="email-address"
                value={form.email}
                onChangeText={(text) => handleChange("email", text)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Secret Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Shh... it's a secret"
                placeholderTextColor="#aaa"
                secureTextEntry
                value={form.password}
                onChangeText={(text) => handleChange("password", text)}
              />
            </View>
            
            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
              <Text style={styles.buttonText}>Tangira Urugendo Rwawe</Text>
            </TouchableOpacity>
          
            <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")}>
              <Text style={styles.switchText}>New Explorer? Create Your Map</Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  formContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: "#fff",
    marginBottom: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputLabel: {
    color: '#F9A826',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#fff',
  },
  button: {
    width: "100%",
    backgroundColor: "#F9A826",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    marginVertical: 20,
  },
  buttonText: {
    color: "#1a2a6c",
    fontSize: 18,
    fontWeight: "700",
  },
  switchText: {
    color: "#F9A826",
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default SignInScreen;
