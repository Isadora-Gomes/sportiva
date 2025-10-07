import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Icon from 'react-native-vector-icons/FontAwesome';

const Entrar = ({ navigation }) => {
    const redirecionarCadastro = () => {
        navigation.navigate("Cadastro")
    }

    const { width, height } = Dimensions.get('window');

    return (
            <View style={styles.container}>
                <View style={{}}>
                    <View style={{
                        width: width,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Image
                            style={styles.logo}
                            source={require('../../assets/img/logo.png')}
                        />
                    </View>
                    <View style={{
                        position: 'relative',
                    }}>
                        <View style={{
                            height: 1,
                            width: width,
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            zIndex: 3,
                        }}></View>
                        
                        <View style={{
                            height: height * 0.25,
                            justifyContent: 'center',
                            paddingLeft: 40,
                            boxSizing: 'border-box',
                        }}>
                            <Text style={styles.titulo}>Produtos</Text>
                        </View>

                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={styles.label}>E-mail</Text>
                            <View style={styles.inputContainer}>
                                <Icon name="envelope" size={20} color="#fff" style={{ marginRight: 10 }} />
                                <TextInput
                                    style={styles.input}
                                />
                            </View>
                            <Text style={styles.label}>Senha</Text>
                            <View style={styles.inputContainer}>
                                <Icon name="lock" size={20} color="#fff" style={{ marginRight: 10 }} />
                                <TextInput
                                    style={styles.input}
                                    secureTextEntry
                                />
                            </View>

                            <TouchableOpacity style={styles.button} >
                                <Text style={styles.buttonText}>Entrar</Text>
                            </TouchableOpacity>
                            <View style={styles.textCadastro}>
                                <TouchableOpacity onPress={redirecionarCadastro}>
                                    <Text style={styles.linkCadastro}>
                                        Não possui uma conta? <Text style={styles.linkDestacado}>Cadastre-se</Text>
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#000',
    },
    logo: {
        width: 400,
        height: 200,
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    titulo: {
        fontSize: 40,
        color: '#fff',
        fontWeight: 'bold',
        fontFamily: 'Outfit',
        borderBottomWidth: 2,
        borderBottomColor: '#8400FF',
        paddingBottom: 10,
        textAlign: 'center',
        width: 160,
    },
    label: {
        color: '#D2D2D2',
        fontSize: 16,
        marginBottom: 5,
        fontFamily: 'Gotham',
        alignSelf: 'flex-start',
        marginLeft: 40,
    },
    input: {
        flex: 1,
        height: 40,
        color: '#fff',
        fontFamily: 'Gotham',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#8400FF',
        marginBottom: 20,
        width: 300,
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
        color: '#AFAFAF',
    },
    linkDestacado: {
        color: '#8400FF',
        textDecorationLine: 'underline',
    },
});

export default Entrar;