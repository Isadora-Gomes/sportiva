import "react-native-gesture-handler";
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Cadastro from './src/screens/Cadastro';
import Entrar from './src/screens/Entrar';
import Pesquisa from './src/screens/Pesquisa';
import Produto from './src/screens/Produto';
import Inicio from './src/screens/Inicio';
import Carrinho from './src/screens/Carrinho';
import { ParamItem, screens } from "./src/routes/Routes";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="rgb(19, 19, 24)" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Entrar">
          {(Object.entries(screens)).map(([name, config]) => (
            <Stack.Screen
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
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
