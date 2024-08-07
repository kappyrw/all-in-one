import React, { useState } from 'react';
import { View, Text, TextInput, Image,TouchableOpacity, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import logistics from "../../assets/images/serviceImage/logistics.jpeg";
import technology from "../../assets/images/serviceImage/technology.jpeg";
import Autoshopa3 from "../../assets/images/serviceImage/Autoshop.jpeg";
import realEstate from "../../assets/images/serviceImage/realEstate.jpeg";
import la5 from "../../assets/images/la5.jpeg";
import la6 from "../../assets/images/la6.jpeg";

import imcLogZoomed from "../../assets/imcLogZoomed.png";
import { Ionicons } from "@expo/vector-icons";
const services = [
    {
        title: 'Logistic & Shipping',
        image: logistics,
    },
    {
        title: 'Technological Services',
        image: technology,
    },
    {
        title: 'Autoshop Services',
        image: Autoshopa3,
    },
    {
        title: 'Real Estate',
        image: realEstate,
    },
];



const ServiceScreen = (navigation, {route}) => {
    const [selectedService, setSelectedService] = useState(null);
    const [cart, setCart] = useState([]);

    const handleServiceSelect = (service) => {
        setSelectedService(selectedService === service ? null : service);
    };
    const navigateToCart = () => {
        navigation.navigate("CartScreen", { cart: cart });
    };
    return (
        <SafeAreaView style={styles.container}>
            
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Choose Your Service</Text>
                    <Text style={styles.subHeaderText}>Select Your Service Category</Text>
                </View>

                {services.map((service, index) => (
                    <View key={index} style={styles.serviceContainer}>
                        <TouchableOpacity style={styles.card} onPress={() => handleServiceSelect(service)}>
                            <ImageBackground source={service.image} style={styles.cardImage} imageStyle={{ borderRadius: 10 }}>
                                <View style={styles.cardContent}>
                                    <Text style={styles.cardTitle}>{service.title}</Text>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                        {selectedService === service && (
                            <View style={styles.formContainer}>
                                <Text style={styles.formTitle}>Apply for {selectedService.title}</Text>
                                <Form />
                            </View>
                        )}
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const Form = () => {
    const [formData, setFormData] = useState({});

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = () => {
        console.log(formData);
        // Handle form submission here
    };

    return (
        <>
            <FormInput icon="person" placeholder="Name" onChangeText={(value) => handleInputChange('name', value)} />
            <FormInput icon="phone" placeholder="Phone Number" onChangeText={(value) => handleInputChange('phone', value)} />
            <FormInput icon="email" placeholder="Email" onChangeText={(value) => handleInputChange('email', value)} />
            <FormInput icon="description" placeholder="Details" onChangeText={(value) => handleInputChange('details', value)} multiline />
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit Application</Text>
            </TouchableOpacity>
        </>
    );
};

const FormInput = ({ icon, placeholder, onChangeText, multiline = false }) => (
    <View style={styles.inputContainer}>
        <Icon name={icon} size={24} color="#1a2a6c" style={styles.inputIcon} />
        <TextInput
            style={[styles.input, multiline && styles.multilineInput]}
            placeholder={placeholder}
            onChangeText={onChangeText}
            placeholderTextColor="#666"
            multiline={multiline}
        />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f2f5',
    },
    header2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        color: "#1a2a6c",
        backgroundColor: "#fff",
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
        backgroundColor: "#fcc",
        size: 20,
    },

    cartIndicator: {
        // position: 'absolute',
        display: "flex",
        flexDirection: "row",
        // top: 40,
        // right: 20,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 20,
    },
    cartIndicatorText: {
        color: '#1a2a6c',
        fontWeight: 'bold',
    },
    logoImage: {
        width: 60,
        height: 40,
        borderRadius: 20,
    },
    header: {
        backgroundColor: '#1a2a6c',
        padding: 20,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
    },
    subHeaderText: {
        fontSize: 16,
        color: '#fff',
        marginTop: 5,
    },
    serviceContainer: {
        marginBottom: 15,
    },
    card: {
        margin: 15,
        borderRadius: 10,
        overflow: 'hidden',
    },
    cardImage: {
        height: 200,
        justifyContent: 'center',
    },
    cardContent: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20,
        borderRadius: 10,
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    formContainer: {
        backgroundColor: '#fff',
        margin: 15,
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    formTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#1a2a6c',
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
    },
    inputIcon: {
        padding: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 10,
        paddingRight: 10,
        fontSize: 16,
        color: '#333',
    },
    multilineInput: {
        minHeight: 100,
        textAlignVertical: 'top',
    },
    submitButton: {
        backgroundColor: '#1a2a6c',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ServiceScreen;
