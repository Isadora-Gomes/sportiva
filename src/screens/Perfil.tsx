import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Icon from "../components/icon";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationParameter } from "../routes/Routes";

const Perfil = ({ navigation }: NavigationParameter) => {
    const redirecionarCadastro = () => {
        navigation.navigate("Cadastro")
    }

    const { width, height } = Dimensions.get('window');

    return (
        <SafeAreaView
            edges={["bottom"]}
            style={{
                height,
                backgroundColor: "#000",
                width
            }}
        >
            <View style={{
                height: height * 0.25,
                justifyContent: 'center',
                boxSizing: 'border-box',
            }}>
                <Text style={styles.titulo}>Perfil</Text>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: '#121212', flex: 1, marginTop: -80 }}>
                <TouchableOpacity style={styles.divfoto}>
                    <View style={styles.foto}>
                        <Image
                            source={require("../../assets/img/perfil.png")}
                            style={{ width: 120, height: 120, borderRadius: 60 }}
                        />
                    </View>
                    <Text style={{ color: "#d2d2d2", fontSize: 16, fontWeight: 600 }}>Alterar Foto</Text>
                </TouchableOpacity>
                <Text style={styles.label}>Nome</Text>
                <View style={styles.inputContainer}>
                    <Icon name="user" size={20} color="#fff" style={{ marginRight: 10 }} />
                    <TextInput
                        style={styles.input}
                    />
                </View>

                <Text style={styles.label}>E-mail</Text>
                <View style={styles.inputContainer}>
                    <Icon name="envelope" size={20} color="#fff" style={{ marginRight: 10 }} />
                    <TextInput
                        style={styles.input}
                    />
                </View>

                <Text style={styles.label}>Senha atual</Text>
                <View style={styles.inputContainer}>
                    <Icon name="lock" size={20} color="#fff" style={{ marginRight: 10 }} />
                    <TextInput
                        style={styles.input}
                        secureTextEntry
                    />
                </View>

                <Text style={styles.label}>Nova senha</Text>
                <View style={styles.inputContainer}>
                    <Icon name="lock" size={20} color="#fff" style={{ marginRight: 10 }} />
                    <TextInput
                        style={styles.input}
                        secureTextEntry
                    />
                </View>

                <Text style={styles.label}>Confirmar nova senha</Text>
                <View style={styles.inputContainer}>
                    <Icon name="lock" size={20} color="#fff" style={{ marginRight: 10 }} />
                    <TextInput
                        style={styles.input}
                        secureTextEntry
                    />
                </View>

                <TouchableOpacity style={styles.button} >
                    <Text style={styles.buttonText}>Salvar alterações</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
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

    },
    titulo: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 500,
        fontFamily: 'Outfit',
        padding: 30,
        textAlign: 'left',
        width: '100%',
        height: 100,
        backgroundColor: '#8400FF'
    },
    label: {
        color: '#D2D2D2',
        fontSize: 16,
        marginBottom: 5,
        fontFamily: 'Gotham',
        alignSelf: 'flex-start',
        marginLeft: 40,
        fontWeight: 600,
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
        width: 300,
        borderRadius: 17,
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
        marginBottom: 80,
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
    divfoto: {
        alignItems: "center",
        marginBottom: 20,
    },
    foto: {
        width: 140,
        height: 140,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 13,
    },
});

export default Perfil;