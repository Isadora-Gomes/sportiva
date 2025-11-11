import React, { useState } from "react";
import { View, Text, Image, ImageBackground, ScrollView, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationParameter } from "../routes/Routes";
import Icon from 'react-native-vector-icons/Feather';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerActions } from '@react-navigation/native';

const TelaInicio = ({ navigation }: NavigationParameter) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#0f0f10' }}>
        </SafeAreaView>
    );
}

const estilos = StyleSheet.create({
    tela: {
        flex: 1,
        backgroundColor: "#0f0f10",
    },
    logo: {
        width: 146,
        height: 56,
        marginTop: 9,
        borderRadius: 6,
        position: "relative",
    },
});

export default TelaInicio;