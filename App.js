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
      <StatusBar style="light" backgroundColor="#2a2a2a" />
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Scanner"
          screenOptions={({ route }) => ({
            tabBarActiveTintColor: "#e5bf65", 
            tabBarInactiveTintColor: "#565656",
            tabBarStyle: {
              backgroundColor: "#323232", 
              borderTopColor: "transparent",
            },
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
              let iconName;
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
          <Tab.Screen
            name="ProdDetails"
            component={ProdDetails}
            options={{
              tabBarLabel: "Products",
            }}
          />
          <Tab.Screen
            name="Scanner"
            component={Scanner}
            options={{
              tabBarLabel: "Scan",
            }}
          />
          <Tab.Screen
            name="ProdCreate"
            component={ProdCreate}
            options={{
              tabBarLabel: "Create",
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
