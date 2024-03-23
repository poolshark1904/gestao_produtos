import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, SafeAreaView, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Product from "../components/Product";
import { useFocusEffect } from "@react-navigation/native";

export default function ProdDetails() {

  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const productsData = await AsyncStorage.getItem("products");
    if (productsData) {
      setProducts(JSON.parse(productsData));
      console.log("Stored Products:", products);
      
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadProducts();
      console.log("Stored Products:", products);
      
    }, [])
  );

  const editProduct = async (editedProduct) => {
    const updatedProducts = products.map((product) =>
      product.id === editedProduct.id ? editedProduct : product
    );
    setProducts(updatedProducts);
    await AsyncStorage.setItem("products", JSON.stringify(updatedProducts));
    console.log("Updated Products after edit:", updatedProducts);
  };

  const DeleteProduct = async (productId) => {
    console.log("Attempting to delete product with id:", productId);
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    setProducts(updatedProducts);
    await AsyncStorage.setItem("products", JSON.stringify(updatedProducts));
    console.log("Updated Products after delete:", updatedProducts);
  };



  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Product List</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Product
            product={item}
            onEdit={editProduct}
            onDelete={DeleteProduct}
          />
        )}
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
  },
});
