// Provides reusable modal component for displaying messages and user interactions for scanning product actions

// Import necessary dependencies
import React from 'react';
import { 
  Modal, 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions 
} from 'react-native';

// ModalScanner component definition
const ModalScanner = ({ visible, message, onConfirm, onCancel }) => {
  return (
    // Modal component for displaying the scanner message and options
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Message to be displayed in the modal */}
          <Text style={styles.modalText}>{message}</Text>
          {/* Button to confirm the action */}
          <TouchableOpacity style={styles.button} onPress={onConfirm}>
            <Text style={styles.buttonText}>Yes</Text>
          </TouchableOpacity>
          {/* Button to cancel the action */}
          <TouchableOpacity style={styles.button} onPress={onCancel}>
            <Text style={styles.buttonText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Stylesheet for ModalScanner component
const styles = StyleSheet.create({
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
  modalText: {
    color: "#FFFFFF", // White color for the text
    marginBottom: 15, // Bottom margin for separation
    textAlign: "center", // Center-align text
  },
  button: {
    width: '100%', // Button width to occupy full width
    height: 45, // Button height
    backgroundColor: "#e5bf65", // Golden color for the button
    borderRadius: 15, // Button border radius
    justifyContent: 'center', // Center-align button content vertically
    alignItems: 'center', // Center-align button content horizontally
    marginTop: 10, // Top margin for separation
  },
  buttonText: {
    color: 'black', // Black color for the text
    fontWeight: 'bold', // Bold font weight
    fontSize: 16, // Font size
  },
});

export default ModalScanner; // Export the ModalScanner component
