import React from "react";
import {View, Text, Image, ImageBackground, ScrollView, TouchableOpacity, StyleSheet} from "react-native";

export default function App() {
  return (
    <ScrollView style={estilos.tela} contentContainerStyle={estilos.conteudoTela}>
      <ImageBackground
        source={{ uri: "" }}
        style={estilos.hero}
      >
        <Text style={estilos.logo}>SPORTIVA</Text>
        <Text style={estilos.tituloHero}>
          Encontre aqui os <Text style={estilos.destaque}>melhores</Text> produtos de esporte
        </Text>
      </ImageBackground>

      <TouchableOpacity style={estilos.botaoFiltro}>
        <Text style={estilos.textoFiltro}>FILTROS</Text>
      </TouchableOpacity>

      <View style={estilos.itemProduto}>
        <View style={estilos.colPreco}>
          <Image
            source={{ uri: "" }}
            style={estilos.thumb}
          />
          <Text style={estilos.preco}>R$ 500,00</Text>
        </View>
        <View style={estilos.conteudo}>
          <View style={estilos.topoItem}>
            <Text style={estilos.nome}>Tênis Vulcan</Text>
            <View style={estilos.notaBox}>
              <Text style={estilos.notaTexto}>4.5 ★</Text>
            </View>
          </View>
          <Text style={estilos.descricao}>
            Estilo e desempenho em cada passo. O Tênis Vulcan combina design moderno
            com conforto superior — ideal para quem busca presença e segurança no
            dia a dia ou na prática esportiva.
          </Text>
        </View>
      </View>

      <View style={estilos.itemProduto}>
        <View style={estilos.colPreco}>
          <Image
            source={{ uri: "" }}
            style={estilos.thumb}
          />
          <Text style={estilos.preco}>R$ 99,90</Text>
        </View>
        <View style={estilos.conteudo}>
          <View style={estilos.topoItem}>
            <Text style={estilos.nome}>Garrafa térmica</Text>
            <View style={estilos.notaBox}>
              <Text style={estilos.notaTexto}>4.8 ★</Text>
            </View>
          </View>
          <Text style={estilos.descricao}>
            Mantém a bebida na temperatura ideal por horas. Prática, leve e resistente,
            perfeita para treinos, trabalho ou viagens.
          </Text>
        </View>
      </View>

      <View style={estilos.itemProduto}>
        <View style={estilos.colPreco}>
          <Image
            source={{ uri: "" }}
            style={estilos.thumb}
          />
          <Text style={estilos.preco}>R$ 399,90</Text>
        </View>
        <View style={estilos.conteudo}>
          <View style={estilos.topoItem}>
            <Text style={estilos.nome}>Mochila pop</Text>
            <View style={estilos.notaBox}>
              <Text style={estilos.notaTexto}>5.0 ★</Text>
            </View>
          </View>
          <Text style={estilos.descricao}>
            Praticidade e atitude: amplo espaço interno, compartimentos organizados
            e materiais duráveis — ótima para estudos, trabalho e passeios.
          </Text>
        </View>
      </View>

      <View style={estilos.itemProduto}>
        <View style={estilos.colPreco}>
          <Image
            source={{ uri: "" }}
            style={estilos.thumb}
          />
          <Text style={estilos.preco}>R$ 99,90</Text>
        </View>
        <View style={estilos.conteudo}>
          <View style={estilos.topoItem}>
            <Text style={estilos.nome}>Camisa flow</Text>
            <View style={estilos.notaBox}>
              <Text style={estilos.notaTexto}>4.3 ★</Text>
            </View>
          </View>
          <Text style={estilos.descricao}>
            Conforto e versatilidade: tecido leve e caimento moderno para treinos ou
            uso casual.
          </Text>
        </View>
      </View>

      <View style={estilos.rodape}>
        <Text style={estilos.rodapeTexto}>
          Os melhores produtos esportivos, ofertas exclusivas e tudo o que você precisa
          para turbinar sua performance.
        </Text>
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "#0f0f10",
  },
  conteudoTela: {
    paddingBottom: 40,
  },
  hero: {
    height: 220,
    justifyContent: "flex-end",
    paddingHorizontal: 18,
    paddingBottom: 18,
    backgroundColor: "#000",
  },
  logo: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 18,
    position: "absolute",
    top: 18,
    left: 18,
  },
  tituloHero: {
    color: "#fff",
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "600",
  },
  destaque: {
    fontWeight: "900",
  },
  botaoFiltro: {
    alignSelf: "flex-start",
    marginTop: 12,
    marginLeft: 18,
    borderWidth: 1,
    borderColor: "#4b2b5f",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  textoFiltro: {
    color: "#d6cfe6",
    fontSize: 12,
    fontWeight: "600",
  },
  itemProduto: {
    flexDirection: "row",
    backgroundColor: "#121212",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    marginHorizontal: 12,
    alignItems: "flex-start",
  },
  colPreco: {
    width: 92,
    backgroundColor: "#191919",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 6,
    alignItems: "center",
    marginRight: 10,
  },
  thumb: {
    width: 56,
    height: 56,
    marginBottom: 8,
    borderRadius: 6,
  },
  preco: {
    color: "#e6e6e6",
    fontWeight: "800",
    fontSize: 12,
    textAlign: "center",
  },
  conteudo: {
    flex: 1,
    justifyContent: "center",
  },
  topoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nome: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 6,
  },
  notaBox: {
    backgroundColor: "#1f1f1f",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
  },
  notaTexto: {
    color: "#ffd455",
    fontWeight: "800",
    fontSize: 12,
  },
  descricao: {
    color: "#bfbfbf",
    fontSize: 12,
    lineHeight: 18,
  },
  rodape: {
    marginTop: 8,
    paddingVertical: 20,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  rodapeTexto: {
    color: "#aaa",
    fontSize: 12,
    textAlign: "center",
  },
});
