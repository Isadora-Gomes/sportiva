import React, { useState } from "react";
import { View, Text, Image, ImageBackground, ScrollView, TouchableOpacity, StyleSheet, FlatList } from "react-native";

import { LinearGradient } from 'expo-linear-gradient';
import { NavigationParameter } from "../routes/Routes";
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const Inicio = ({ navigation }: NavigationParameter) =>  {
  const insets = useSafeAreaInsets();
  const [mostrarNotificacao, setMostrarNotificacao] = useState(false);
  const toggleNotificacao = () => {
    setMostrarNotificacao(!mostrarNotificacao);
  };

  const redirecionarProduto = () => {
        navigation.navigate("Produto")
    }

  const mochilas = [
    { id: '1', nome: 'Mochilha pop', preco: 'R$ 120,30', imagem: require('../../assets/img/produto4.png') },
    { id: '2', nome: 'Mochilha pop', preco: 'R$ 120,30', imagem: require('../../assets/img/produto4.png') },
    { id: '3', nome: 'Mochilha pop', preco: 'R$ 120,30', imagem: require('../../assets/img/produto4.png') },
    { id: '4', nome: 'Mochilha pop', preco: 'R$ 120,30', imagem: require('../../assets/img/produto4.png') },
    { id: '5', nome: 'Mochilha pop', preco: 'R$ 120,30', imagem: require('../../assets/img/produto4.png') },
  ];

  const camisas = [
    { id: '1', nome: 'Camisa Flow', preco: 'R$ 102,29', imagem: require('../../assets/img/produto4.png') },
    { id: '2', nome: 'Camiseta esportiva', preco: 'R$ 88,10', imagem: require('../../assets/img/produto4.png') },
    { id: '3', nome: 'Camiseta Roblox', preco: 'R$ 95,00', imagem: require('../../assets/img/produto4.png') },
    { id: '4', nome: 'Camisa térmica', preco: 'R$ 135,80', imagem: require('../../assets/img/produto4.png') },
    { id: '5', nome: 'Camisa térmica', preco: 'R$ 135,80', imagem: require('../../assets/img/produto4.png') },
    { id: '6', nome: 'Camisa térmica', preco: 'R$ 135,80', imagem: require('../../assets/img/produto4.png') },
  ];

  interface ProdutoBase {
    id: string;
    nome: string;
    preco: string;
    imagem: any;
  }
  interface Mochila extends ProdutoBase { }
  interface Camisa extends ProdutoBase { }

  const CarrosselMochilaItem = ({ item }: { item: Mochila }) => (
    <View style={[estilos.itemCar, { backgroundColor: '#2a2a2a', borderColor: '#8400FF', borderWidth: 1 }]}>
      <Image source={item.imagem} style={[estilos.imagemCar, { width: 130, height: 130 }]} />
      <Text style={[estilos.nomeCar, { color: '#fff' }]}>{item.nome}</Text>
      <Text style={[estilos.precoCar, { color: '#D5A8FF', fontWeight: '700' }]}>{item.preco}</Text>
    </View>
  );


  const CarrosselCamisaItem = ({ item }: { item: Camisa }) => (
    <View style={estilos.divCar}>
      <View style={estilos.itemCar2}>
        <Image source={item.imagem} style={[estilos.imagemCar2, { width: 110, height: 110 }]} />
        <View style={estilos.textprice}>
          <Text style={[estilos.nomeCar2, { fontSize: 14 }]}>{item.nome}</Text>
          <Text style={[estilos.precoCar2, { color: '#aaa', marginTop: 2 }]}>{item.preco}</Text>
        </View>
      </View>
    </View>

  );
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
              source={require('../../assets/img/graybag.png')}
              style={estilos.imgOferta}
              resizeMode="contain"
            />
            <Text style={estilos.precoOferta}>R$99,90</Text>
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
              source={require('../../assets/img/produto2.png')}
              style={estilos.imgOferta}
              resizeMode="contain"
            />
            <Text style={estilos.precoOferta}>R$199,90</Text>
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

        <TouchableOpacity style={estilos.botaoFiltro} onPress={(redirecionarProduto)}>
          <Text style={estilos.seeall}>Veja todos os produtos</Text>
        </TouchableOpacity>

        <View style={estilos.cardsContainer}>
          <View style={estilos.card}>
            <LinearGradient
              colors={['#8400FF', '#D5A8FF']}
              style={estilos.cardGradT}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Image
                source={require('../../assets/img/tenisCard.png')}
                style={estilos.cardImage}
                resizeMode="contain"
              />
            </LinearGradient>
            <View style={estilos.cardContent}>
              <Text style={estilos.cardTitle}>Ofertas</Text>
              <Text style={estilos.cardSubtitle}>Até 25% OFF em calçados</Text>
              <TouchableOpacity style={estilos.cardButton} onPress={(redirecionarProduto)}>
                <Text style={estilos.cardButtonText}>Ver mais</Text>
              </TouchableOpacity>
            </View>
          </View>


          <View style={estilos.card}>
            <View style={estilos.cardContent}>
              <Text style={estilos.cardTitle}>Novidades</Text>
              <Text style={estilos.cardSubtitle}>Confira os novos produtos</Text>
              <TouchableOpacity style={estilos.cardButton} onPress={(redirecionarProduto)}>
                <Text style={estilos.cardButtonText}>Conferir</Text>
              </TouchableOpacity>
            </View>
            <LinearGradient
              colors={['#8400FF', '#D5A8FF']}
              style={estilos.cardGradB}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Image
                source={require('../../assets/img/bolsaCard.png')}
                style={estilos.cardImage}
                resizeMode="contain"
              />
            </LinearGradient>
          </View>
        </View>

        <View>
          <TouchableOpacity
            style={estilos.clickNot}
            onPress={toggleNotificacao}
          >
            <Text style={estilos.textosee}>Notificações</Text>
          </TouchableOpacity>

          {mostrarNotificacao && (
            <TouchableOpacity style={estilos.botaoNot}>
              <Image
                source={require('../../assets/img/3tshirts.jpg')}
                style={estilos.tsh3}
              />
              <View style={estilos.divNot}>
                <Text style={estilos.textoNot}>Apenas hoje!</Text>
                <Text style={estilos.textoNot}>
                  Aproveite a promoção exclusiva de 3 camisetas por 99,90. Não perca!
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        <View style={estilos.containerCar}>
          <Text style={estilos.tituloCar}>Mochilas</Text>
          <FlatList<Mochila>
            data={mochilas}
            renderItem={({ item }) => <CarrosselMochilaItem item={item} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />

          <Text style={estilos.tituloCar}>Camisas</Text>
          <View style={estilos.divCar}>
            <FlatList<Camisa>
              data={camisas}
              renderItem={({ item }) => <CarrosselCamisaItem item={item} />}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <Text style={estilos.tituloCar}>Garrafas</Text>
          <FlatList<Mochila>
            data={mochilas}
            renderItem={({ item }) => <CarrosselMochilaItem item={item} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />

          <Text style={estilos.tituloCar}>Tênis</Text>
          <View style={estilos.divCar}>
            <FlatList<Camisa>
              data={camisas}
              renderItem={({ item }) => <CarrosselCamisaItem item={item} />}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>

        <TouchableOpacity style={estilos.botaosee} onPress={(redirecionarProduto)}>
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
  containerCar: {
    flex: 1,
    padding: 16,

  },
  tituloCar: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 10,
    marginTop: 20,
  },
  itemCar: {
    marginTop: 10,
    marginRight: 16,
    width: 180,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
  },
  imagemCar: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  nomeCar: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  precoCar: {
    color: '#ccc',
    marginTop: 4,
  },

  divCar: {
    borderRadius: 8,
    backgroundColor: '#3c3c3c',
    marginTop: 10,
  },
  itemCar2: {
    width: 180,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  imagemCar2: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 8,
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  nomeCar2: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  precoCar2: {
    color: '#ccc',
    marginTop: 4,
    textAlign: 'left'
  },
  textprice: {
    marginLeft: 20
  },

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
    alignSelf: 'flex-start',
    marginTop: 20,
    marginLeft: 10,
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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10
  },
  cardImage: {
    width: 110,
    height: 110,
    marginLeft: 'auto',
    marginRight: 'auto',
flex: 1,
  },
  cardGradT: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 0,
    height: 160,
    flex: 1,
    alignItems: 'center',
  },
  cardGradB: {
    borderTopLeftRadius: 60,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 12,
    height: 160,
    marginLeft: 10,
    flex: 1,
    alignItems: 'center',
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
    marginRight: 10,
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