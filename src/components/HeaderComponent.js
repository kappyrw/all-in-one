import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Header = ({ navigation }) => {
    return (
        <View style={styles.header}>
            <Image source={require('../../assets/imcLogZoomed.png')} style={styles.logoImage} />
            <Text style={styles.title}>IMC Ltd</Text>
            <Ionicons
                name="cart"
                size={22}
                color="#1a2a6c"
                style={styles.cartIcon}
                onPress={() => navigation.navigate('CartScreen')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    logoImage: {
        width: 60,
        height: 40,
        borderRadius: 20,
    },
    title: {
        fontSize: 28,
        color: '#1a2a6c',
        fontWeight: 'bold',
    },
    cartIcon: {
        backgroundColor: "#fff"
    },
});

export default Header;
