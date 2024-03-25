// Provides reusable modal component for displaying messages and user interactions for editing product actions

// Import necessary dependencies
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

// ModalEdit component definition
const ModalEdit = ({
  product,
  editProduct,
  editModalVisible,
  setEditModalVisible,
}) => {
  // State to handle edited product details
  const [editedProduct, setEditedProduct] = useState(product);
  
  // Function to handle product edit
  const handleEdit = () => {
    // Pass the edited product back to the parent component
    editProduct(editedProduct);
    // Close the modal
    setEditModalVisible(false);
  };

  // Update edited product details as the user modifies the input fields
  const handleChange = (field, value) => {
    setEditedProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    // Modal component to display the edit form
    <Modal
      animationType="slide"
      transparent={true}
      visible={editModalVisible}
      onRequestClose={() => {
        setEditModalVisible(false);
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Close button */}
          <TouchableOpacity
            onPress={() => setEditModalVisible(false)}
            style={styles.closeButton}
          >
            <AntDesign name="closecircle" size={24} color="#e5bf65" />
          </TouchableOpacity>
          {/* Edit product title */}
          <Text style={{ color: '#e5bf65', fontWeight: 'bold', fontSize: 16, marginBottom: 10, alignSelf: 'center' }}>
            Edit Product
          </Text>
          {/* Input fields for editing product details */}
          <Text style={{ color: '#FFFFFF', fontWeight: 'bold', marginBottom: 10 }}>Title:</Text>
          <TextInput
            style={styles.input}
            value={editedProduct.title}
            onChangeText={(text) => handleChange("title", text)}
          />
          <Text style={{ color: '#FFFFFF', fontWeight: 'bold', marginBottom: 10 }}>Description:</Text>
          <TextInput
            style={styles.input}
            value={editedProduct.description}
            onChangeText={(text) => handleChange("description", text)}
          />
          <Text style={{ color: '#FFFFFF', fontWeight: 'bold', marginBottom: 10 }}>Price:</Text>
          <TextInput
            style={styles.input}
            value={editedProduct.price.toString()}
            onChangeText={(text) => handleChange("price", text)}
            keyboardType="numeric"
          />
          <Text style={{ color: '#FFFFFF', fontWeight: 'bold', marginBottom: 10 }}>Quantity:</Text>
          <TextInput
            style={styles.input}
            value={editedProduct.quantity.toString()}
            onChangeText={(text) => handleChange("quantity", text)}
            keyboardType="numeric"
          />
          {/* Save button */}
          <TouchableOpacity onPress={handleEdit} style={styles.button}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Stylesheet for ModalEdit component
const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  qrCode: {
    width: 100,
    height: 100,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    backgroundColor: "#2a2a2a", // Dark background for the modal content
    padding: 20,
    borderRadius: 10,
    width: Dimensions.get("window").width - 40, // Width of the modal
    alignSelf: "center",
  },
  closeButton: {
    position: 'absolute', // Position the close button absolutely
    top: 10, // Distance from the top of the modalContent
    right: 10, // Distance from the right of the modalContent
  },
  input: {
    height: 40,
    backgroundColor: "#323232", // Darker background for input
    borderColor: "#565656", // Slightly lighter border for contrast
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: "#FFFFFF", // Text color for input
    borderRadius: 5, // Match other styles' border radius
  },
  
  button: {
    width: '100%', // Button width
    height: 45, // Button height
    backgroundColor: "#e5bf65", // Golden color for the Save button
    borderRadius: 15, // Button border radius
    justifyContent: 'center', // Center-align button content vertically
    alignItems: 'center', // Center-align button content horizontally
    marginTop: 10, // Top margin
  },
  buttonText: {
    color: 'white', // White color for the text
    fontWeight: 'bold', // Bold font weight
    fontSize: 16, // Font size
  },
});

export default ModalEdit; // Export the ModalEdit component