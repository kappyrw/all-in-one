import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Navbar = ({ name, profileImage }) => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!isMenuOpen);

    return (
        <View>
            <View style={styles.navbar}>
                <View style={styles.profileSection}>
                    <Image source={{ uri: profileImage }} style={styles.profileImage} />
                    <Text style={styles.profileName}>{name}</Text>
                </View>
                <View style={styles.searchSection}>
                    <TextInput style={styles.searchInput} placeholder="Search..." placeholderTextColor="#aaa" />
                    <Ionicons name="search" size={24} color="#aaa" />
                </View>
                <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
                    <Ionicons name="menu" size={30} color="#fff" />
                </TouchableOpacity>
            </View>
            {isMenuOpen && (
                <View style={styles.sideMenu}>
                    {[
                        { name: 'Home', icon: 'home' },
                        { name: 'Chart', icon: 'bar-chart' },
                        { name: 'Notification', icon: 'notifications' },
                        { name: 'Status', icon: 'stats-chart' },
                        { name: 'Profile', icon: 'person' },
                        { name: 'Settings', icon: 'settings' },
                        { name: 'Logout', icon: 'log-out' },
                    ].map((item, index) => (
                        <TouchableOpacity key={index} style={styles.menuItem}>
                            <Ionicons name={item.icon} size={24} color="#fff" />
                            <Text style={styles.menuItemText}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1a2a6c',
        padding: 10,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    profileName: {
        color: '#fff',
        fontSize: 16,
    },
    searchSection: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#333',
        borderRadius: 20,
        paddingHorizontal: 10,
        marginHorizontal: 10,
    },
    searchInput: {
        flex: 1,
        color: '#fff',
    },
    menuButton: {
        padding: 5,
    },
    sideMenu: {
        backgroundColor: '#1a2a6c',
        padding: 10,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    menuItemText: {
        color: '#fff',
        fontSize: 18,
        marginLeft: 10,
    },
});

export default Navbar;
