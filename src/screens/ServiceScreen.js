import React from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


function ServiceScreen() {
  return (
    <SafeAreaView>

      <View style={styles.header}>
          <Text style={styles.headerText}>Choose Your  Service </Text>
          <Text style={styles.subHeaderText}>Select Your service Category</Text>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f2f5',
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
    categoryContainer: {
        backgroundColor: '#fff',
        margin: 15,
        borderRadius: 10,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1a2a6c',
        marginBottom: 10,
    },

    dropdownButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#1a2a6c',
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#fff',
    },
    dropdownButtonText: {
        fontSize: 16,
        color: '#1a2a6c',
    },
    dropdownList: {
        marginTop: 5,
        borderWidth: 1,
        borderColor: '#1a2a6c',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    dropdownItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    dropdownItemIcon: {
        marginRight: 10,
    },
    dropdownItemText: {
        fontSize: 16,

        color: '#1a2a6c',
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
    categoryIconContainer: {
        alignItems: 'center',
        marginBottom: 20,
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
    uploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1a2a6c',
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
    },
    uploadButtonText: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 10,
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

export default ServiceScreen