import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

function App() {
	return <AppNavigator />;
}

AppRegistry.registerComponent(appName, () => App);

export default App;
