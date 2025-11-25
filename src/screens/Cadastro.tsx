import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image, Dimensions, Alert } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Icon from "../components/icon";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationParameter } from "../routes/Routes";
import Form from "../util/form";
import { User } from "../features/user";
import { Failure } from "../util/result";

interface CadastroForm {
    nome: string;
    email: string;
    senha: string;
}

const form = new Form<CadastroForm>();

const Cadastro = ({ navigation, route }: NavigationParameter<"Cadastro">) => {
    form.use();
    
    const redirecionarCadastro = () => {
        navigation.navigate("Entrar")
    }

    const cadastrar = () => {
        console.log(form.fields);
        if (form.fields.nome && form.fields.email && form.fields.senha) {
            const result = User.register(form.fields.nome, form.fields.email, form.fields.senha);

            if (result instanceof Failure) {
                Alert.alert("Erro", String(result.failure));
            } else {
                navigation.navigate("Inicio");
            }
        } else {
            Alert.alert("Erro", "Por favor, preencha todos os campos.")
        }
    }

    const { width, height } = Dimensions.get('window');

    return (
        <SafeAreaView
            edges={[ "bottom" ]}
            style={{
                height,
                backgroundColor: "#000",
                width
            }}
        >
            <ImageBackground style={styles.background}>
                <View /* style={styles.container} */>
                    <View style={{}}>
                        <View style={{
                            backgroundColor: '#8400ff',
                            height: height * 0.25,
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
                                backgroundColor: '#8400FF',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                zIndex: 3,
                            }}></View>
                            <Svg height={height * 0.35} width={width} style={{ position: 'absolute' }}>
                                <Path d="M1 1C21 29 104.5 50 168.884 43.6348C246.326 35.9785 282.493 73.3906 285.5 77.5C288.507 81.6094 320.341 107.974 342 172.5C363.315 236 414 258 440 258V1H1Z" fill="#8400FF" stroke="#8400FF" />
                            </Svg>
                            <View style={{
                                height: height * 0.25,
                                justifyContent: 'center',
                                paddingLeft: 40,
                                boxSizing: 'border-box',
                            }}>
                                <Text style={styles.titulo}>Cadastro</Text>
                            </View>
                            <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 40, }}>
                                <Text style={styles.label}>Nome</Text>
                                <View style={styles.inputContainer}>
                                    <Icon name="user" size={20} color="#fff" style={{ marginRight: 10 }} />
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={(text) => form.set("nome", text)}
                                    />
                                </View>
                                <Text style={styles.label}>E-mail</Text>
                                <View style={styles.inputContainer}>
                                    <Icon name="envelope" size={20} color="#fff" style={{ marginRight: 10 }} />
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={(text) => form.set("email", text)}
                                    />
                                </View>
                                <Text style={styles.label}>Senha</Text>
                                <View style={styles.inputContainer}>
                                    <Icon name="lock" size={20} color="#fff" style={{ marginRight: 10 }} />
                                    <TextInput
                                        style={styles.input}
                                        secureTextEntry
                                        onChangeText={(text) => form.set("senha", text)}
                                    />
                                </View>

                                <TouchableOpacity style={styles.button} onPress={cadastrar}>
                                    <Text style={styles.buttonText}>Cadastrar-se</Text>
                                </TouchableOpacity>
                                <View style={styles.textEntrar}>
                                    <TouchableOpacity onPress={redirecionarCadastro}>
                                        <Text style={styles.linkCadastro}>
                                            Já possui uma conta? <Text style={styles.linkDestacado}>Entrar</Text>
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>
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
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        },
    
    titulo: {
        fontSize: 40,
        color: '#fff',
        fontWeight: 'bold',
        fontFamily: 'Outfit',
        borderBottomWidth: 2,
        borderBottomColor: '#8400FF',
        paddingBottom: 5,
        textAlign: 'center',
        width: 165,
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
    textEntrar: {
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
});

export default Cadastro;