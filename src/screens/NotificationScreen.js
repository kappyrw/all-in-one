import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const NotificationScreen = () => {
    const initialNotifications = [
        { id: '1', title: 'Order Confirmed', message: 'Your order has been confirmed successfully!' },
        { id: '2', title: 'Payment Successful', message: 'Your payment was processed successfully.' },
        // Add more notifications as needed
    ];

    const [notifications, setNotifications] = useState(initialNotifications);

    const handleDeleteNotification = (id) => {
        setNotifications(notifications.filter(notification => notification.id !== id));
    };

    const renderNotification = ({ item }) => (
        <View style={styles.notificationCard}>
            <View style={styles.notificationContent}>
                <Text style={styles.notificationTitle}>{item.title}</Text>
                <Text style={styles.notificationMessage}>{item.message}</Text>
            </View>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteNotification(item.id)}
            >
                <Ionicons name="trash" size={24} color="red" />
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}> Notifications</Text>
            {notifications.length === 0 ? (
                <Text style={styles.noNotificationsMessage}>You have no notifications Yet.</Text>
            ) : (
                <FlatList
                    data={notifications}
                    renderItem={renderNotification}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.notificationsList}
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a2a6c',
        padding: 20,
    },
    heading: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    noNotificationsMessage: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
    notificationsList: {
        padding: 20,
    },
    notificationCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 5,
    },
    notificationContent: {
        flex: 1,
    },
    notificationTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    notificationMessage: {
        fontSize: 14,
    },
    deleteButton: {
        marginLeft: 10,
    },
});

export default NotificationScreen;
