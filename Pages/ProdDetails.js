/*

Configuração do Componente:

Representa a tela para listar produtos armazenados.
Utiliza useState para gerir o estado dos produtos armazenados.

Pesquisa de Produtos Armazenados:

Recupera os produtos armazenados do AsyncStorage na montagem do componente e quando é focado.

Gestão de Produtos:

Permite editar e excluir produtos.
Atualiza os produtos armazenados no AsyncStorage conforme necessário.

*/

// Importa as dependências necessárias
import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Product from "../components/Product";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import ModalMessage from "../components/ModalMessage";


export default function ProdDetails() {
  // Variável de estado para a lista de produtos guardados no storage
  const [products, setProducts] = useState([]);
  // Variável de estado para guardar o ID do produto lido no Scanner
  const [selectedProductId, setSelectedProductId] = useState(null);
  // Variável de estado para gerir a visibilidade do modal
  const [messageModalVisible, setMessageModalVisible] = useState(false);

  const route = useRoute();
  const navigation = useNavigation();

  // Função para carregar os produtos do AsyncStorage e defini-los na variável de estado definida products
  const loadProducts = async () => {
    const productsData = await AsyncStorage.getItem("products");
    if (productsData) {
      setProducts(JSON.parse(productsData));
      console.log("Stored Products:", products);
    }
  };

  // Effect hook para carregar os produtos quando o componente é montado
  useEffect(() => {
    loadProducts();
    // Verifica se foi passado um ID do scanner e passa para a variável de estado para guardar o ID do produto scanado no Scanner
    if (route.params?.id) {
      setSelectedProductId(route.params.id);
    }
  }, [route.params?.id]); //colocar route.params?.id como dependência para poder correr o efeito de novo

  // Effect hook para recarregar os produtos quando o foco muda para este ecrã (permitindo fazer refresh se tiver havido alterações entretanto)
  useFocusEffect(
    React.useCallback(() => {
      loadProducts();
      console.log("Stored Products:", products);
    }, [])
  );

  // Função para limpar o id passado pelo scanner e mostrar todos os produtos
  const showAllProducts = () => {
    setSelectedProductId(null);
    navigation.setParams({ id: null });
  };

  //Função que mostra a lista filtrada pelo ID passado, ou caso não haja, mostre todos os produtos
  const filteredProducts = selectedProductId
    ? products.filter((product) => product.id === selectedProductId)
    : products;

  // Função para editar um produto
  const editProduct = async (editedProduct) => {
    try {
      // Update ao produto na lista
      const updatedProducts = products.map((product) =>
        product.id === editedProduct.id ? editedProduct : product
      );
      // Atualiza o estado da lista de produtos para os produtos atualizados
      setProducts(updatedProducts);
      // Atualiza o AsyncStorage com a lista de produtos atulizada
      await AsyncStorage.setItem("products", JSON.stringify(updatedProducts));
      console.log("Updated Products after edit:", updatedProducts);
      setMessage("Product edited successfully!");
      setMessageModalVisible(true);
    } catch (error) {
        console.error("Error editing product:", error);
        /* Exibe mensagem de erro e mostra o modal */
        setMessage(`Error editing product: ${error.message}`);
        setMessageModalVisible(true);
    }
  };

  // Função para apagar um produto da lista
  const DeleteProduct = async (productId) => {
    console.log("Attempting to delete product with id:", productId);
    // Filtra o produto que queremos apagar da lista
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    // Atualiza o estado para a lista filtrada
    setProducts(updatedProducts);
    // Atualiza o AsyncStorage com a lista de produtos filtrada (sem o que queremos apagar)
    await AsyncStorage.setItem("products", JSON.stringify(updatedProducts));
    console.log("Updated Products after delete:", updatedProducts);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho/Título do ecrã */}
      <Text style={styles.header}>Product List</Text>
      {/* Botão que aparece se tiver um produto scanado e a lista filtrada
      para mostrar de novo todos os produtos usando a função acima showAllProducts */}
      {selectedProductId && (
        <TouchableOpacity
          onPress={showAllProducts}
          style={styles.showAllButton}
        >
          <Text style={styles.showAllButtonText}>Show All Products</Text>
        </TouchableOpacity>
      )}
      {/* FlatList para renderizar a lista de produtos */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Product
            product={item}
            onEdit={editProduct} // Passa a função editProduct como prop
            onDelete={DeleteProduct} // Passa a função deleteProduct como prop
          />
        )}
      />
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
  },
  showAllButton: {
    backgroundColor: "#e5bf65",
    padding: 10,
    borderRadius: 5,
    alignSelf: "center",
    marginBottom: 10,
  },
  showAllButtonText: {
    color: "#2a2a2a",
    fontWeight: "bold",
  },
});
