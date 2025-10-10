import { NavigationProp } from "@react-navigation/native"
import Entrar from "../screens/Entrar";
import Cadastro from "../screens/Cadastro";
import Carrinho from "../screens/Carrinho";
import Inicio from "../screens/Inicio";
import Pesquisa from "../screens/Pesquisa";
import Produto from '../screens/Produto';
import React from "react";

interface ParamItem<P = NavigationParameter> {
    component: React.ComponentType<P>,
    params: P | any
}

class Screens {
    Entrar: ParamItem = { component: Entrar, params: undefined };
    Cadastro: ParamItem = { component: Cadastro, params: undefined };
    Carrinho: ParamItem = { component: Carrinho, params: undefined };
    Inicio: ParamItem = { component: Inicio, params: undefined };
    Pesquisa: ParamItem = { component: Pesquisa, params: undefined };
    Produto: ParamItem = { component: Produto, params: undefined };
}

export type ScreenNames = keyof Screens;

export type RootStackParamList = {
    [K in keyof Screens]: Screens[K]['params'];
}

export interface NavigationParameter {
    navigation: NavigationProp<RootStackParamList>
}