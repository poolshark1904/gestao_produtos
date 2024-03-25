/*

Configuração do Componente:

Representa o ecrã para criar novos produtos.
Utiliza useState para gerir campos de formulário e estado de criação de produto.

Criação de Produtos:

Implementa inputs de formulário para fornecer detalhes do produto.
Gera um código QR para o novo produto usando uma API.
Guarda o produto criado no AsyncStorage após a submissão.

*/

// Importa as dependências necessárias
// Gere o estado de inputs do formulário e a navegação
import React, { useState, useEffect } from "react";
import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  SafeAreaView,
} from "react-native";
import {
  useFocusEffect,
} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalMessage from "../components/ModalMessage";

export default function ProdCreate() {
  // Variáveis de estado para gerir inputs do formulário e a visibilidade do modal
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [messageModalVisible, setMessageModalVisible] = useState(false);
  const [message, setMessage] = useState("");

  // Hook de efeito para carregar produtos na montagem do componente
  useEffect(() => {
    loadProducts();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadProducts();
      console.log("Stored Products:", products);
    }, [])
  );

  // Função para carregar produtos do AsyncStorage
  const loadProducts = async () => {
    const productsData = await AsyncStorage.getItem("products");
    if (productsData) {
      setProducts(JSON.parse(productsData));
    }
  };

  // Função para guardar um novo produto
  const saveProduct = async () => {
    try {
      // Gera ID único para o novo produto
      const id = `${products.length + 1}-${new Date().getTime()}`;

      // Gera código QR para o novo produto
      const qrCodeText = `Product ID: ${id}`;
      const qrCode = await generateQRCode(qrCodeText);

      if (!qrCode) {
        throw new Error("Failed to generate QR code.");
      }

      // Cria novo objeto de produto
      const newProduct = {
        id,
        qrCodeText,
        qrCode,
        title,
        description,
        price: parseFloat(price),
        quantity: parseInt(quantity, 10),
      };

      // Atualiza lista de produtos e guarda no AsyncStorage
      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);
      await AsyncStorage.setItem("products", JSON.stringify(updatedProducts));

      // Exibe mensagem de sucesso e mostra o modal
      setMessage("Product created successfully!");
      setMessageModalVisible(true);

      // Faz reset aos campos do formulário
      setTitle("");
      setDescription("");
      setPrice("");
      setQuantity("");
    } catch (error) {
      console.error("Error creating product:", error);
      // Exibe mensagem de erro e mostra o modal
      setMessage(`Error creating product: ${error.message}`);
      setMessageModalVisible(true);
    }
  };

  // Função para gerar código QR usando uma API
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
      {/* Header */}
      <Text style={styles.header}>Create New Product</Text>

      {/* Inputs do formulário */}
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

      {/* Botão para guardar */}
      <TouchableOpacity style={styles.button} onPress={saveProduct}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>

      {/* Modal para mostrar mensagens de successo/erro*/}
      <ModalMessage
        visible={messageModalVisible}
        message={message}
        onCancel={() => setMessageModalVisible(false)}
      />
    </SafeAreaView>
  );
}

// Estilização da página
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
    backgroundColor: "#323232", // Cor de para o fundo do input
    color: "#FFFFFF", // Cor do texto branca para o input
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#565656", // Cor da borda para os inputs
  },
  button: {
    width: 200,
    height: 45,
    marginTop: 15,
    backgroundColor: "#e5bf65", // Cor dourada para o botão
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    shadowColor: "#000", // Cor da sombra
    shadowOffset: { width: 0, height: 2 }, // Posição da sombra
    shadowOpacity: 0.25, // Opacidade da sombra
    shadowRadius: 3.84, // Raio de desfocagem da sombra
    elevation: 5, // Elevação para Android
  },
  buttonText: {
    color: "#2a2a2a", // Cor escura para o texto para proporcionar contraste no botão dourado
    fontWeight: "bold",
    fontSize: 16,
  },
});
