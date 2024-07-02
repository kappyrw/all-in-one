import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { t } from 'react-native-tailwindcss';

function OrderScreen() {
    const [category, setCategory] = useState('');
    const [formData, setFormData] = useState({});

    const handleCategoryChange = (value) => {
        setCategory(value);
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
                        <TextInput placeholder="Mark" style={styles.input} onChangeText={(value) => handleInputChange('mark', value)} />
                        <TextInput placeholder="Model" style={styles.input} onChangeText={(value) => handleInputChange('model', value)} />
                        <TextInput placeholder="Year of manufacture" style={styles.input} onChangeText={(value) => handleInputChange('year', value)} />
                        <TextInput placeholder="Order Details" style={styles.input} onChangeText={(value) => handleInputChange('details', value)} />
                    </>
                );
            case 'auto_spare_part':
                return (
                    <>
                        <TextInput placeholder="Mark" style={styles.input} onChangeText={(value) => handleInputChange('mark', value)} />
                        <TextInput placeholder="Model" style={styles.input} onChangeText={(value) => handleInputChange('model', value)} />
                        <TextInput placeholder="Year of manufacture" style={styles.input} onChangeText={(value) => handleInputChange('year', value)} />
                        <TextInput placeholder="Chassis Number" style={styles.input} onChangeText={(value) => handleInputChange('chassis', value)} />
                        <TextInput placeholder="Spare Part Name" style={styles.input} onChangeText={(value) => handleInputChange('partName', value)} />
                        <TextInput placeholder="Spare Part Code Number" style={styles.input} onChangeText={(value) => handleInputChange('partCode', value)} />
                        <Button title="Upload Picture" onPress={() => { }} />
                        <TextInput placeholder="Order Details" style={styles.input} onChangeText={(value) => handleInputChange('details', value)} />
                    </>
                );
            case 'tech_gadget':
                return (
                    <>
                        <TextInput placeholder="Item" style={styles.input} onChangeText={(value) => handleInputChange('item', value)} />
                        <TextInput placeholder="Specification" style={styles.input} onChangeText={(value) => handleInputChange('specification', value)} />
                    </>
                );
            case 'other':
                return (
                    <>
                        <TextInput placeholder="Item" style={styles.input} onChangeText={(value) => handleInputChange('item', value)} />
                        <TextInput placeholder="Specification" style={styles.input} onChangeText={(value) => handleInputChange('specification', value)} />
                        <TextInput placeholder="Description" style={styles.input} onChangeText={(value) => handleInputChange('description', value)} />
                    </>
                );
            default:
                return null;
        }
    };

    const handleSubmit = () => {
        console.log(formData);
    };

    return (
        <ScrollView contentContainerStyle={[t.p8, t.mT5, t.bgGray100]}>
            <View style={[t.bgBlue700, t.p4, t.rounded, t.shadowMd]}>
                <Text style={[t.textLg, t.fontBold, t.textWhite ,t.mB1]}>Select Order Category:</Text>
                <Picker
                    selectedValue={category}
                    onValueChange={handleCategoryChange}
                    style={[styles.pickerStyles]}
                    mode='dropdown'
                    dropdownIconColor={'black'}
                >
                    <Picker.Item label="Choose a category" value="" style={styles.pickerItem} />
                    <Picker.Item label="Cars" value="cars" style={[t.textBlack]} />
                    <Picker.Item label="Auto Spare Part" value="auto_spare_part" style={styles.pickerItem} />
                    <Picker.Item label="Tech" value="tech_gadget" style={styles.pickerItem} />
                    <Picker.Item label="Other" value="other" style={styles.pickerItem} />
                </Picker>
            </View>
            <View style={[t.bgWhite, t.p4, t.rounded, t.shadow2xl, t.mT5]}>
                {renderForm()}
                <Button title="Submit Order" onPress={handleSubmit} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
        color: 'black',
    },
    picker: {
        backgroundColor: '#e5e7eb',
        color: 'black',
        borderWidth: 2,
        borderColor: '#3b82f6',
        borderRadius: 5,
    },
    pickerItem: {
        color: 'black',
    },
    pickerStyles: {
        width: '100%',
        backgroundColor: 'white',
        color: 'white'
    }
});

export default OrderScreen;
