import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Button,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera/next";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Product from "../components/Product";
import ModalScanner from "../components/ModalScanner";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [products, setProducts] = useState([]);
  const [foundProduct, setFoundProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState(false);
  const [confirmAction, setConfirmAction] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      if (!permission?.granted) {
        await requestPermission();
      }
      setHasPermission(permission?.granted);
    })();
  }, [permission]);

  const loadProducts = async () => {
    const productsData = await AsyncStorage.getItem("products");
    if (productsData) {
      setProducts(JSON.parse(productsData));
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadProducts();
    }, [])
  );
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    const scannedId = data.split("Product ID: ")[1];
    const productFound = products.find(
      (product) => product.id.toString() === scannedId
    );

    if (productFound) {
      setModalMessage(
        `Product found: ${productFound.title}. Do you want to edit it?`
      );
      setConfirmAction(() => () => {
        setFoundProduct(productFound);
        setModalVisible(false);
      });
      setModalVisible(true);
    } else {
      setFoundProduct(null);
      setModalMessage(
        "Product not found. Do you want to create a new product?"
      );
      setConfirmAction(() => () => {
        setFoundProduct(null);
        navigation.navigate("ProdCreate");
        setModalVisible(false);
      });
      setModalVisible(true);
    }
  };

  const resetScanning = () => {
    setScanned(false);
    setFoundProduct(null);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      {!foundProduct && (
        <CameraView
          style={styles.cameraView}
          onBarcodeScanned={!scanned ? handleBarCodeScanned : undefined}
          barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        />
      )}
      {foundProduct && <Product product={foundProduct} />}
      {scanned && (
        <TouchableOpacity style={styles.button} onPress={resetScanning}>
          <Text style={styles.buttonText}>Scan another</Text>
        </TouchableOpacity>
      )}
      <ModalScanner
        visible={modalVisible}
        message={modalMessage}
        onConfirm={confirmAction}
        onCancel={() => setModalVisible(false)}
      />
    </SafeAreaView>
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
  cameraView: {
    position: "absolute",
    height: Dimensions.get("window").height * 0.5,
    left: 0,
    right: 0,
    top: -10,
    bottom: 0,
  },
  button: {
    position: "absolute",
    width: 200,
    height: 45,
    bottom: 15,
    backgroundColor: "#e5bf65", 
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84, 
    elevation: 5, 
    zIndex: 2,
  },
});
