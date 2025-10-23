import "react-native-gesture-handler";
import { View, StatusBar, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { screens } from "./src/routes/Routes";
import Icon from 'react-native-vector-icons/FontAwesome';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ flex: 1, backgroundColor: '#0f0f10', paddingTop: 0 }}
    >
      <View style={styles.header}>
        <Image source={require('./assets/img/logoSlim.png')} style={styles.logo} />
      </View>

      {Object.entries(screens).map(([name, config]) => {
        let iconName = "";
        if (name.toLowerCase().includes("inicio")) iconName = "home";
        else if (name.toLowerCase().includes("produto")) iconName = "shopping-bag";
        else if (name.toLowerCase().includes("carrinho")) iconName = "shopping-cart";
        else if (name.toLowerCase().includes("historico")) iconName = "history";

        return (
          <DrawerItem
            key={name}
            label={name}
            labelStyle={styles.label}
            icon={() => <Icon name={iconName} size={20} color="#fff" />}
            onPress={() => props.navigation.navigate(name)}
          />
        );
      })}

      <View style={styles.footer}>
        <View style={styles.userInfo}>
          <Icon onPress={() => props.navigation.navigate('Perfil' as never)} name="user-circle" size={40} color="#ffffffff" />
          <Text onPress={() => props.navigation.navigate('Perfil' as never)} style={styles.userText}>Usuário</Text>
        </View>
        <TouchableOpacity onPress={() => props.navigation.navigate('Entrar' as never)}>
          <Icon name="sign-out" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="#0f0f10" />
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Produto"
          screenOptions={{ headerShown: false, drawerStyle: { width: 250 } }}
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          {Object.entries(screens).map(([name, config]) => (
            <Drawer.Screen
              key={name}
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

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    alignItems: 'flex-start',
    backgroundColor: '#0f0f10',
    borderBottomColor: '#1f1f1f',
    borderBottomWidth: 1,
  },
  logo: { width: 200, height: 100, resizeMode: 'contain' },
  label: { color: '#fff', fontSize: 18, marginLeft: 0 },
  footer: {
    marginTop: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopColor: '#1f1f1f',
    borderTopWidth: 1,
    backgroundColor: '#161616',
    borderRadius: 5,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  userText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
});