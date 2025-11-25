import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, Alert, ActivityIndicator } from "react-native";
import Icon from "../components/icon";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NavigationParameter } from "../routes/Routes";
import { User } from "../features/user";
import { Coupon, Cart, Product, ProductOption } from "../features/product";
import { Success, Failure } from "../util/result";

const Pagamento = ({ navigation }: NavigationParameter<"Pagamento">) => {
    const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
    const [user, setUser] = useState<User.UserSession | null>(null);
    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState(true);
    const [cupomCodigo, setCupomCodigo] = useState('');
    const [cupomAplicado, setCupomAplicado] = useState<Coupon | null>(null);
    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [finalizandoCompra, setFinalizandoCompra] = useState(false);

    const loadData = async () => {
        try {
            setLoading(true);
            const userSession = User.auth;
            setUser(userSession);

            if (userSession) {
                const cartResult = await userSession.getCarrinho();
                if (cartResult instanceof Success) {
                    const carrinho = cartResult.result;
                    setCart(carrinho);
                    
                    // Calcular subtotal
                    let valor = 0;
                    carrinho.items.forEach((item: { quantidade: number, opcao: ProductOption | null }, produto: Product) => {
                        valor += produto.preco * item.quantidade;
                    });
                    setSubtotal(valor);
                    setTotal(valor);
                }
            }
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            loadData();
        }, [])
    );

    const aplicarCupom = () => {
        const cupom = Coupon.buscarPorCodigo(cupomCodigo);
        if (cupom && cupom.isValido()) {
            setCupomAplicado(cupom);
            const desconto = cupom.calcularDesconto(subtotal);
            setTotal(Math.max(0, subtotal - desconto));
            Alert.alert("Cupom Aplicado!", `Desconto de R$ ${desconto.toFixed(2).replace('.', ',')} aplicado com sucesso!`);
        } else {
            Alert.alert("Cupom Inválido", "O código do cupom informado não é válido.");
            setCupomCodigo('');
        }
    };

    const removerCupom = () => {
        setCupomAplicado(null);
        setTotal(subtotal);
        setCupomCodigo('');
    };

    const finalizarCompra = async () => {
        if (!user) {
            Alert.alert("Erro", "Você precisa estar logado para finalizar a compra");
            return;
        }

        if (!selectedPayment) {
            Alert.alert("Erro", "Selecione uma forma de pagamento");
            return;
        }

        if (!cart || cart.items.size === 0) {
            Alert.alert("Erro", "Seu carrinho está vazio");
            return;
        }

        setFinalizandoCompra(true);
        try {
            const result = await user.finalizarCompra(cupomAplicado);
            if (result instanceof Success) {
                Alert.alert(
                    "Compra Realizada!",
                    `Sua compra foi finalizada com sucesso!\nTotal: R$ ${total.toFixed(2).replace('.', ',')}`,
                    [
                        {
                            text: "OK",
                            onPress: () => navigation.navigate('FimCompra')
                        }
                    ]
                );
            } else {
                Alert.alert("Erro", result.failure?.message || "Erro ao finalizar compra");
            }
        } catch (error) {
            console.error("Erro ao finalizar compra:", error);
            Alert.alert("Erro", "Erro interno ao processar compra");
        } finally {
            setFinalizandoCompra(false);
        }
    };

    return (
        <ScrollView style={estilos.container} contentContainerStyle={{ alignItems: 'center' }}>
            <View style={estilos.topo}>
                <TouchableOpacity style={estilos.iconVoltar} onPress={() => navigation.navigate('InfoEntrega')}>
                    <Icon name="chevron-left" size={20} color="#fff" />
                </TouchableOpacity>
                <Image source={require('../../assets/img/logo2.png')} />
            </View>

            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 50 }}>
                    <ActivityIndicator size="large" color="#8400FF" />
                    <Text style={{ color: '#fff', marginTop: 10 }}>Carregando...</Text>
                </View>
            ) : !user ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 50 }}>
                    <Text style={{ color: '#fff', fontSize: 16, textAlign: 'center', marginBottom: 20 }}>
                        Você precisa estar logado para finalizar a compra.
                    </Text>
                    <TouchableOpacity 
                        style={[estilos.finalizarBtn, { backgroundColor: '#8000ff' }]}
                        onPress={() => navigation.navigate('Entrar')}
                    >
                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>FAZER LOGIN</Text>
                    </TouchableOpacity>
                </View>
            ) : !cart || cart.items.size === 0 ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 50 }}>
                    <Text style={{ color: '#fff', fontSize: 16, textAlign: 'center', marginBottom: 20 }}>
                        Seu carrinho está vazio.
                    </Text>
                    <TouchableOpacity 
                        style={[estilos.finalizarBtn, { backgroundColor: '#8000ff' }]}
                        onPress={() => navigation.navigate('Produto')}
                    >
                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>CONTINUAR COMPRANDO</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <>
                    {/* Produtos do carrinho */}
                    {Array.from(cart.items.entries()).map(([produto, item]) => (
                        <View key={produto.id} style={estilos.produtoContainer}>
                            <Image source={{ uri: produto.imagem.getUrl() }} style={estilos.produtoImagem} />
                            <View style={estilos.produtoInfo}>
                                <Text style={estilos.produtoNome}>{produto.nome.toUpperCase()}</Text>
                                <Text style={estilos.produtoPreco}>R$ {produto.preco.toFixed(2).replace('.', ',')}</Text>
                                <Text style={estilos.produtoDetalhe}>{produto.descricao}</Text>
                                {item.opcao && Array.isArray(item.opcao) && item.opcao.length > 0 && (
                                    <Text style={estilos.produtoDetalhe}>Opções: {item.opcao.join(', ')}</Text>
                                )}
                                <Text style={estilos.produtoDetalhe}>Quantidade: {item.quantidade}</Text>
                            </View>
                        </View>
                    ))}

                    {/* Seção de cupom */}
                    <View style={estilos.cupomContainer}>
                        <Text style={estilos.cupomTitulo}>Cupom de desconto</Text>
                        <View style={estilos.cupomInput}>
                            <TextInput
                                style={estilos.inputCupom}
                                placeholder="Digite o código do cupom"
                                placeholderTextColor="#666"
                                value={cupomCodigo}
                                onChangeText={setCupomCodigo}
                                editable={!cupomAplicado}
                            />
                            {!cupomAplicado ? (
                                <TouchableOpacity 
                                    style={estilos.btnAplicarCupom} 
                                    onPress={aplicarCupom}
                                    disabled={!cupomCodigo.trim()}
                                >
                                    <Text style={estilos.btnCupomText}>APLICAR</Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity style={estilos.btnRemoverCupom} onPress={removerCupom}>
                                    <Text style={estilos.btnCupomText}>REMOVER</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                        
                        {cupomAplicado && (
                            <View style={estilos.cupomAplicadoContainer}>
                                <Text style={estilos.cupomAplicadoText}>
                                    ✓ {cupomAplicado.codigo} - {cupomAplicado.descricao}
                                </Text>
                                <Text style={estilos.descontoText}>
                                    Desconto: R$ {(subtotal - total).toFixed(2).replace('.', ',')}
                                </Text>
                            </View>
                        )}

                        {/* Cupons disponíveis */}
                        <View style={estilos.cuponsDisponiveis}>
                            <Text style={estilos.cupomSubtitulo}>Cupons disponíveis:</Text>
                            <Text style={estilos.cupomInfo}>• BEMVINDO10 - 10% off em compras acima de R$ 50</Text>
                            <Text style={estilos.cupomInfo}>• FRETEGRATIS - Frete grátis acima de R$ 100</Text>
                            <Text style={estilos.cupomInfo}>• DESCONTO20 - 20% off acima de R$ 200</Text>
                            <Text style={estilos.cupomInfo}>• CINQUENTAOFF - R$ 50 off acima de R$ 300</Text>
                        </View>
                    </View>

                    <Text style={estilos.subtotal}>
                        SUBTOTAL: R$ {subtotal.toFixed(2).replace('.', ',')}
                    </Text>
                    {cupomAplicado && (
                        <Text style={estilos.desconto}>
                            DESCONTO: R$ {(subtotal - total).toFixed(2).replace('.', ',')}
                        </Text>
                    )}
                    <Text style={[estilos.subtotal, { fontSize: 18, fontWeight: 'bold' }]}>
                        TOTAL: R$ {total.toFixed(2).replace('.', ',')}
                    </Text>

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
                        style={[estilos.botaoContinuar, { 
                            backgroundColor: selectedPayment && !finalizandoCompra ? '#8000ff' : '#666',
                            opacity: selectedPayment && !finalizandoCompra ? 1 : 0.5 
                        }]}
                        onPress={finalizarCompra}
                        disabled={!selectedPayment || finalizandoCompra}
                    >
                        {finalizandoCompra ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={estilos.textoBotao}>Finalizar compra</Text>
                        )}
                    </TouchableOpacity>
                </>
            )}
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
    finalizarBtn: {
        backgroundColor: '#8000ff',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cupomContainer: {
        width: '100%',
        marginVertical: 20,
        padding: 16,
        backgroundColor: '#1f1f1f',
        borderRadius: 10,
    },
    cupomTitulo: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cupomSubtitulo: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    cupomInput: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    inputCupom: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#666',
        borderRadius: 8,
        paddingHorizontal: 12,
        color: '#fff',
        marginRight: 10,
    },
    btnAplicarCupom: {
        backgroundColor: '#8000ff',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    btnRemoverCupom: {
        backgroundColor: '#ff4444',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    btnCupomText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    cupomAplicadoContainer: {
        backgroundColor: '#2a5d2a',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    cupomAplicadoText: {
        color: '#4CAF50',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    descontoText: {
        color: '#4CAF50',
        fontSize: 12,
    },
    cuponsDisponiveis: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#2a2a2a',
        borderRadius: 8,
    },
    cupomInfo: {
        color: '#ccc',
        fontSize: 11,
        marginBottom: 2,
    },
    desconto: {
        color: '#4CAF50',
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginBottom: 5,
        fontSize: 14,
    },
});

export default Pagamento;