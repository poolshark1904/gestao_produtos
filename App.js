/* 
UFCD 11027
Autores: André Silva, André Monteiro, Luís Almeida

Configuração de Navegação:
Define um navegador de aba inferior para três ecrãs: "ProdDetails", "Scanner" e "ProdCreate".
Cada ecrã está associado a um ícone e rótulo específicos para navegação.
Importa ícones necessários dos ícones vetoriais do Expo.

Comentários Gerais:

Gestão de Estado: Utiliza hooks React para gerir eficientemente o estado entre componentes.

Armazenamento Assíncrono: Armazena e recupera produtos utilizando a AsyncStorage..

Navegação: Implementa a navegação usando React Navigation, permitindo uma fácil passagem entre ecrã.

Componentes de Interface do Utilizador: Utiliza vários componentes de interface do utilizador como FlatList, 
                TextInput, TouchableOpacity, etc., para uma excelente experiência do utilizador.

Modularidade: Os componentes são modulares, promovendo a reutilização e manutenção do código.
*/

// Importa as dependências necessárias
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { createBottomTabNavigator, } from "@react-navigation/bottom-tabs";
import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import ProdDetails from "./Pages/ProdDetails";
import Scanner from "./Pages/Scanner";
import ProdCreate from "./Pages/ProdCreate";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
      {/* Define a barra de status */}
      <StatusBar style="light" backgroundColor="#2a2a2a" />
      {/* Container de navegação para o navegador de aba inferior */}
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Scanner"
          // Personaliza a aparência da barra de abas
          screenOptions={({ route }) => ({
            tabBarActiveTintColor: "#e5bf65", // Usa a cor dourada para o ícone da aba ativa
            tabBarInactiveTintColor: "#565656", // Usa uma cor cinza para ícones de abas inativas
            tabBarStyle: {
              backgroundColor: "#323232", // Usa o cinza escuro para o fundo da barra de abas
              borderTopColor: "transparent", // Oculta a borda superior da barra de abas
            },
            headerShown: false, // Oculta cabeçalho para ecrãs
            tabBarIcon: ({ color, size }) => {
              let iconName;
              // Define ícone para cada aba
              if (route.name === "ProdDetails") {
                iconName = "list-alt";
                return (
                  <FontAwesome5 name={iconName} size={size} color={color} />
                );
              } else if (route.name === "Scanner") {
                iconName = "qrcode-scan";
                return (
                  <MaterialCommunityIcons
                    name={iconName}
                    size={size}
                    color={color}
                  />
                );
              } else if (route.name === "ProdCreate") {
                iconName = "edit";
                return (
                  <FontAwesome name={iconName} size={size} color={color} />
                );
              }
            },
          })}
        >
          {/* Define ecrãs para cada aba */}
          <Tab.Screen
            name="ProdDetails"
            component={ProdDetails}
            options={{
              tabBarLabel: "Products", // Rótulo da aba
            }}
          />
          <Tab.Screen
            name="Scanner"
            component={Scanner}
            options={{
              tabBarLabel: "Scan", // Rótulo da aba
            }}
          />
          <Tab.Screen
            name="ProdCreate"
            component={ProdCreate}
            options={{
              tabBarLabel: "Create", // Rótulo da aba
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
