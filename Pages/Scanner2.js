import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Modal, TouchableOpacity, Alert } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera/next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function Scanner() {
  const [permissions, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [product, setProduct] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    requestPermission();
  }, []);

  const parseScannedData = (data) => {
    // This is a very simplistic parser. You'll need to adapt it
    // to the exact format of the string you've encoded in your QR codes
    const idMatch = data.match(/Product ID: (\d+)/);
    const titleMatch = data.match(/Title: (.*)/);
  
    return {
      id: idMatch ? parseInt(idMatch[1], 10) : null,
      title: titleMatch ? titleMatch[1].trim() : null,
    };
  };
  

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    // Assuming the data is a string like "Product ID: 1, Title: Teste"
    const parsedData = parseScannedData(data); // You'll implement this function based on your QR code data format
  
    const productsData = await AsyncStorage.getItem("products");
    const products = productsData ? JSON.parse(productsData) : [];
  
    const productFound = products.find((p) => p.id === parsedData.id);
    if (productFound) {
      setProduct(productFound);
      setModalVisible(true);
    } else {
      // If QR code data does not match any product, ask to create a new one
      // You may want to use another state to handle this case
      navigation.navigate("ProdCreate");
    }
  };

  const navigateToProductDetails = () => {
    if (product) {
      navigation.navigate("ProdDetails", {
        screen: "ProductDetails",
        params: { productId: product.id },
      });
    }
  };

  if (!permissions?.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Requesting camera permission...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFill}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        barCodeScannerSettings={{
          barCodeTypes: ['qr'],
        }}
      />

      {/* Modal for product found */}
      {product && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            <Text>Product ID: {product.id}</Text>
            <Text>Title: {product.title}</Text>
            <TouchableOpacity
              onPress={navigateToProductDetails}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#2a2a2a",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#323232",
    color: "#e5bf65",
    borderRadius: 5,
    elevation: 10,
  },
  input: {
    height: 40,
    backgroundColor: "#323232", // For input background
    color: "#FFFFFF", // White text color for input
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#565656", // Border color for inputs
  },
  button: {
    width: 200,
    height: 45,
    marginTop: 15,
    backgroundColor: "#e5bf65", // Golden color for the button
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow position
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.84, // Shadow blur radius
    elevation: 5, // Elevation for Android
  },
  buttonText: {
    color: "#2a2a2a", // Dark color for text to provide contrast on the golden button
    fontWeight: "bold",
    fontSize: 16,
  },
});
