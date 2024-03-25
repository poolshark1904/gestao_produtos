// Fornece um componente modal reutilizável para exibir mensagens e interações do utilizador para ações de digitalização de produto

// Importa as dependências necessárias
import React from 'react';
import { 
  Modal, 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions 
} from 'react-native';

// Definição do componente ModalScanner
const ModalScanner = ({ visible, message, onConfirm, onCancel }) => {
  return (
    // Componente Modal para exibir a mensagem do scanner e opções
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Mensagem a ser exibida no modal */}
          <Text style={styles.modalText}>{message}</Text>
          {/* Botão para confirmar a ação */}
          <TouchableOpacity style={styles.button} onPress={onConfirm}>
            <Text style={styles.buttonText}>Yes</Text>
          </TouchableOpacity>
          {/* Botão para cancelar a ação */}
          <TouchableOpacity style={styles.button} onPress={onCancel}>
            <Text style={styles.buttonText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Folha de estilos para o componente ModalScanner
const styles = StyleSheet.create({
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
  modalText: {
    color: "#FFFFFF", // Cor branca para o texto
    marginBottom: 15, // Margem inferior para separação
    textAlign: "center", // Alinha o texto ao centro
  },
  button: {
    width: '100%', // Largura do botão para ocupar toda a largura
    height: 45, // Altura do botão
    backgroundColor: "#e5bf65", // Cor dourada para o botão
    borderRadius: 15, // Raio da borda do botão
    justifyContent: 'center', // Alinha o conteúdo do botão verticalmente ao centro
    alignItems: 'center', // Alinha o conteúdo do botão horizontalmente ao centro
    marginTop: 10, // Margem superior para separação
  },
  buttonText: {
    color: 'black', // Cor preta para o texto
    fontWeight: 'bold', // Fonte a negrito
    fontSize: 16, // Tamanho da fonte
  },
});

export default ModalScanner; // Exporta o componente ModalScanner
