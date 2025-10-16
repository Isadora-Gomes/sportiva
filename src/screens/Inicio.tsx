import React from "react";
import {View, Text, Image, ImageBackground, ScrollView, TouchableOpacity, StyleSheet} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const Inicio = ({}) => {
     const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
        style={{ flex: 1, backgroundColor: '#0f0f10' }}
      >
      <ScrollView
        style={estilos.tela}
        contentContainerStyle={[estilos.conteudoTela]}
      >
          <Image
              source={require('../../assets/img/logoSlim.png')}
              style={estilos.logo}
            />
      <ImageBackground
        source={require('../../assets/img/banner-sport.png')}
        style={estilos.Inicio}
      >
      </ImageBackground>

      <Text style={estilos.botaoFiltro}>
        <Text style={estilos.textoFiltro}>Melhores ofertas</Text>
      </Text>

       <View style={estilos.itemProduto}>
        <View style={estilos.conteudo}>
   
            <Text style={estilos.nome}>Carrossel vou faze</Text>
        
        </View>
      </View>

       <Text style={estilos.botaoFiltro}>
        <Text style={estilos.textoFiltro}>Categorias</Text>
      </Text>


<View style={estilos.geral}>
 <View style={estilos.itemProduto}>
        <View style={estilos.colPreco}>
          <Image
            source={require('../../assets/img/produto3.png')}
            style={estilos.produto}
          />
 
        </View>
        <View style={estilos.conteudo}>
          <View style={estilos.topoItem}>
            <Text style={estilos.nome}>Mochila</Text>
          </View>
        </View>
      </View>

<View style={estilos.itemProduto}>
        <View style={estilos.colPreco}>
          <Image
            source={require('../../assets/img/produto4.png')}
            style={estilos.produto}
          />
        </View>
        <View style={estilos.conteudo}>
         <View style={estilos.topoItem}>
            <Text style={estilos.nome}>Camisa</Text>
          </View>
        </View>
      </View>

      <View style={estilos.itemProduto}>
        <View style={estilos.colPreco}>
          <Image
            source={require('../../assets/img/produto2.png')}
            style={estilos.produto}
          />
        </View>
        <View style={estilos.conteudo}>
          <View style={estilos.topoItem}>
            <Text style={estilos.nome}>Garrafa</Text>
          </View>
      </View>
        </View>

      
     <View style={estilos.itemProduto}>
        <View style={estilos.colPreco}>
          <Image
            source={require('../../assets/img/produto1.png')}
            style={estilos.produto}
          />
        </View>
        <View style={estilos.conteudo}>
          <View style={estilos.topoItem}>
            <Text style={estilos.nome}>Tênis</Text>
          </View>
        </View>
      </View>
</View>
      <View style={estilos.rodape}>
        <Text style={estilos.rodapeTexto}>
          Os melhores produtos esportivos, ofertas exclusivas e tudo o que você precisa
          para turbinar sua performance.
        </Text>
        <Image
            source={require('../../assets/img/logo2.png')}
            style={estilos.imgRodape}
          />
      </View>
    </ScrollView>
    </SafeAreaView>
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
  Inicio: {
    height: 130,
    justifyContent: "space-between",
    backgroundColor: "#000",
    width: "100%",
    overflow: "hidden",
  },
  logo: {
    width: 146,
    height: 56,
    marginTop: 9,
    borderRadius: 6,
    position: "relative",
  },
  tituloInicio: {
    color: "#fff",
    fontSize: 23,
    lineHeight: 35,
    fontWeight: "600",
  },
  destaque: {
    fontWeight: "900",
  },
    geral: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
  botaoFiltro: {
    alignSelf: "center",
    marginTop: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 12,
  },
  textoFiltro: {
    color: "#ffffffff",
    fontSize: 22,
    fontWeight: "600",
  },
  itemProduto: {
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
},
colPreco: {
    alignItems: "center",
},
produto: {
    width: 60,
    height: 60, 
  },
  conteudo: {
    flex: 1,
    justifyContent: "center",
     backgroundColor: "#1c1c1e",
    height: 50,
    padding: 10,
    borderRadius: 8,
  },
  topoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  nome: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },
  notaBox: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
  },

  descricao: {
    color: "#e4e4e4ff",
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
  imgRodape: {
    marginTop: 20,
  },
});

export default Inicio;