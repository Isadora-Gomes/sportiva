import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';

const Cadastro = ({ navigation }) => {
    const redirecionarEntrar = () => {
        navigation.navigate("Entrar")
    }
    return (
        <ImageBackground  style={styles.background}>
            <View style={styles.container}>
                <Image
                    style={styles.logo}
                    
                />
                <Text style={styles.titulo}>Cadastre-se</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nome"
                />
                <TextInput
                    style={styles.input}
                    placeholder="E-mail"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.button} >
                    <Text style={styles.buttonText}>Cadastro</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.textCadastro}>
                <TouchableOpacity onPress={redirecionarEntrar}>
                    <Text style={styles.linkCadastro}>
                        Já tem uma conta? <Text style={styles.linkDestacado}>Entrar</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#1E1E1E',
    },
    input: {
        height: 40,
        borderColor:'rgba(83, 72, 207, 0.73)',
        borderWidth: 1,
        backgroundColor: '#fff',
        marginBottom: 20,
        width: 300,
        paddingLeft: 10,
        borderRadius: 8,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 38,
        width: 110,
        borderRadius: 7,
        marginBottom: 20,
        marginTop: 20,
        backgroundColor: 'rgb(83, 72, 207)',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 800,
        fontFamily: 'Gotham',
    },
    textCadastro: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 60,
    },
    linkCadastro: {
        fontFamily: 'Gotham',
        fontSize: 16,
        color: '#000',
    },
    linkDestacado: {
        color: '#2c2dd7',
        textDecorationLine: 'underline',
    },
});

export default Cadastro;