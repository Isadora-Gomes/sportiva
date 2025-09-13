import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Cadastro from '../screens/Cadastro';
import Entrar from '../screens/Entrar';
import Pesquisa from '../screens/Pesquisa';
import Produto from '../screens/Produto';
import Inicio from '../screens/Inicio';
import Carrinho from '../screens/Carrinho';

const Stack = createNativeStackNavigator();

export default function NativeStack() {
    return (
        <Stack.Navigator initialRouteName="Entrar">
            <Stack.Screen name="Entrar" component={Entrar} />
            <Stack.Screen name="Cadastro" component={Cadastro} />
            <Stack.Screen name="Pesquisa" component={Pesquisa} />
            <Stack.Screen name="Produto" component={Produto} />
            <Stack.Screen name="Inicio" component={Inicio} />
            <Stack.Screen name="Carrinho" component={Carrinho} />
        </Stack.Navigator>
    );
}