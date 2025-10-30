import React, { useState } from "react";
import { View, Text, Image, ImageBackground, ScrollView, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationParameter } from "../routes/Routes";
import Icon from 'react-native-vector-icons/Feather';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerActions } from '@react-navigation/native';

const HistoricoCompras = ({ navigation }: NavigationParameter) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#0f0f10' }}>
            <ScrollView style={estilos.tela} contentContainerStyle={estilos.conteudoTela}>

                <View style={estilos.topo}>
                    <Image source={require('../../assets/img/logoSlim.png')} style={estilos.logo} />

                    <TouchableOpacity
                        style={estilos.botaoMenu}
                        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                    >
                        <Icon name="menu" size={28} color="#fff" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const estilos = StyleSheet.create({
    topo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 10,
    },
    botaoMenu: {
        padding: 8,
        borderRadius: 8,
    },
    tela: {
        flex: 1,
        backgroundColor: "#0f0f10",
    },
    conteudoTela: {
        paddingBottom: 40,
    },
    logo: {
        width: 146,
        height: 56,
        marginTop: 9,
        borderRadius: 6,
        position: "relative",
    },
});

export default HistoricoCompras;