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
<Text style={estilos.botaoFiltro}>
        <Text style={estilos.seeall}>Veja todos os produtos</Text>
      </Text>



<TouchableOpacity style={estilos.botaosee}>
        <Text style={estilos.textosee}>Veja todos os produtos</Text>
      </TouchableOpacity>

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
    marginTop: 20,
    paddingHorizontal: 12,

  },
  textoFiltro: {
    color: "#ffffffff",
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
  },
  seeall: {
    color: "#ffffffff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "right",

  },
  itemProduto: {
    borderRadius: 10,
    padding: 8,
    alignItems: "center",
},
colPreco: {
    alignItems: "center",
},
produto: {
    width: 80,
    height: 80, 
    position: "relative",
    top: 20,
    zIndex: 1,
  },
  conteudo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
     backgroundColor: "#2f2f31ff",
    height: 45,
    paddingTop: 20,
    borderRadius: 3,
    width: 80,
  },
  topoItem: {
    flex: 1,
    alignItems: "center",
  },
  nome: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",

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
  botaosee: {
    backgroundColor: "#8400FF",
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
  marginTop: 20,
  },
  textosee: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
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