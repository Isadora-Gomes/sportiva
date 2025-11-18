import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from "react-native";
import Icon from "../components/icon";
import { useNavigation } from '@react-navigation/native';

const InfoEntrega = () => {
    const navigation = useNavigation();

    const [cupom, setCupom] = useState("");
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [endereco, setEndereco] = useState("");
    const [tel, setTel] = useState("");
    const [obs, setObs] = useState("");

    const scrollRef = useRef<ScrollView | null>(null);
    const [inputsY, setInputsY] = useState<number>(0);

    const scrollToInputs = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({ y: inputsY, animated: true });
        }
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#0f0f10' }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 60}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView ref={scrollRef} style={estilos.container} contentContainerStyle={{ alignItems: 'center', flexGrow: 1, paddingBottom: 20 }} keyboardShouldPersistTaps={'handled'}>
            <View style={estilos.topo}>
                <TouchableOpacity style={estilos.iconVoltar} onPress={() => navigation.navigate('Carrinho' as never)}>
                    <Icon name="chevron-left" size={20} color="#fff" />
                </TouchableOpacity>
                <Image source={require('../../assets/img/logo2.png')} />
            </View>

            <View style={estilos.cupomContainer}>
                <Text style={estilos.prefixo}>CUPOM:</Text>
                <TextInput
                    style={estilos.input}
                    value={cupom}
                    onChangeText={setCupom}
                    underlineColorAndroid="transparent"
                />
                <TouchableOpacity style={estilos.aplicar}>
                    <Text>Aplicar</Text>
                </TouchableOpacity>
            </View>

            <View style={estilos.produtoContainer}>
                <Image source={require('../../assets/img/produto4.png')} style={estilos.produtoImagem} />
                <View style={estilos.produtoInfo}>
                    <Text style={estilos.produtoNome}>CAMISETA FLOW</Text>
                    <Text style={estilos.produtoPreco}>R$ 199,90</Text>
                    <Text style={estilos.produtoDetalhe}>Camiseta roxa</Text>
                    <Text style={estilos.produtoDetalhe}>Tamanho M</Text>
                </View>
            </View>

            <Text style={estilos.subtotal}>SUBTOTAL : R$ 199,90</Text>

            <View style={{ width: '100%' }} onLayout={(e) => setInputsY(e.nativeEvent.layout.y)}>
                <Text style={estilos.entregaTitulo}>Informações de entrega</Text>
                <TextInput
                    style={estilos.inputEntrega}
                    placeholder="Nome completo"
                    placeholderTextColor="#888"
                    value={nome}
                    onChangeText={setNome}
                    onFocus={scrollToInputs}
                />
                <TextInput
                    style={estilos.inputEntrega}
                    placeholder="Email"
                    placeholderTextColor="#888"
                    value={email}
                    onChangeText={setEmail}
                    onFocus={scrollToInputs}
                />
                <TextInput
                    style={estilos.inputEntrega}
                    placeholder="Endereço"
                    placeholderTextColor="#888"
                    value={endereco}
                    onChangeText={setEndereco}
                    onFocus={scrollToInputs}
                />
                <TextInput
                    style={estilos.inputEntrega}
                    placeholder="Tel"
                    placeholderTextColor="#888"
                    value={tel}
                    onChangeText={setTel}
                    onFocus={scrollToInputs}
                />
                <TextInput
                    style={estilos.inputEntrega}
                    placeholder="Observações"
                    placeholderTextColor="#888"
                    value={obs}
                    onChangeText={setObs}
                    onFocus={scrollToInputs}
                />
            </View>

            <TouchableOpacity
                style={estilos.botaoContinuar}
                onPress={() => navigation.navigate('Pagamento' as never)}
            >
                <Text style={estilos.textoBotao}>Continuar pagamento</Text>
            </TouchableOpacity>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f0f10',
        width: '100%',
        paddingHorizontal: 20,
    },
    topo: {
        width: '100%',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    iconVoltar: {
        marginLeft: 20,
        left: 0,
        position: 'absolute',
    },
    cupomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#8d8d8dff',
        width: '100%',
        height: 40,
        marginBottom: 20,
    },
    prefixo: {
        color: '#fff',
        marginRight: 10,
        marginLeft: 15,
    },
    input: {
        flex: 1,
        color: '#fff',
        fontSize: 16,
        paddingVertical: 0,
        height: '80%',
    },
    aplicar: {
        backgroundColor: '#fff',
        height: 40,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        marginLeft: 10,
    },
    produtoContainer: {
        flexDirection: 'row',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        width: '100%',
    },
    produtoImagem: {
        width: 100,
        height: 120,
        borderRadius: 10,
        backgroundColor: '#ebebebff',
    },
    produtoInfo: {
        marginLeft: 10,
        justifyContent: 'space-around',
    },
    produtoNome: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    produtoPreco: {
        color: '#fff',
        fontSize: 14,
    },
    produtoDetalhe: {
        color: '#aaa',
        fontSize: 12,
    },
    subtotal: {
        color: '#fff',
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginBottom: 10,
        fontSize: 18,
    },
    entregaTitulo: {
        color: '#fff',
        alignSelf: 'flex-start',
        marginBottom: 10,
        marginTop: 10,
        fontWeight: 'bold',
    },
    inputEntrega: {
        width: '100%',
        height: 40,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#8d8d8dff',
        paddingHorizontal: 10,
        color: '#fff',
        marginBottom: 10,
    },
    botaoContinuar: {
        backgroundColor: '#8000ff',
        width: '100%',
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

export default InfoEntrega;