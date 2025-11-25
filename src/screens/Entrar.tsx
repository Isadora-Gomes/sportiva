import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image, Dimensions, ScrollView, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, Modal, Alert } from 'react-native';
import Svg, { Path } from 'react-native-svg';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from "../components/icon";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationParameter } from "../routes/Routes";
import Form from "../util/form";
import { User } from "../features/user";
import { Failure } from "../util/result";

interface EntrarForm {
    email: string;
    senha: string;
}

const form: Form<EntrarForm> = new Form({});

const Entrar = ({ navigation }: NavigationParameter<"Entrar">) => {
    form.use();

    const redirecionarCadastro = () => {
        navigation.navigate("Cadastro")
    }

    const entrar = async () => {
        // return navigation.navigate("Inicio");
        if (form.fields.email && form.fields.senha) {
            const result = await User.login(form.fields.email!, form.fields.senha!);

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

    const scrollRef = useRef<ScrollView | null>(null);
    const [inputsY, setInputsY] = useState<number>(0);

    const scrollToInputs = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({ y: inputsY, animated: true });
        }
    };

    return (
        <SafeAreaView
            edges={["bottom"]}
            style={{
                height,
                backgroundColor: "#000",
                width
            }}
        >
            <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#000' }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={60}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView ref={scrollRef} style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps={'handled'}>
                        <ImageBackground style={styles.background}>
                            <View style={styles.container}>
                                <View style={{}}>
                                    <View style={{
                                        backgroundColor: '#8400ff',
                                        height: height * 0.35,
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
                                            <Text style={styles.titulo}>Entrar</Text>
                                        </View>
                                        <View style={{ alignItems: 'center', justifyContent: 'center' }} onLayout={(e) => setInputsY(e.nativeEvent.layout.y)}>
                                            <Text style={styles.label}>E-mail</Text>
                                            <View style={styles.inputContainer}>
                                                <Icon name="envelope" size={20} color="#fff" style={{ marginRight: 10 }} />
                                                <TextInput
                                                    style={styles.input}
                                                    onFocus={scrollToInputs}
                                                    onChangeText={(text) => form.set("email", text)}
                                                />
                                            </View>
                                            <Text style={styles.label}>Senha</Text>
                                            <View style={styles.inputContainer}>
                                                <Icon name="lock" size={20} color="#fff" style={{ marginRight: 10 }} />
                                                <TextInput
                                                    style={styles.input}
                                                    secureTextEntry
                                                    onFocus={scrollToInputs}
                                                    onChangeText={(text) => form.set("senha", text)}
                                                />
                                            </View>

                                            <TouchableOpacity style={styles.button} onPress={entrar} >
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
                        </ImageBackground>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
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
        width: 120,
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
});

export default Entrar;