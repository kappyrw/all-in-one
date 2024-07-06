

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

const categoryIcons = {
  cars: 'directions-car',
  auto_spare_part: 'build',
  tech_gadget: 'devices',
  other: 'category'
};

function OrderScreen({ navigation }) {
  const [category, setCategory] = useState('');
  const [formData, setFormData] = useState({});

  const [showCategories, setShowCategories] = useState(false);

  const categories = [
    { label: 'Cars', value: 'cars', icon: 'directions-car' },
    { label: 'Auto Spare Part', value: 'auto_spare_part', icon: 'build' },
    { label: 'Tech Gadget', value: 'tech_gadget', icon: 'devices' },
    { label: 'Other', value: 'other', icon: 'category' },
  ];

  const handleCategorySelect = (value) => {
    setCategory(value);
    setShowCategories(false);

    setFormData({});
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const renderForm = () => {
    switch (category) {
      case 'cars':
        return (
          <>
            <FormInput icon="directions-car" placeholder="Mark" onChangeText={(value) => handleInputChange('mark', value)} />
            <FormInput icon="local-offer" placeholder="Model" onChangeText={(value) => handleInputChange('model', value)} />
            <FormInput icon="date-range" placeholder="Year of manufacture" onChangeText={(value) => handleInputChange('year', value)} />
            <FormInput icon="description" placeholder="Order Details" onChangeText={(value) => handleInputChange('details', value)} multiline />
          </>
        );
      case 'auto_spare_part':
        return (
          <>
            <FormInput icon="directions-car" placeholder="Mark" onChangeText={(value) => handleInputChange('mark', value)} />
            <FormInput icon="local-offer" placeholder="Model" onChangeText={(value) => handleInputChange('model', value)} />
            <FormInput icon="date-range" placeholder="Year of manufacture" onChangeText={(value) => handleInputChange('year', value)} />
            <FormInput icon="confirmation-number" placeholder="Chassis Number" onChangeText={(value) => handleInputChange('chassis', value)} />
            <FormInput icon="build" placeholder="Spare Part Name" onChangeText={(value) => handleInputChange('partName', value)} />
            <FormInput icon="code" placeholder="Spare Part Code Number" onChangeText={(value) => handleInputChange('partCode', value)} />

            <TouchableOpacity style={styles.uploadButton} onPress={() => { }}>

              <Icon name="cloud-upload" size={24} color="#fff" />
              <Text style={styles.uploadButtonText}>Upload Picture</Text>
            </TouchableOpacity>
            <FormInput icon="description" placeholder="Order Details" onChangeText={(value) => handleInputChange('details', value)} multiline />
          </>
        );
      case 'tech_gadget':
        return (
          <>
            <FormInput icon="devices" placeholder="Item" onChangeText={(value) => handleInputChange('item', value)} />
            <FormInput icon="settings" placeholder="Specification" onChangeText={(value) => handleInputChange('specification', value)} multiline />
          </>
        );
      case 'other':
        return (
          <>
            <FormInput icon="shopping-basket" placeholder="Item" onChangeText={(value) => handleInputChange('item', value)} />
            <FormInput icon="settings" placeholder="Specification" onChangeText={(value) => handleInputChange('specification', value)} />
            <FormInput icon="description" placeholder="Description" onChangeText={(value) => handleInputChange('description', value)} multiline />
          </>
        );
      default:
        return null;
    }
  };

  const handleSubmit = () => {
    console.log(formData);
    // Here you would typically send the order data to your backend
    // For now, we'll just navigate back to the home screen
    navigation.navigate('HomeScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Create Your Order</Text>
          <Text style={styles.subHeaderText}>Select a category and fill in the details</Text>
        </View>



        <View style={styles.categoryContainer}>
          <Text style={styles.label}>Select Order Category:</Text>
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setShowCategories(!showCategories)}
          >
            <Text style={styles.dropdownButtonText}>
              {category ? categories.find(c => c.value === category).label : 'Choose a category'}
            </Text>
            <Icon name={showCategories ? 'arrow-drop-up' : 'arrow-drop-down'} size={24} color="#1a2a6c" />
          </TouchableOpacity>

          {showCategories && (
            <View style={styles.dropdownList}>
              {categories.map((item) => (
                <TouchableOpacity
                  key={item.value}
                  style={styles.dropdownItem}
                  onPress={() => handleCategorySelect(item.value)}
                >
                  <Icon name={item.icon} size={24} color="#1a2a6c" style={styles.dropdownItemIcon} />
                  <Text style={styles.dropdownItemText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

        </View>

        {category && (
          <View style={styles.formContainer}>
            <View style={styles.categoryIconContainer}>
              <Icon name={categoryIcons[category]} size={40} color="#1a2a6c" />
            </View>
            {renderForm()}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit Order</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

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

export default OrderScreen;
