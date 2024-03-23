import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
} from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

const ModalDelete = ({
  product,
  deleteProduct,
  deleteModalVisible,
  setDeleteModalVisible,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={deleteModalVisible}
      onRequestClose={() => {
        setDeleteModalVisible(false);
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            onPress={() => setDeleteModalVisible(false)}
            style={styles.closeButton}
          >
            <AntDesign name="closecircle" size={24} color="#e5bf65" />
          </TouchableOpacity>
          <View style={styles.warningTitleContainer}>
            <Text style={styles.warningTitle}>
              Warning!
            </Text>
            <MaterialCommunityIcons
              name="alert-outline"
              size={24}
              color="#e5bf65"
              style={styles.warningIcon}
            />
          </View>
          <Text style={styles.modalText}>
            Are you sure you want to delete this product?
          </Text>
          <TouchableOpacity
            onPress={() => {
              deleteProduct(product.id);
              setDeleteModalVisible(false);
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Delete</Text>
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
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalContent: {
    backgroundColor: "#2a2a2a",
    padding: 20,
    borderRadius: 10,
    width: Dimensions.get("window").width - 40,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  warningTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  warningTitle: {
    color: '#e5bf65',
    fontWeight: 'bold',
    fontSize: 20,
  },
  warningIcon: {
    marginLeft: 10,
  },
  modalText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    width: '80%',
    height: 45,
    backgroundColor: "#e5bf65",
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: "center",
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ModalDelete;
