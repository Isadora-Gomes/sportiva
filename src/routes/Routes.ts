import { NavigationProp, ParamListBase, RouteProp } from "@react-navigation/native"
import Entrar from "../screens/Entrar";
import Cadastro from "../screens/Cadastro";
import Carrinho from "../screens/Carrinho";
import Inicio from "../screens/Inicio";
import Pesquisa from "../screens/Pesquisa";
import Produto from '../screens/Produto';
import React from "react";
import { NativeStackNavigationOptions, NativeStackNavigationProp } from "@react-navigation/native-stack";
import Detalhes from "../screens/Detalhes";

type NativeStackNavigationOptionsCallback = (props: {
    route: RouteProp<ParamListBase, "Cadastro">;
    navigation: NativeStackNavigationProp<ParamListBase, string, undefined>;
    theme: ReactNavigation.Theme;
}) => NativeStackNavigationOptions | undefined;

export interface ParamItem<P = NavigationParameter> {
    component: React.ComponentType<P>,
    params: P | any,
    options?: NativeStackNavigationOptions
        | NativeStackNavigationOptionsCallback
        | undefined
}

class Screens {
    private constructor() {}

    Entrar: ParamItem = { component: Entrar, params: undefined, options: { headerShown: false } };
    Cadastro: ParamItem = { component: Cadastro, params: undefined, options: { headerShown: false } };
    Carrinho: ParamItem = { component: Carrinho, params: undefined, options: { headerShown: false } };
    Inicio: ParamItem = { component: Inicio, params: undefined, options: { title: "Início" } };
    Pesquisa: ParamItem = { component: Pesquisa, params: undefined, options: { headerShown: false } };
    Produto: ParamItem = { component: Produto, params: undefined, options: { headerShown: false } };
    Detalhes: ParamItem = { component: Detalhes, params: undefined, options: { headerShown: false } };

    static readonly instance = new Screens();
}

export const screens = Screens.instance;

export type ScreenNames = keyof Screens;

export type RootStackParamList = {
    [K in keyof Screens]: Screens[K]['params'];
}

export interface NavigationParameter {
    navigation: NavigationProp<RootStackParamList>
}