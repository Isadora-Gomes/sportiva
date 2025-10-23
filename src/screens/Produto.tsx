import React, { useState } from "react";
import { View, Text, Image, ImageBackground, ScrollView, TouchableOpacity, StyleSheet, Modal } from "react-native";
// import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import Icon from "../components/icon";
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function App() {
  const insets = useSafeAreaInsets();
  const [filtersVisible, setFiltersVisible] = useState(false);

  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#0f0f10' }}
    >
      <ScrollView
        style={estilos.tela}
        contentContainerStyle={[estilos.conteudoTela]}
      >
        <ImageBackground
          source={require('../../assets/img/fundo_produtos.png')}
          style={estilos.Inicio}
          imageStyle={{ opacity: 0.5 }}
        >
          <Image
            source={require('../../assets/img/logoSlim.png')}
            style={estilos.logo}
          />

          <TouchableOpacity
            style={{
              position: 'absolute',
              top: insets.top + 10,
              right: 60,
              zIndex: 10,
              padding: 8,
              borderRadius: 8,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          >
            <Icon name="bars" size={26} color="#fff" />
          </TouchableOpacity>

          <Text style={estilos.tituloInicio}>
            Encontre aqui os {'\n'}<Text style={estilos.destaque}>melhores</Text> produtos de {'\n'}esporte
          </Text>
        </ImageBackground>

        <TouchableOpacity style={estilos.botaoFiltro} onPress={() => setFiltersVisible(true)}>
          <Text style={estilos.textoFiltro}>FILTROS</Text>
        </TouchableOpacity>

        <Modal visible={filtersVisible} animationType="slide" transparent>
          <View style={estilos.modalOverlay}>
            <View style={estilos.modalCard}>
              <Text style={estilos.modalTitle}>Filtrar produtos</Text>

              <Text style={estilos.modalSection}>Categorias</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                <TouchableOpacity style={estilos.chip}><Text style={estilos.chipText}>Tênis</Text></TouchableOpacity>
                <TouchableOpacity style={estilos.chip}><Text style={estilos.chipText}>Camiseta</Text></TouchableOpacity>
                <TouchableOpacity style={estilos.chip}><Text style={estilos.chipText}>Mochila</Text></TouchableOpacity>
                <TouchableOpacity style={estilos.chip}><Text style={estilos.chipText}>Acessórios</Text></TouchableOpacity>
              </View>

              <Text style={estilos.modalSection}>Preço</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={estilos.modalText}>Menor que R$100</Text>
                <Text style={estilos.modalText}>R$100 - R$300</Text>
                <Text style={estilos.modalText}>Acima de R$300</Text>
              </View>

              <View style={estilos.modalActions}>
                <TouchableOpacity style={estilos.modalBtn} onPress={() => setFiltersVisible(false)}>
                  <Text style={estilos.modalBtnText}>Fechar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[estilos.modalBtn, estilos.modalApply]} onPress={() => setFiltersVisible(false)}>
                  <Text style={[estilos.modalBtnText, estilos.modalApplyText]}>Aplicar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <TouchableOpacity style={estilos.itemProduto} onPress={() => navigation.navigate('Detalhes3' as never)}>
          <View style={estilos.colPreco}>
            <Image
              source={require('../../assets/img/produto1.png')}
              style={estilos.produto}
            />
            <Text style={estilos.preco}>R$ 500,00</Text>
          </View>
          <View style={estilos.conteudo}>
            <View style={estilos.topoItem}>
              <Text style={estilos.nome}>Tênis Vulcan</Text>
              <View style={estilos.notaBox}>
                <Text style={estilos.notaTexto}>4.5 <Icon name="star" size={12} color="#ffd455" /></Text>
              </View>
            </View>
            <Text style={estilos.descricao}>
              Estilo e desempenho em cada passo. O Tênis Vulcan combina design moderno
              com conforto — ideal para quem busca presença e segurança no
              dia a dia.
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={estilos.itemProduto} onPress={() => navigation.navigate('Detalhes4' as never)}>
          <View style={estilos.colPreco}>
            <Image
              source={require('../../assets/img/produto2.png')}
              style={estilos.produto}
            />
            <Text style={estilos.preco}>R$ 99,90</Text>
          </View>
          <View style={estilos.conteudo}>
            <View style={estilos.topoItem}>
              <Text style={estilos.nome}>Garrafa térmica</Text>
              <View style={estilos.notaBox}>
                <Text style={estilos.notaTexto}>4.8 <Icon name="star" size={12} color="#ffd455" /></Text>
              </View>
            </View>
            <Text style={estilos.descricao}>
              Mantém a bebida na temperatura ideal por horas. Prática, leve e resistente,
              perfeita para treinos, trabalho ou viagens.
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={estilos.itemProduto} onPress={() => navigation.navigate('Detalhes2' as never)}>
          <View style={estilos.colPreco}>
            <Image
              source={require('../../assets/img/produto3.png')}
              style={estilos.produto}
            />
            <Text style={estilos.preco}>R$ 399,90</Text>
          </View>
          <View style={estilos.conteudo}>
            <View style={estilos.topoItem}>
              <Text style={estilos.nome}>Mochila pop</Text>
              <View style={estilos.notaBox}>
                <Text style={estilos.notaTexto}>5.0 <Icon name="star" size={12} color="#ffd455" /></Text>
              </View>
            </View>
            <Text style={estilos.descricao}>
              Praticidade e atitude: amplo espaço interno, compartimentos organizados
              e materiais duráveis — ótima para estudos, trabalho e passeios.
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={estilos.itemProduto} onPress={() => navigation.navigate('Detalhes' as never)}>
          <View style={estilos.colPreco}>
            <Image
              source={require('../../assets/img/produto4.png')}
              style={estilos.produto}
            />
            <Text style={estilos.preco}>R$ 99,90</Text>
          </View>
          <View style={estilos.conteudo}>
            <View style={estilos.topoItem}>
              <Text style={estilos.nome}>Camisa flow</Text>
              <View style={estilos.notaBox}>
                <Text style={estilos.notaTexto}>4.3 <Icon name="star" size={12} color="#ffd455" /></Text>
              </View>
            </View>
            <Text style={estilos.descricao}>
              Conforto e versatilidade: tecido leve e caimento moderno para treinos ou
              uso casual.
            </Text>
          </View>
        </TouchableOpacity>

        {/* Removed duplicated non-clickable product blocks (Mochila pop & Camisa flow) */}

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
  menu: {
    position: 'absolute',
    top: 15,
    right: 60,
    zIndex: 10,
    borderRadius: 10,
    padding: 8,
  },
  tela: {
    flex: 1,
    backgroundColor: "#0f0f10",
  },
  conteudoTela: {
    paddingBottom: 40,
  },
  Inicio: {
    height: 220,
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingBottom: 18,
    backgroundColor: "#000",
    width: "110%",
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
  botaoFiltro: {
    alignSelf: "flex-start",
    marginTop: 12,
    marginLeft: 18,
    borderWidth: 1,
    borderColor: "#4b2b5f",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginBottom: 9,
  },
  textoFiltro: {
    color: "#ffffffff",
    fontSize: 12,
    fontWeight: "600",
  },
  itemProduto: {
    flexDirection: "row",
    backgroundColor: "#1f1f1fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    marginHorizontal: 12,
    alignItems: "flex-start",
  },
  colPreco: {
    width: 92,
    backgroundColor: "#373737ff",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 6,
    alignItems: "center",
    marginRight: 10,
  },
  produto: {
    width: 56,
    height: 56,
    marginBottom: 8,
    borderRadius: 6,

  },
  preco: {
    color: "#ffffffff",
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
  /* modal styles */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalCard: {
    width: '100%',
    maxWidth: 560,
    backgroundColor: '#121214',
    borderRadius: 12,
    padding: 18,
  },
  modalTitle: { color: '#fff', fontSize: 18, fontWeight: '800', marginBottom: 12 },
  modalSection: { color: '#fff', fontWeight: '700', marginTop: 8, marginBottom: 8 },
  modalText: { color: '#d0d0d0', fontSize: 13 },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 18 },
  modalBtn: { paddingVertical: 10, paddingHorizontal: 14, borderRadius: 8, marginLeft: 8, backgroundColor: '#2b2b2b' },
  modalBtnText: { color: '#fff', fontWeight: '700' },
  modalApply: { backgroundColor: '#8000ff' },
  modalApplyText: { color: '#fff', fontWeight: '900' },
  chip: { backgroundColor: '#1f1f1f', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, marginRight: 8, marginBottom: 8 },
  chipText: { color: '#fff', fontWeight: '700' },
});