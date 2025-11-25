import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { DrawerActions, useFocusEffect } from "@react-navigation/native";
import { NavigationParameter } from "../routes/Routes";
import { FontAwesome6 as Icon } from "@expo/vector-icons";
import { User } from "../features/user";
import { Purchase } from "../features/product";
import { Success, Failure } from "../util/result";

const HistoricoCompras = ({ navigation }: NavigationParameter) => {
    const insets = useSafeAreaInsets();
    const [user, setUser] = useState<User.UserSession | null>(null);
    const [compras, setCompras] = useState<Purchase[]>([]);
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        try {
            setLoading(true);
            const userSession = User.auth;
            setUser(userSession);

            if (userSession) {
                const result = await userSession.obterHistoricoCompras();
                if (result instanceof Success) {
                    setCompras(result.result);
                } else {
                    console.error('Erro ao carregar histórico:', result.failure);
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

    const formatarData = (data: Date) => {
        return data.toLocaleDateString('pt-BR');
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#0f0f10", paddingTop: insets.top }}>
            <ScrollView style={estilos.tela} contentContainerStyle={{ paddingBottom: 40 }}>

                {/* TOPO */}
                <View style={estilos.topo}>
                    <Image
                        source={require('../../assets/img/logoSlim.png')}
                        style={estilos.logo}
                    />

                    <TouchableOpacity
                        style={estilos.botaoMenu}
                        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                    >
                        <Icon name="bars" size={28} color="#fff" />
                    </TouchableOpacity>
                </View>

                {/* TÍTULO */}
                <Text style={estilos.titulo}>Histórico de Compras</Text>

                {loading ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 50 }}>
                        <ActivityIndicator size="large" color="#8400FF" />
                        <Text style={{ color: '#fff', marginTop: 10 }}>Carregando histórico...</Text>
                    </View>
                ) : !user ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 50 }}>
                        <Text style={{ color: '#fff', fontSize: 16, textAlign: 'center', marginBottom: 20 }}>
                            Você precisa estar logado para ver seu histórico de compras.
                        </Text>
                        <TouchableOpacity 
                            style={estilos.botaoLogin}
                            onPress={() => navigation.navigate('Entrar')}
                        >
                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>FAZER LOGIN</Text>
                        </TouchableOpacity>
                    </View>
                ) : compras.length === 0 ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 50 }}>
                        <Icon name="shopping-cart" size={64} color="#666" />
                        <Text style={{ color: '#fff', fontSize: 16, textAlign: 'center', marginTop: 20, marginBottom: 20 }}>
                            Você ainda não fez nenhuma compra.
                        </Text>
                        <TouchableOpacity 
                            style={estilos.botaoLogin}
                            onPress={() => navigation.navigate('Produto')}
                        >
                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>COMEÇAR A COMPRAR</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={estilos.conteudoLista}>
                        {compras.map((compra, index) => (
                            <View key={compra.id} style={estilos.compraContainer}>
                                {/* Cabeçalho da compra */}
                                <View style={estilos.compraHeader}>
                                    <Text style={estilos.compraId}>Compra #{compra.id}</Text>
                                    <Text style={estilos.compraData}>{formatarData(compra.data)}</Text>
                                </View>
                                
                                {/* Itens da compra */}
                                {compra.items.map((item, itemIndex) => (
                                    <View key={itemIndex} style={estilos.itemLinha}>
                                        <View style={estilos.boxCompra}>
                                            <Image 
                                                source={item.produto ? { uri: item.produto.imagem.getUrl() } : require('../../assets/img/produto1.png')} 
                                                style={estilos.imgProduto} 
                                            />
                                            <View style={estilos.colunaInfos}>
                                                <Text style={estilos.nomeProduto}>
                                                    {item.produto ? item.produto.nome : "Produto não disponível"}
                                                </Text>
                                                <Text style={estilos.detalhesProduto}>
                                                    {item.produto && item.produto.descricao}
                                                </Text>
                                                {item.opcao && Array.isArray(item.opcao) && item.opcao.length > 0 && (
                                                    <Text style={estilos.detalhesProduto}>
                                                        Opções: {item.opcao.join(', ')}
                                                    </Text>
                                                )}
                                                <Text style={estilos.detalhesProduto}>
                                                    Quantidade: {item.quantidade}
                                                </Text>
                                            </View>
                                            <View style={estilos.colunaPreco}>
                                                <Text style={estilos.preco}>
                                                    R$ {item.produto ? (item.produto.preco * item.quantidade).toFixed(2).replace('.', ',') : '0,00'}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                ))}

                                {/* Rodapé da compra com total e cupom */}
                                <View style={estilos.compraFooter}>
                                    {compra.cupom && compra.cupom.codigo && (
                                        <Text style={estilos.cupomInfo}>
                                            Cupom aplicado: {compra.cupom.codigo} - {compra.cupom.descricao}
                                        </Text>
                                    )}
                                    <Text style={estilos.totalCompra}>
                                        Total: R$ {compra.preco.toFixed(2).replace('.', ',')}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>
                )}

                {/* RODAPÉ */}
                <View style={estilos.rodape}>
                    <Image
                        source={require('../../assets/img/logo2.png')}
                        style={{ width: 60, height: 60, marginTop: 30 }}
                    />
                    <Text style={estilos.textoRodape}>
                        Os melhores produtos esportivos, ofertas exclusivas e tudo o que você precisa para turbinar sua performance.
                    </Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

const estilos = StyleSheet.create({
    tela: {
        flex: 1,
        backgroundColor: "#1E1E1E",
    },

    topo: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingTop: 10,
    },

    logo: {
        width: 146,
        height: 56,
        marginTop: 9,
        borderRadius: 6,
    },

    botaoMenu: {
        padding: 8,
        borderRadius: 8,
    },

    titulo: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "700",
        textAlign: "center",
        marginTop: 25,
    },

    cardHistorico: {
        backgroundColor: "#3C3C3C",
        width: "87%",
        alignSelf: "center",
        marginTop: 25,
        borderRadius: 14,
        paddingVertical: 22,
        paddingHorizontal: 18,
    },

    tituloCard: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 15,
    },

    timeline: {
        borderLeftWidth: 2,
        borderColor: "#FFFFFF",
        paddingLeft: 25,
        paddingTop: 5,
    },

    itemLinha: {
        flexDirection: "row",
        marginBottom: 35,
        alignItems: "center",
        minHeight: 80,
    },

    boxCompra: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        flex: 1,
    },

    imgProduto: {
        width: 65,
        height: 65,
        resizeMode: "contain",
    },

    colunaInfos: {
        flex: 1,
    },

    nomeProduto: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
        width: 200,
    },

    detalhesProduto: {
        color: "#fff",
        fontSize: 12,
        marginTop: 3,
        lineHeight: 17,
    },

    colunaPreco: {
        width: 90,
        alignItems: "flex-end",
    },

    data: {
        color: "#fff",
        fontSize: 8,
    },

    preco: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "700",
        marginTop: 2,
    },

    rodape: {
        marginTop: 40,
        alignItems: "center",
        paddingHorizontal: 35,
        marginBottom: 30,
    },

    textoRodape: {
        color: "#aaa",
        fontSize: 12,
        textAlign: "justify",
        marginTop: 40,
        lineHeight: 16,
        width: 300,
    },

    botaoLogin: {
        backgroundColor: '#8000ff',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },

    conteudoLista: {
        paddingHorizontal: 16,
        marginTop: 20,
    },

    compraContainer: {
        backgroundColor: '#1f1f1f',
        borderRadius: 10,
        marginBottom: 20,
        padding: 16,
    },

    compraHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
        paddingBottom: 8,
    },

    compraId: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    compraData: {
        color: '#ccc',
        fontSize: 12,
    },

    compraFooter: {
        borderTopWidth: 1,
        borderTopColor: '#333',
        paddingTop: 12,
        marginTop: 8,
    },

    cupomInfo: {
        color: '#4CAF50',
        fontSize: 12,
        marginBottom: 4,
    },

    totalCompra: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'right',
    },
});

export default HistoricoCompras;
