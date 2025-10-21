import React from "react";
import { View, Text, Image, ImageBackground, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const Inicio = ({ }) => {
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


        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={estilos.carrosselContainer}
        >

          <View style={estilos.cardOferta}>
            <Image
              source={require('../../assets/img/produto3.png')}
              style={estilos.imgOferta}
              resizeMode="contain"
            />
            <Text style={estilos.precoOferta}>R$99,90</Text>
          </View>


          <View style={estilos.cardOferta}>
            <Image
              source={require('../../assets/img/produto4.png')}
              style={estilos.imgOferta}
              resizeMode="contain"
            />
            <Text style={estilos.precoOferta}>R$59,90</Text>
          </View>


          <View style={estilos.cardOferta}>
            <Image
              source={require('../../assets/img/produto1.png')}
              style={estilos.imgOferta}
              resizeMode="contain"
            />
            <Text style={estilos.precoOferta}>R$49,90</Text>
          </View>

          <View style={estilos.cardOferta}>
            <Image
              source={require('../../assets/img/produto1.png')}
              style={estilos.imgOferta}
              resizeMode="contain"
            />
            <Text style={estilos.precoOferta}>R$199,90</Text>
          </View>

          <View style={estilos.cardOferta}>
            <Image
              source={require('../../assets/img/produto1.png')}
              style={estilos.imgOferta}
              resizeMode="contain"
            />
            <Text style={estilos.precoOferta}>R$99,90</Text>
          </View>
        </ScrollView>


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

        <View style={estilos.cardsContainer}>
          <View style={estilos.card}>
            <Image
              source={require('../../assets/img/tenisCard.png')}
              style={estilos.cardImage}
              resizeMode="contain"
            />
            <View style={estilos.cardContent}>
              <Text style={estilos.cardTitle}>Ofertas</Text>
              <Text style={estilos.cardSubtitle}>Até 25% OFF em calçados</Text>
              <TouchableOpacity style={estilos.cardButton}>
                <Text style={estilos.cardButtonText}>Ver mais</Text>
              </TouchableOpacity>
            </View>
          </View>


          <View style={estilos.card}>
            <View style={estilos.cardContent}>
              <LinearGradient
    colors={['#8400FF', '#D5A8FF']}
    style={estilos.card}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
  ></LinearGradient>
              <Text style={estilos.cardTitle}>Novidades</Text>
              <Text style={estilos.cardSubtitle}>Confira os novos produtos</Text>
              <TouchableOpacity style={estilos.cardButton}>
                <Text style={estilos.cardButtonText}>Conferir</Text>
              </TouchableOpacity>
            </View>
            <Image
              source={require('../../assets/img/bolsaCard.png')}
              style={estilos.cardImage}
              resizeMode="contain"
            />
          </View>
        </View>


        <TouchableOpacity style={estilos.botaoNot}>
          <Image
            source={require('../../assets/img/3tshirts.jpg')}
            style={estilos.tsh3}
          />
          <View style={estilos.divNot}>
            <Text style={estilos.textoNot}>Apenas hoje!</Text>
            <Text style={estilos.textoNot}>Aproveite a promoção exclusiva de 3 camisetas por 99,90. Não perca!</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={estilos.clickNot}>
          <Text style={estilos.textosee}>Notificações</Text>
        </TouchableOpacity>

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
  tsh3: {
    width: 50,
    height: 50,
    borderRadius: 10,

  },
  textoNot: {
    color: "#ffffffff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "left",
    width: '80%',
    marginLeft: 15,
  },
  divNot:
  {
    flex: 1,
    flexDirection: 'column',
  },
  botaoNot: {
    backgroundColor: "#8400FF",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 13,
    width: 370,
    alignSelf: "center",
    marginTop: 20,
    flex: 1,
    flexDirection: 'row'
  },
  clickNot: {
    backgroundColor: "#ffffff0a",
    borderWidth: 1,
    borderColor: '#8400FF',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    marginTop: 20,
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
    backgroundColor: "#3c3c3c",
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
    fontWeight: "700",
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

  carrosselContainer: {
    paddingHorizontal: 12,
    gap: 15,
    marginTop: 25,
  },

  cardOferta: {
    backgroundColor: '#2f2f31',
    borderRadius: 10,
    width: 180,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#8400FF'
  },
  imgOferta: {
    width: 100,
    height: 100,
    marginTop: 12,
  },
  precoOferta: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    backgroundColor: '#8400FF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardsContainer: {
    marginTop: 25,
    gap: 10,
  },
  card: {
    backgroundColor: '#3c3c3c',
    borderRadius: 12,
    height: 160,
    padding: 8,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15
  },
  cardImage: {
    width: 100,
    height: 100,
    margin: 16,
  },
  cardContent: {
    marginLeft: 20
  },
  cardTitle: {
    color: '#D5A8FF',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardSubtitle: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 10,
  },
  cardButton: {
    backgroundColor: '#8400FF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
    width: 100,
  },

  cardButtonText: {
    color: '#fff',
    fontWeight: '700',
  },


});

export default Inicio;