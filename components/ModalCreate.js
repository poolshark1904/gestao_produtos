import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
} from "react-native";
import {AntDesign} from "@expo/vector-icons";

const ModalCreate = ({ message, visible, onCancel }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{message}</Text>
          <TouchableOpacity onPress={onCancel} style={styles.closeButton}>
            <AntDesign name="closecircle" size={24} color="#e5bf65" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#2a2a2a",
    padding: 20,
    borderRadius: 10,
    width: Dimensions.get("window").width - 40,
    alignSelf: "center",
  },
  modalText: {
    color: "#FFFFFF",
    marginBottom: 15,
    textAlign: "center",
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  
});

export default ModalCreate;
