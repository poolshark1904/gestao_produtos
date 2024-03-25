// Fornece um componente modal reutilizável para exibir mensagens e interações do utilizador para ações de edição de produto

// Importa as dependências necessárias
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

// Definição do componente ModalEdit
const ModalEdit = ({
  product,
  editProduct,
  editModalVisible,
  setEditModalVisible,
}) => {
  // Estado para lidar com os detalhes do produto editado
  const [editedProduct, setEditedProduct] = useState(product);
  
  // Função para lidar com a edição do produto
  const handleEdit = () => {
    // Passa o produto editado de volta para o componente pai
    editProduct(editedProduct);
    // Fecha o modal
    setEditModalVisible(false);
  };

  // Atualiza os detalhes do produto editado conforme o utilizador modifica os campos de entrada
  const handleChange = (field, value) => {
    setEditedProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    // Componente Modal para exibir o formulário de edição
    <Modal
      animationType="slide"
      transparent={true}
      visible={editModalVisible}
      onRequestClose={() => {
        setEditModalVisible(false);
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Botão de fechar */}
          <TouchableOpacity
            onPress={() => setEditModalVisible(false)}
            style={styles.closeButton}
          >
            <AntDesign name="closecircle" size={24} color="#e5bf65" />
          </TouchableOpacity>
          {/* Título de edição de produto */}
          <Text style={{ color: '#e5bf65', fontWeight: 'bold', fontSize: 16, marginBottom: 10, alignSelf: 'center' }}>
            Edit Product
          </Text>
          {/* Campos de entrada para editar os detalhes do produto */}
          <Text style={{ color: '#FFFFFF', fontWeight: 'bold', marginBottom: 10 }}>Title:</Text>
          <TextInput
            style={styles.input}
            value={editedProduct.title}
            onChangeText={(text) => handleChange("title", text)}
          />
          <Text style={{ color: '#FFFFFF', fontWeight: 'bold', marginBottom: 10 }}>Description:</Text>
          <TextInput
            style={styles.input}
            value={editedProduct.description}
            onChangeText={(text) => handleChange("description", text)}
          />
          <Text style={{ color: '#FFFFFF', fontWeight: 'bold', marginBottom: 10 }}>Price:</Text>
          <TextInput
            style={styles.input}
            value={editedProduct.price.toString()}
            onChangeText={(text) => handleChange("price", text)}
            keyboardType="numeric"
          />
          <Text style={{ color: '#FFFFFF', fontWeight: 'bold', marginBottom: 10 }}>Quantity:</Text>
          <TextInput
            style={styles.input}
            value={editedProduct.quantity.toString()}
            onChangeText={(text) => handleChange("quantity", text)}
            keyboardType="numeric"
          />
          {/* Botão de guardar */}
          <TouchableOpacity onPress={handleEdit} style={styles.button}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Folha de estilos para o componente ModalEdit
const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  qrCode: {
    width: 100,
    height: 100,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo semi-transparente
  },
  modalContent: {
    backgroundColor: "#2a2a2a", // Fundo escuro para o conteúdo do modal
    padding: 20,
    borderRadius: 10,
    width: Dimensions.get("window").width - 40, // Largura do modal
    alignSelf: "center",
  },
  closeButton: {
    position: 'absolute', // Posiciona o botão de fechar de forma "absolute"
    top: 10, // Distância do topo do modalContent
    right: 10, // Distância da direita do modalContent
  },
  input: {
    height: 40,
    backgroundColor: "#323232", // Fundo mais escuro para input
    borderColor: "#565656", // Borda ligeiramente mais clara para contraste
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: "#FFFFFF", // Cor do texto para a entrada
    borderRadius: 5, // Corresponde ao raio da borda de outros estilos
  },
  
  button: {
    width: '100%',// Largura do botão
    height: 45, // Altura do botão
    backgroundColor: "#e5bf65", // Cor dourada para o botão Guardar
    borderRadius: 15, // Raio da borda do botão
    justifyContent: 'center', // Alinha o conteúdo do botão verticalmente ao centro
    alignItems: 'center', // Alinha o conteúdo do botão horizontalmente ao centro
    marginTop: 10, // Margem superior
  },
  buttonText: {
    color: 'white', // Cor branca para o texto
    fontWeight: 'bold', // Fonte a negrito
    fontSize: 16, // Tamanho da fonte
  },
});

export default ModalEdit; // Exporta o componente ModalEdit