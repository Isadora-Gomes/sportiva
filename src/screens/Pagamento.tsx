import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView } from "react-native";
import Icon from "../components/icon";
import { useNavigation } from '@react-navigation/native';

const Pagamento = () => {
    const navigation = useNavigation();

    const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

    return (
        <ScrollView style={estilos.container} contentContainerStyle={{ alignItems: 'center' }}>
            <View style={estilos.topo}>
                <TouchableOpacity style={estilos.iconVoltar} onPress={() => navigation.navigate('InfoEntrega' as never)}>
                    <Icon name="chevron-left" size={20} color="#fff" />
                </TouchableOpacity>
                <Image source={require('../../assets/img/logo2.png')} />
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

            <Text style={estilos.pagamentoTitulo}>Forma de pagamento</Text>

            <View style={estilos.linhaPagamento}>
                <TouchableOpacity
                    onPress={() => setSelectedPayment(selectedPayment === 'boleto' ? null : 'boleto')}
                    style={{
                        width: 24,
                        height: 24,
                        borderWidth: 2,
                        borderColor: '#414141ff',
                        backgroundColor: selectedPayment === 'boleto' ? '#8000ff' : '#0f0f10',
                        marginRight: 10
                    }}
                />
                <TextInput
                    style={estilos.inputBoleto}
                    value="Boleto"
                    editable={false}
                />
            </View>

            <View style={estilos.linhaPagamento}>
                <TouchableOpacity
                    onPress={() => setSelectedPayment(selectedPayment === 'cartao' ? null : 'cartao')}
                    style={{
                        width: 24,
                        height: 24,
                        borderWidth: 2,
                        borderColor: '#414141ff',
                        backgroundColor: selectedPayment === 'cartao' ? '#8000ff' : '#0f0f10',
                        marginRight: 10
                    }}
                />
                <TextInput
                    style={estilos.inputCartao}
                    value="Cartão"
                    editable={false}
                />
            </View>

            <View style={estilos.linhaPagamento}>
                <TouchableOpacity
                    onPress={() => setSelectedPayment(selectedPayment === 'pix' ? null : 'pix')}
                    style={{
                        width: 24,
                        height: 24,
                        borderWidth: 2,
                        borderColor: '#414141ff',
                        backgroundColor: selectedPayment === 'pix' ? '#8000ff' : '#0f0f10',
                        marginRight: 10
                    }}
                />
                <TextInput
                    style={estilos.inputPix}
                    value="Pix"
                    editable={false}
                />
            </View>

            <TouchableOpacity
                style={estilos.botaoContinuar}
                onPress={() => navigation.navigate('FimCompra' as never)}
            >
                <Text style={estilos.textoBotao}>Finalizar compra</Text>
            </TouchableOpacity>
        </ScrollView>
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
    pagamentoTitulo: {
        color: '#fff',
        alignSelf: 'flex-start',
        marginBottom: 20,
        marginTop: 10,
        fontWeight: 'bold',
    },
    linhaPagamento: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        width: '100%',
    },
    inputBoleto: {
        flex: 1,
        height: 40,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#8d8d8dff',
        paddingHorizontal: 10,
        color: '#fff',
    },
    inputCartao: {
        flex: 1,
        height: 40,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#8d8d8dff',
        paddingHorizontal: 10,
        color: '#fff',
    },
    inputPix: {
        flex: 1,
        height: 40,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#8d8d8dff',
        paddingHorizontal: 10,
        color: '#fff',
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

export default Pagamento;