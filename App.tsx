import "react-native-gesture-handler";
import React from "react";
import { View, Text, TouchableOpacity, Image, StatusBar } from "react-native";
import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import { createDrawerNavigator, DrawerContentScrollView } from "@react-navigation/drawer";
import { FontAwesome6 as Icon } from "@expo/vector-icons";

import { screens } from "./src/routes/Routes";
import { User } from "./src/features/user";

const Drawer = createDrawerNavigator();

export default function App() {
  function CustomDrawerContent(props: any) {
    const currentRoute = props.state.routeNames[props.state.index];
    const navigation = props.navigation;

    const items = [
      { label: "Início", icon: "house", route: "Inicio" },
      { label: "Produtos", icon: "box-open", route: "Produto" },
      { label: "Carrinho", icon: "cart-shopping", route: "Carrinho" },
      { label: "Histórico", icon: "clock-rotate-left", route: "HistoricoCompras" },
    ];

    return (
      <View style={{ flex: 1, backgroundColor: "#121212" }}>
        <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 30 }}>
          <View style={{ marginBottom: 30, marginTop: 10 }}>
            <Image
              source={require("./assets/img/logo.png")}
              style={{ width: 220, height: 40, }}
            />
          </View>

          {items.map((item, i) => {
            const isActive = currentRoute === item.route;
            return (
              <TouchableOpacity
                key={i}
                onPress={() => navigation.navigate(item.route)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  borderRadius: 5,
                  marginHorizontal: 10,
                  marginBottom: 6,
                  backgroundColor: isActive ? "#7979793f" : "transparent",
                }}
              >
                <Icon
                  name={item.icon}
                  size={18}
                  color={isActive ? "#fff" : "#aaa"}
                  style={{ marginRight: 10 }}
                />
                <Text style={{ color: isActive ? "#fff" : "#aaa", fontWeight: 400 }}>{item.label}</Text>
              </TouchableOpacity>
            );
          })}
        </DrawerContentScrollView>

        <View
          style={{
            backgroundColor: "#7979793f",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 15,
            paddingVertical: 10,
          }}
        >
          <TouchableOpacity 
            style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
            onPress={() => navigation.navigate("Perfil")}
          >
            <Image
              source={require("./assets/img/perfil.png")}
              style={{ width: 40, height: 40, borderRadius: 60 }}
            />
            <View style={{ display: 'flex', marginLeft: 10, gap: 3 }}>
              <Text style={{ color: "#fff", fontWeight: "bold" }}>{User.auth?.nome ?? "Usuário"}</Text>
              <Text style={{ color: "#fff", fontSize: 12 }}>Meu perfil <Icon name="chevron-right" size={10} color="#fff" /></Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Entrar")}>
            <Icon name="right-from-bracket" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="rgb(19, 19, 24)" />
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Entrar"
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            headerShown: false,
            drawerStyle: {
              backgroundColor: "#0E0E10",
              width: 240,
            },
          }}
        >
          {Object.entries(screens).map(([name, config]) => (
            <Drawer.Screen
              key={"Screen." + name}
              name={name}
              component={config.component}
              options={config.options}
            />
          ))}
        </Drawer.Navigator>
      </NavigationContainer>
    </View>
  );
}
