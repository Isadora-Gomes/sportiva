import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';

const FimCompra = () => {
    const navigation = useNavigation();

    return (
        <View style={estilos.container}>
            <View style={estilos.topo}>
                <Image style={{ width: 250, height: 100, marginTop: 20 }} source={require('../../assets/img/logo.png')} />
            </View>
            <View style={estilos.main}>
                <Text style={{ color: '#fff', fontSize: 45, fontWeight: 'bold', marginBottom: 20 }}>
                    Obrigado!
                </Text>

                <Text style={{ color: '#fff', fontSize: 20, marginBottom: 20, textAlign: 'center' }}>
                    Seu pedido #1127121 foi confirmado!
                </Text>

                <Text style={{ color: '#fff', fontSize: 16, marginBottom: 30, textAlign: 'justify', width: '90%' }}>
                    Enviamos um e-mail para ana@gmail.com com a confirmação do seu 
                    pedido e o recibo. Se o e-mail não chegar em dois minutos, verifique 
                    sua caixa de spam para ver se o e-mail foi direcionado para lá.
                </Text>

                <TouchableOpacity style={estilos.botaoContinuar}>
                    <Text style={estilos.textoBotao}
                        onPress={() => navigation.navigate('Produto' as never)}>Continuar comprando</Text>
                </TouchableOpacity>
                <Text style={{ color: '#fff', fontSize: 16, textDecorationLine: 'underline' }}
                onPress={() => navigation.navigate('Inicio' as never)}>
                    Voltar ao início
                </Text>
            </View>
        </View>
    );
};

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f0f10',
        width: '100%',
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    topo: {
        width: '100%',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    main: {
        backgroundColor: '#0f0f10',
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    botaoContinuar: {
        backgroundColor: '#8000ff',
        width: '90%',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    textoBotao: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default FimCompra;