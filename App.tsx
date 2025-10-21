import "react-native-gesture-handler";
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ParamItem, screens } from "./src/routes/Routes";
import { createDrawerNavigator } from "@react-navigation/drawer";

// const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="rgb(19, 19, 24)" />
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Inicio">
          {(Object.entries(screens)).map(([name, config]) => (
            <Drawer.Screen
              key={"Screen." + name}
              name={name}
              component={config.component}
              options={config.options}
            />
          ))}
          {/* <Stack.Screen name="Pesquisa" component={Pesquisa} />
          <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
          <Stack.Screen name="Entrar" component={Entrar} options={{ headerShown: false  }} />
          <Stack.Screen name="Produto" component={Produto} options={{ headerShown: false  }} />
          <Stack.Screen name="Inicio" component={Inicio} options={{ title: "Inicio" }} />
          <Stack.Screen name="Carrinho" component={Carrinho} options={{ title: "Carrinho" }} /> */}
        </Drawer.Navigator>
      </NavigationContainer>
    </View>
  );
}
