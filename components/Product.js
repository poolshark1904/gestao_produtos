/*

Componente Produto:

Representa a UI para exibir os detalhes do produto.
Inclui opções para editar e excluir produtos.

*/

// Importa as dependências necessárias
import React, { useState } from "react";
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity 
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ModalEdit from "../components/ModalEdit";
import ModalDelete from "../components/ModalDelete";

// Definição do componente Produto
export default function Product({ product, onEdit, onDelete }) {

  // Variáveis de estado para gerir a visibilidade dos modais de edição e de apagar produtos
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Exibir detalhes do produto */}
      <Image source={{ uri: product.qrCode }} style={styles.qrCode} />
      <Text style={styles.text}>Product Id: {product.id}</Text>
      <Text style={styles.text}>Title: {product.title}</Text>
      <Text style={styles.text}>Description: {product.description}</Text>
      <Text style={styles.text}>Price: {product.price}€</Text>
      <Text style={styles.text}>Quantity: {product.quantity}</Text>
      {/* Botões para ações de edição e exclusão */}
      <View style={styles.buttonContainer}>
        {/* Botão de edição */}
        <TouchableOpacity
          onPress={() => setEditModalVisible(true)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Edit</Text>
          <MaterialIcons name="edit-document" size={24} color="white" />
        </TouchableOpacity>
        {/* Botão de exclusão */}
        <TouchableOpacity
          onPress={() => setDeleteModalVisible(true)}
          style={styles.buttonDel}
        >
          <Text style={styles.buttonText}>Delete</Text>
          <MaterialIcons name="delete-forever" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {/* Modais para ações de edição e exclusão */}
      <ModalEdit
        product={product}
        editModalVisible={editModalVisible}
        setEditModalVisible={setEditModalVisible}
        editProduct={onEdit}
      />
      <ModalDelete
        product={product}
        deleteModalVisible={deleteModalVisible}
        setDeleteModalVisible={setDeleteModalVisible}
        deleteProduct={onDelete}
      />
    </View>
  );
}

// Estilos para o componente Produto
const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#2a2a2a", // Fundo escuro para cada item de produto
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  qrCode: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    width: 100,
    height: 45,
    backgroundColor: "#e5bf65", // Usa a cor dourada para o botão de edição
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  buttonDel: {
    width: 100,
    height: 45,
    backgroundColor: "#323232", // Cinza escuro para o botão de exclusão para manter a sutileza
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  buttonText: {
    color: "#ffffff", // Texto branco para ambos os botões
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 5,
  },
  // Adiciona estilos adicionais para campos de texto
  text: {
    color: "#e5bf65", // Texto estilizado com a cor dourada para um tema consistente
    marginBottom: 5,
  },
});
