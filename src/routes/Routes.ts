import { NavigationProp, ParamListBase, RouteProp } from "@react-navigation/native"
import Entrar from "../screens/Entrar";
import Cadastro from "../screens/Cadastro";
import Carrinho from "../screens/Carrinho";
import Inicio from "../screens/Inicio";
import Pesquisa from "../screens/Pesquisa";
import Perfil from "../screens/Perfil";
import Produto from '../screens/Produto';
import React from "react";
import { NativeStackNavigationOptions, NativeStackNavigationProp } from "@react-navigation/native-stack";
import Detalhes from "../screens/Detalhes";
import Detalhes2 from "../screens/Detalhes2";
import Detalhes3 from "../screens/Detalhes3";
import Detalhes4 from "../screens/Detalhes4";

type NativeStackNavigationOptionsCallback = (props: {
    route: RouteProp<ParamListBase, "Cadastro">;
    navigation: NativeStackNavigationProp<ParamListBase, string, undefined>;
    theme: ReactNavigation.Theme;
}) => NativeStackNavigationOptions | undefined;

type NavigationParameterItem<P extends ScreenNames> = NavigationParameter<P> & NavigationParameter

export interface ParamItem<P extends ScreenNames, T = undefined> {
    component: React.ComponentType<NavigationParameterItem<P>>,
    // params: T,
    options?: NativeStackNavigationOptions
        | NativeStackNavigationOptionsCallback
        | undefined
}

class Screens {
    private constructor() {}

    Entrar: ParamItem<"Entrar"> = { component: Entrar, options: { headerShown: false } };
    Cadastro: ParamItem<"Cadastro"> = { component: Cadastro, options: { headerShown: false } };
    Carrinho: ParamItem<"Carrinho"> = { component: Carrinho, options: { headerShown: false } };
    Inicio: ParamItem<"Inicio"> = { component: Inicio, options: { title: "Início" } };
    Pesquisa: ParamItem<"Pesquisa"> = { component: Pesquisa, options: { headerShown: false } };
    Perfil: ParamItem<"Perfil"> = { component: Perfil, options: { headerShown: false } };
    Produto: ParamItem<"Produto"> = { component: Produto, options: { headerShown: false } };
    Detalhes: ParamItem<"Detalhes"> = { component: Detalhes, options: { headerShown: false } };
    Detalhes2: ParamItem<"Detalhes2"> = { component: Detalhes2, options: { headerShown: false } };
    Detalhes3: ParamItem<"Detalhes3"> = { component: Detalhes3, options: { headerShown: false } };
    Detalhes4: ParamItem<"Detalhes4"> = { component: Detalhes4, options: { headerShown: false } };

    static readonly instance = new Screens();
}

export const screens = Screens.instance;

export type ScreenNames = keyof Screens;

export type RootStackParamList = {
    [K in keyof Screens]: Screens[K] extends ParamItem<K, infer T> ? T : undefined;
}

export interface NavigationParameter<N extends ScreenNames | undefined = undefined> {
    navigation: NavigationProp<RootStackParamList>,
    route: N extends ScreenNames ? RouteProp<RootStackParamList, N> : RouteProp<RootStackParamList>
}