/*

Configuração do Componente:

Representa o ecrã do scanner onde os códigos QR são digitalizados.
Utiliza useState para gerir várias variáveis de estado como permissão, estado de digitalização, produtos encontrados, etc.
Utiliza o hook useCameraPermissions do Expo Camera para gerir permissões da câmara.
Pesquisa produtos armazenados do AsyncStorage na montagem do componente.

Digitalização de Códigos QR:

Utiliza o componente CameraView do Expo para digitalização de códigos QR.
Lida com os dados do código QR digitalizado para verificar se o produto existe ou não.
Mostra um modal para confirmar a criação ou edição do produto com base no resultado da digitalização.

Renderização da Interface do Utilizador:

Renderiza a vista da câmara, detalhes do produto e botão de digitalização com base em diferentes estados.
Utiliza um componente modal personalizado para confirmação do utilizador.

*/

// Importa as dependências necessárias
// Lida com permissão da câmara e digitalização de códigos de barras
// Gere os dados do produto utilizando AsyncStorage
// Renderiza detalhes do produto e modal para digitalização
import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera/next";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalScanner from "../components/ModalScanner";

export default function Scanner() {
  // Variáveis de estado para permissões da câmara, estado de digitalização, produtos, etc.
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [products, setProducts] = useState([]);
  const [foundProduct, setFoundProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState(false);
  const [confirmAction, setConfirmAction] = useState([]);
  const navigation = useNavigation();

  // Effect hook para solicitar permissão da câmara na montagem do componente
  useEffect(() => {
    (async () => {
      if (!permission?.granted) {
        await requestPermission();
      }
      setHasPermission(permission?.granted);
    })();
  }, [permission]);

  // Função para carregar produtos do AsyncStorage
  const loadProducts = async () => {
    const productsData = await AsyncStorage.getItem("products");
    if (productsData) {
      setProducts(JSON.parse(productsData));
    }
  };

  // Effect Hook para carregar produtos na montagem do componente
  useEffect(() => {
    loadProducts();
  }, []);

  // Effect hook para recarregar os produtos quando o foco muda para este ecrã (permitindo fazer refresh se tiver havido alterações entretanto)
  useFocusEffect(
    React.useCallback(() => {
      loadProducts();
    }, [])
  );

  // Função para lidar com dados de código de barras digitalizados
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
        setModalVisible(false);
        // Pass the product's ID instead of the entire product object
        navigation.navigate("ProdDetails", { id: productFound.id });
      });
    } else {
      setModalMessage(
        "Product not found. Do you want to create a new product?"
      );
      setConfirmAction(() => () => {
        setModalVisible(false);
        navigation.navigate("ProdCreate");
      });
    }
    setModalVisible(true);
  };

  // Função para fazer reset ao estado da digitalização
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
      {/* Renderiza a vista da câmara apenas se estiver no processo de leitura de QR Codes */}
      {!scanned && (
        <CameraView
          style={styles.cameraView}
          onBarcodeScanned={handleBarCodeScanned}
          barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        />
      )}

      {/* Renderiza o botão de digitalização novamente se digitalizado */}
      {scanned && (
        <TouchableOpacity style={styles.button} onPress={resetScanning}>
          <Text style={styles.buttonText}>Scan another</Text>
        </TouchableOpacity>
      )}

      {/* Modal para mostrar mensagens e confirmar ações */}
      <ModalScanner
        visible={modalVisible}
        message={modalMessage}
        onConfirm={() => {
          confirmAction();
        }}
        onCancel={() => {
          setModalVisible(false);
        }}
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
    zIndex: 2, // Garante que o botão está acima de outros elementos
  },
});
