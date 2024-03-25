// Fornece um componente modal reutilizável para exibir mensagens e interações do utilizador para ações para apagar produtos

// Importa as dependências necessárias
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

// Definição do componente ModalDelete
const ModalDelete = ({
  product,
  deleteProduct,
  deleteModalVisible,
  setDeleteModalVisible,
}) => {
  return (
    // Componente Modal para exibir a mensagem de confirmação de apagar
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
          {/* Botão de fechar */}
          <TouchableOpacity
            onPress={() => setDeleteModalVisible(false)}
            style={styles.closeButton}
          >
            <AntDesign name="closecircle" size={24} color="#e5bf65" />
          </TouchableOpacity>
          {/* Título e ícone de aviso */}
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
          {/* Mensagem de confirmação para apagar */}
          <Text style={styles.modalText}>
            Are you sure you want to delete this product?
          </Text>
          {/* Botão para apagar */}
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

// Folha de estilos para o componente ModalDelete
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)", // Fundo semi-transparente
  },
  modalContent: {
    backgroundColor: "#2a2a2a", // Cor de fundo do modal
    padding: 20,
    borderRadius: 10,
    width: Dimensions.get("window").width - 40, // Largura do modal
  },
  closeButton: {
    position: 'absolute', // Posiciona o botão de fechar "absolute"
    top: 10, // Distância do topo
    right: 10, // Distância da direita
  },
  warningTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  warningTitle: {
    color: '#e5bf65', // Cor do título de aviso
    fontWeight: 'bold', // Fonte a negrito
    fontSize: 20, // Tamanho da fonte
  },
  warningIcon: {
    marginLeft: 10, // Margem à esquerda do ícone de aviso
  },
  modalText: {
    color: '#FFFFFF', // Cor do texto
    fontSize: 16, // Tamanho da fonte
    marginBottom: 20, // Margem inferior
    textAlign: "center", // Alinha o texto ao centro
  },
  button: {
    width: '80%', // Largura do botão
    height: 45, // Altura do botão
    backgroundColor: "#e5bf65", // Cor de fundo do botão
    borderRadius: 15, // Raio da borda do botão
    justifyContent: 'center', // Alinha o conteúdo do botão verticalmente ao centro
    alignItems: 'center', // Alinha o conteúdo do botão horizontalmente ao centro
    alignSelf: "center", // Centraliza o botão horizontalmente
  },
  buttonText: {
    color: 'white', // Cor do texto do botão
    fontWeight: 'bold', // Fonte a negrito
    fontSize: 16, // Tamanho da fonte
  },
});

export default ModalDelete; // Exporta o componente ModalDelete