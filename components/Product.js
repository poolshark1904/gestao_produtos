/*

Product Component:

Represents the UI for displaying product details.
Includes options for editing and deleting products.

*/

// Import necessary dependencies
import React, { useState } from "react";
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity 
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ModalEdit from "../components/ModalEdit";
import ModalDelete from "../components/ModalDelete";

// Product component definition
export default function Product({ product, onEdit, onDelete }) {

  // State variables to manage the visibility of edit and delete modals
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Display product details */}
      <Image source={{ uri: product.qrCode }} style={styles.qrCode} />
      <Text style={styles.text}>Product Id: {product.id}</Text>
      <Text style={styles.text}>Title: {product.title}</Text>
      <Text style={styles.text}>Description: {product.description}</Text>
      <Text style={styles.text}>Price: {product.price}€</Text>
      <Text style={styles.text}>Quantity: {product.quantity}</Text>
      {/* Buttons for edit and delete actions */}
      <View style={styles.buttonContainer}>
        {/* Edit button */}
        <TouchableOpacity
          onPress={() => setEditModalVisible(true)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Edit</Text>
          <MaterialIcons name="edit-document" size={24} color="white" />
        </TouchableOpacity>
        {/* Delete button */}
        <TouchableOpacity
          onPress={() => setDeleteModalVisible(true)}
          style={styles.buttonDel}
        >
          <Text style={styles.buttonText}>Delete</Text>
          <MaterialIcons name="delete-forever" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {/* Modals for edit and delete actions */}
      <ModalEdit
        product={product}
        editModalVisible={editModalVisible}
        setEditModalVisible={setEditModalVisible}
        editProduct={onEdit}
      />
      <ModalDelete
        product={product}
        deleteModalVisible={deleteModalVisible}
        setDeleteModalVisible={setDeleteModalVisible}
        deleteProduct={onDelete}
      />
    </View>
  );
}

// Styles for the Product component
const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#2a2a2a", // Dark background for each product item
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  qrCode: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    width: 100,
    height: 45,
    backgroundColor: "#e5bf65", // Use the golden color for the edit button
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  buttonDel: {
    width: 100,
    height: 45,
    backgroundColor: "#323232", // Dark grey for delete button to stay subtle
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  buttonText: {
    color: "#ffffff", // White text for both buttons
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 5,
  },
  // Add additional styles for text fields
  text: {
    color: "#e5bf65", // Text styled with the golden color for a consistent theme
    marginBottom: 5,
  },
});
