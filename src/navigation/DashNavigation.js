import 'react-native-gesture-handler'; // Make sure this is at the top if using gesture-handler
import 'react-native-reanimated';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UserDashboardScreen from '../screens/UserDashboardScreen';
import NotificationScreen from '../screens/NotificationScreen';

const Drawer = createDrawerNavigator();

const user = { name: 'John Doe', profileImage: null };

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.drawerHeader}>
                <Image
                    source={user.profileImage ? { uri: user.profileImage } : require('../../assets/images/mine.png')}
                    style={styles.drawerProfileImage}
                />
                <Text style={styles.drawerProfileName}>{user.name}</Text>
            </View>
            <DrawerItem
                label="Home"
                icon={({ color, size }) => <Ionicons name="home" color={color} size={size} />}
                onPress={() => props.navigation.navigate('Home')}
            />
            <DrawerItem
                label="Chart"
                icon={({ color, size }) => <Ionicons name="cart" color={color} size={size} />}
                onPress={() => props.navigation.navigate('Cart')}
            />
            <DrawerItem
                label="Notification"
                icon={({ color, size }) => <Ionicons name="notifications" color={color} size={size} />}
                onPress={() => props.navigation.navigate('Notification')}
            />
            <DrawerItem
                label="Status"
                icon={({ color, size }) => <Ionicons name="stats-chart" color={color} size={size} />}
                onPress={() => props.navigation.navigate('Status')}
            />
            <DrawerItem
                label="Profile"
                icon={({ color, size }) => <Ionicons name="person" color={color} size={size} />}
                onPress={() => props.navigation.navigate('Profile')}
            />
            <DrawerItem
                label="Settings"
                icon={({ color, size }) => <Ionicons name="settings" color={color} size={size} />}
                onPress={() => props.navigation.navigate('Settings')}
            />
            <DrawerItem
                label="Logout"
                icon={({ color, size }) => <Ionicons name="log-out" color={color} size={size} />}
                onPress={() => {/* Implement logout functionality */ }}
            />
        </DrawerContentScrollView>
    );
}

function CustomHeader({ navigation }) {
    return (
        <SafeAreaView >
        <View style={styles.navbar}>
            
            <View style={styles.navbarCenter}>
                <Image source={user.profileImage ? { uri: user.profileImage } : require('../../assets/images/mine.png')} style={styles.navbarProfileImage} />
                <Text style={styles.navbarProfileName}>{user.name}</Text>
            </View>
            <TextInput style={styles.navbarSearch} placeholder="Search" placeholderTextColor="#ccc" />
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Ionicons name="menu" size={30} color="#fff" />
                </TouchableOpacity>
        </View>
        </SafeAreaView >
    );
}

export default function DashNavigation() {
    return (
        
            <Drawer.Navigator
                drawerContent={props => <CustomDrawerContent {...props} />}
                screenOptions={{ headerShown: false }}
            >
                <Drawer.Screen name="UserDashboardScreen">
                    {props => (
                        <View style={{ flex: 1 }}>
                            <CustomHeader {...props} />
                            <UserDashboardScreen {...props} />
                        </View>
                    )}
                </Drawer.Screen>
                <Drawer.Screen name="Notification">
                    {props => (
                        <View style={{ flex: 1 }}>
                            <CustomHeader {...props} />
                            <NotificationScreen {...props} />
                        </View>
                    )}
                </Drawer.Screen>
            <Drawer.Screen name="Cart">
                    {props => (
                        <View style={{ flex: 1 }}>
                            <CustomHeader {...props} />
                            {/* <NotificationScreen {...props} /> */}
                        </View>
                    )}
                </Drawer.Screen>
            </Drawer.Navigator>
       
    );
}

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#1a2a6c',
        paddingHorizontal: 10,
        paddingVertical: 15,
    },
    navbarCenter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    navbarProfileImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
    },
    navbarProfileName: {
        color: '#fff',
        fontWeight: 'bold',
    },
    navbarSearch: {
        flex: 1,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingHorizontal: 10,
        marginLeft: 10,
    },
    drawerHeader: {
        padding: 20,
        alignItems: 'center',
    },
    drawerProfileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    drawerProfileName: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
});
