// Fornece um componente modal reutilizável para exibir mensagens e interações do utilizador para ações de criação de produtos

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
import {AntDesign} from "@expo/vector-icons";

// Definição do componente ModalMessage
const ModalMessage = ({ message, visible, onCancel }) => {
  return (
    // Componente Modal para exibir a mensagem
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Texto da mensagem */}
          <Text style={styles.modalText}>{message}</Text>
          {/* Botão de fechar */}
          <TouchableOpacity onPress={onCancel} style={styles.closeButton}>
            <AntDesign name="closecircle" size={24} color="#e5bf65" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Folha de estilos para o componente ModalCreate
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo semi-transparente
  },
  modalContent: {
    backgroundColor: "#2a2a2a", // Cor de fundo do modal
    padding: 20,
    borderRadius: 10,
    width: Dimensions.get("window").width - 40, // Largura do modal
    alignSelf: "center",
  },
  modalText: {
    color: "#FFFFFF", // Cor do texto
    marginBottom: 15,
    textAlign: "center", // Alinha o texto ao centro
  },
  closeButton: {
    position: 'absolute', // Posiciona o botão de fechar absolutamente
    top: 10, // Distância do topo
    right: 10, // Distância da direita
  },
  
});

export default ModalMessage; // Exporta o componente ModalMessage
