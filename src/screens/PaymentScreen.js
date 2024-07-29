import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import la1 from "../../assets/images/la1.jpeg";
import la2 from "../../assets/images/la2.jpeg";
import la3 from "../../assets/images/la3.jpeg";
import la4 from "../../assets/images/la4.jpeg";
import la5 from "../../assets/images/la5.jpeg";
import la6 from "../../assets/images/la6.jpeg";

const PaymentScreen = ({ route }) => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [formData, setFormData] = useState({});
    const { amount, productName,image } = route.params; // Assuming amount is passed via route params
    ;
    const handlePaymentMethodSelect = (method) => {
        setSelectedPaymentMethod(method);
        setFormData({});
    };

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const renderPaymentForm = () => {
        switch (selectedPaymentMethod) {
            case "MTN Mobile Money":
                return (
                    <View>
                        <Text style={styles.label}>Mobile Number</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Mobile Number"
                            onChangeText={(text) => handleInputChange("mobileNumber", text)}
                            keyboardType="numeric"
                            value={formData.mobileNumber}
                        />
                    </View>
                );
            case "Airtel Money":
                return (
                    <View>
                        <Text style={styles.label}>Mobile Number</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Mobile Number"
                            onChangeText={(text) => handleInputChange("mobileNumber", text)}
                            keyboardType="numeric"
                            value={formData.mobileNumber}
                        />
                    </View>
                );
            case "Credit Card":
                return (
                    <View>
                        <Text style={styles.label}>Card Number</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Card Number"
                            onChangeText={(text) => handleInputChange("cardNumber", text)}
                            keyboardType="numeric"
                            value={formData.cardNumber}
                        />
                        <Text style={styles.label}>CVC</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter CVC"
                            onChangeText={(text) => handleInputChange("cvc", text)}
                            keyboardType="numeric"
                            value={formData.cvc}
                        />
                        <Text style={styles.label}>Card Holder Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Card Holder Name"
                            onChangeText={(text) => handleInputChange("cardHolderName", text)}
                            value={formData.cardHolderName}
                        />
                        <Text style={styles.label}>Expiration Date</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="MM/YY"
                            onChangeText={(text) => handleInputChange("expirationDate", text)}
                            value={formData.expirationDate}
                        />
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.shadowContainter}>
                <Text style={styles.title}>Payment</Text>
                    {/* <Image source={Myimage} style={styles.serviceImage} /> */}
                    <Image source={image} style={styles.productImage} />
                    <Text style={styles.amountText}>Your Product: <Text style={styles.contentLabel}>{productName}</Text></Text>
                    <Text style={styles.amountText}>Amount to be paid:<Text style={styles.contentLabel}>{amount}</Text></Text>
                <Text style={styles.subtitle}>Select Payment Method</Text>
                <View style={styles.paymentMethodsContainer}>
                    <TouchableOpacity
                        style={[styles.paymentMethodButton, styles.mtnButton]}
                        onPress={() => handlePaymentMethodSelect("MTN Mobile Money")}
                    >
                        <FontAwesome name="mobile-phone" size={24} color="white" style={styles.icon} />
                        <Text style={styles.paymentMethodText}> MoMo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.paymentMethodButton, styles.airtelButton]}
                        onPress={() => handlePaymentMethodSelect("Airtel Money")}
                    >
                        <MaterialCommunityIcons name="cellphone" size={24} color="white" style={styles.icon} />
                        <Text style={styles.paymentMethodText}>Airtel Money</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.paymentMethodButton, styles.creditCardButton]}
                        onPress={() => handlePaymentMethodSelect("Credit Card")}
                    >
                        <AntDesign name="creditcard" size={24} color="white" style={styles.icon} />
                        <Text style={styles.paymentMethodText}>Credit Card</Text>
                    </TouchableOpacity>
                </View>
                

                </View>
                {selectedPaymentMethod && (
                    <View style={styles.formContainer}>
                        <Text style={styles.formTitle}>{selectedPaymentMethod} Payment Form</Text>
                        {renderPaymentForm()}
                        <TouchableOpacity style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Submit Payment</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    contentContainer: {
        padding: 20,
    },
    shadowContainter:
    {
        // backgroundColor: "#fad",
        // borderColor: "#ccc",
        // iOS shadow properties
        padding:10,
        shadowColor: "#ccc",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        // Android shadow properties
        elevation: 5,
        borderRadius:20,
    },
    productImage: {
        display:"flex",
       
        width: "99%",
        height: 200,
        padding:"20%",
        resizeMode: 'cover',
        marginBottom: 20,
        borderRadius: 20,
        
        
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    amountText: {
        fontSize: 18,
        textAlign: "center",
        marginBottom: 20,
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
    },
    paymentMethodsContainer: {
        flexDirection: "row",
        
        justifyContent: "center",
        marginBottom: 20,
        marginTop:1,
        // flexWrap:"wrap"
    },
    paymentMethodButton: {
        flexDirection: "row",

        alignItems: "center",
        padding: 15,
        borderRadius: 10,
        width: 100,
        height:70,
        marginRight:5,

        justifyContent: "center",
    },
    mtnButton: {
        backgroundColor: "#ffdd00",
    },
    airtelButton: {
        backgroundColor: "#d32f2f",
    },
    creditCardButton: {
        backgroundColor: "skyblue",
    },
    icon: {
        marginRight: 10,
    },
    paymentMethodText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
    },
    formContainer: {
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
    },
    formTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 5,
    },
    contentLabel: {
        fontSize: 25,
        fontWeight: "300",
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingLeft: 10,
    },
    submitButton: {
        backgroundColor: "#1a2a6c",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    submitButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default PaymentScreen;
