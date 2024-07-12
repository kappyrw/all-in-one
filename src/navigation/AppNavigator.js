import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import SignUpScreen from "../screens/SignUpScreen";
import SignInScreen from "../screens/SignInScreen";
import AccountCreatedScreen from "../screens/AccountCreatedScreen";
import UserDashboardScreen from "../screens/UserDashboardScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import HomeScreen from "../screens/HomeScreen";
import ProductListingScreen from "../screens/ProductListingScreen";
import OrderScreen from "../screens/OrderScreen";
import ServiceScreen from "../screens/ServiceScreen";



const Stack = createNativeStackNavigator();
const AppNavigator = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
			    <Stack.Screen name="HomeScreen" component={HomeScreen} />
				<Stack.Screen name="ProductListingScreen" component={ProductListingScreen} />
				<Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
				<Stack.Screen name="SignUpScreen" component={SignUpScreen} />
				<Stack.Screen name="SignInScreen" component={SignInScreen} />
				<Stack.Screen name="AccountCreatedScreen" component={AccountCreatedScreen} />
				<Stack.Screen name="UserDashboardScreen" component={UserDashboardScreen} />
				<Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
				<Stack.Screen name="OrderScreen" component={OrderScreen} />
				<Stack.Screen name="ServiceScreen" component={ServiceScreen} />
			
				
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppNavigator;

const styles = StyleSheet.create({});
