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

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="rgb(19, 19, 24)" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Entrar">
          <Stack.Screen name="Pesquisa" component={Pesquisa} />
          <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false, drawerItemStyle: { display: 'none' } }} />
          <Stack.Screen name="Entrar" component={Entrar} options={{ headerShown: false, drawerItemStyle: { display: 'none' } }} />
          <Stack.Screen name="Produto" component={Produto} options={{ headerShown: false, drawerItemStyle: { display: 'none' } }} />
          <Stack.Screen name="Inicio" component={Inicio} options={{ title: "Inicio" }} />
          <Stack.Screen name="Carrinho" component={Carrinho} options={{ title: "Carrinho" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
