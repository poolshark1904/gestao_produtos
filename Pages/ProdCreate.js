import React, { useState, useEffect } from "react";
import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalCreate from "../components/ModalCreate";

export default function ProdCreate() {
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const productsData = await AsyncStorage.getItem("products");
    if (productsData) {
      setProducts(JSON.parse(productsData));
    }
  };

  const saveProduct = async () => {
    try {
      const id = `${products.length + 1}-${new Date().getTime()}`;
      const qrCodeText = `Product ID: ${id}`;
      const qrCode = await generateQRCode(qrCodeText);

      if (!qrCode) {
        throw new Error("Failed to generate QR code.");
      }

      const newProduct = {
        id,
        qrCodeText,
        qrCode,
        title,
        description,
        price: parseFloat(price),
        quantity: parseInt(quantity, 10),
      };

      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);
      await AsyncStorage.setItem("products", JSON.stringify(updatedProducts));

      // Success message
      setMessage("Product created successfully!");
      setCreateModalVisible(true);

      // Reset form fields
      setTitle("");
      setDescription("");
      setPrice("");
      setQuantity("");
    } catch (error) {
      console.error("Error creating product:", error);
      // Error message
      setMessage(`Error creating product: ${error.message}`);
      setCreateModalVisible(true);
    }
  };

  const generateQRCode = async (data) => {
    try {
      const response = await fetch(
        `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
          data
        )}&size=100x100`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.url;
    } catch (error) {
      console.error("Error generating QR code:", error);
      return "";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Create New Product</Text>
      <Text style={{ color: "#FFFFFF", fontWeight: "bold", marginBottom: 10 }}>
        Title:
      </Text>

      <TextInput
        placeholder="Name of the product"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        placeholderTextColor="#757575"
      />

      <Text style={{ color: "#FFFFFF", fontWeight: "bold", marginBottom: 10 }}>
        Description:
      </Text>
      <TextInput
        placeholder="A brief description of the product"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        placeholderTextColor="#757575"
      />

      <Text style={{ color: "#FFFFFF", fontWeight: "bold", marginBottom: 10 }}>
        Price:
      </Text>
      <TextInput
        placeholder="Price, in euros"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
        placeholderTextColor="#757575"
      />

      <Text style={{ color: "#FFFFFF", fontWeight: "bold", marginBottom: 10 }}>
        Quantity:
      </Text>
      <TextInput
        placeholder="Initial inventory amount"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        style={styles.input}
        placeholderTextColor="#757575"
      />
      <TouchableOpacity style={styles.button} onPress={saveProduct}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      <ModalCreate
        visible={createModalVisible}
        message={message}
        onCancel={() => setCreateModalVisible(false)}
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
    backgroundColor: "#323232", 
    color: "#FFFFFF", 
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#565656",
  },
  button: {
    width: 200,
    height: 45,
    marginTop: 15,
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
  },
  buttonText: {
    color: "#2a2a2a", 
    fontWeight: "bold",
    fontSize: 16,
  },
});
