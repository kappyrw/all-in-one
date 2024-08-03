import 'react-native-gesture-handler'; // Make sure this is at the top if using gesture-handler
import 'react-native-reanimated';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UserDashboardScreen from '../screens/UserDashboardScreen';
import NotificationScreen from '../screens/NotificationScreen';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.drawerHeader}>
                <Image
                    source={require('../../assets/images/mine.png')}
                    style={styles.drawerProfileImage}
                />
                <Text style={styles.drawerProfileName}>User Name</Text>
            </View>
            <DrawerItem
                label="Home"
                icon={({ color, size }) => <Ionicons name="home" color={color} size={size} />}
                onPress={() => props.navigation.navigate('Home')}
            />
            <DrawerItem
                label="Chart"
                icon={({ color, size }) => <Ionicons name="bar-chart" color={color} size={size} />}
                onPress={() => props.navigation.navigate('Chart')}
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

export default function DashNavigation() {
    return (
        <NavigationContainer>
            <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
                <Drawer.Screen name="Home" component={UserDashboardScreen} />
                <Drawer.Screen name="Notification" component={NotificationScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
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
