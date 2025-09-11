import "react-native-gesture-handler";
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';

import CustomDrawerContent from './src/component/drawerContent';
import Cadastro from './src/screens/Cadastro';
import Entrar from './src/screens/Entrar';
import Pesquisa from './src/screens/Pesquisa';
import Produto from './src/screens/Produto';
import Inicio from './src/screens/Inicio';
import Carrinho from './src/screens/Carrinho';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="rgb(19, 19, 24)" />
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Entrar"
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            drawerContentStyle: { backgroundColor: 'rgb(30,30,36)' },
            drawerInactiveTintColor: '#aaa',
            drawerActiveTintColor: 'rgb(76, 0, 216)',
            headerStyle: { backgroundColor: 'rgb(19, 19, 24)' },
            headerTintColor: '#fff',
          }}>
          <Drawer.Screen name="Pesquisa" component={Pesquisa} />
          <Drawer.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false, drawerItemStyle: { display: 'none' } }} />
          <Drawer.Screen name="Entrar" component={Entrar} options={{ headerShown: false, drawerItemStyle: { display: 'none' } }} />
          <Drawer.Screen name="Produto" component={Produto} options={{ drawerItemStyle: { display: 'none' } }} />
          <Drawer.Screen name="Inicio" component={Inicio} options={{ title: "Inicio" }} />
          <Drawer.Screen name="Carrinho" component={Carrinho} options={{ title: "Carrinho" }} />
        </Drawer.Navigator>
      </NavigationContainer>
    </View>
  );
}
