import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DrawerActions } from "@react-navigation/native";
import { NavigationParameter } from "../routes/Routes";
import { FontAwesome6 as Icon } from "@expo/vector-icons";

const HistoricoCompras = ({ navigation }: NavigationParameter) => {
    const compras = [
        {
            id: 1,
            nome: "Tênis Vulcan",
            detalhes: "Tamanho 42\nQtd: 1",
            data: "29/07/2024",
            preco: "R$ 149,90",
            imagem: require('../../assets/img/pinktenis.png')
        },
        {
            id: 2,
            nome: "Camiseta Flow",
            detalhes: "Tamanho G\nAjustado\nQtd: 1",
            data: "03/08/2024",
            preco: "R$ 89,90",
            imagem: require('../../assets/img/graytshirt.png')
        },
        {
            id: 3,
            nome: "Garrafa térmica",
            detalhes: "500ml\nQtd: 1",
            data: "12/09/2024",
            preco: "R$ 59,90",
            imagem: require('../../assets/img/blackbottle.png')
        },
        {
            id: 4,
            nome: "Mochila pop",
            detalhes: "Dimensões: 53 cm Alt x 27 cm Larg x 15 cm Prof\nQtd: 2",
            data: "21/09/2024",
            preco: "R$ 199,90",
            imagem: require('../../assets/img/pinkbag.png')
        }
    ];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#0f0f10" }}>
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
                <Text style={estilos.titulo}>Compras anteriores</Text>

                {/* CARD DE FUNDO */}
                <View style={estilos.cardHistorico}>

                    <Text style={estilos.tituloCard}>Compras</Text>

                    <View style={estilos.timeline}>

                        {compras.map((item, index) => (
                            <View key={item.id} style={estilos.itemLinha}>

                                <View style={estilos.boxCompra}>

                                    <Image source={item.imagem} style={estilos.imgProduto} />

                                    <View style={estilos.colunaInfos}>
                                        <Text style={estilos.nomeProduto}>{item.nome}</Text>
                                        <Text style={estilos.detalhesProduto}>{item.detalhes}</Text>
                                    </View>

                                    <View style={estilos.colunaPreco}>
                                        <Text style={estilos.data}>{item.data}</Text>
                                        <Text style={estilos.preco}>{item.preco}</Text>
                                    </View>

                                </View>
                            </View>
                        ))}

                    </View>

                </View>

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
});

export default HistoricoCompras;
