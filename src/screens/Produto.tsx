import React, { useState } from "react";
import { View, Text, Image, ImageBackground, ScrollView, TouchableOpacity, StyleSheet, Modal, TextInput, Pressable, Alert } from "react-native";
// import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import Icon from "../components/icon";
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function App() {
  const insets = useSafeAreaInsets();
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // modal: adicionar produto
  const [showModal, setShowModal] = useState(false);
  const [novoItem, setNovoItem] = useState({ nome: '', preco: '' });
  const [descricao, setDescricao] = useState('');
  const [colorInput, setColorInput] = useState('');
  const [colors, setColors] = useState<string[]>([]);
  const [sizeInput, setSizeInput] = useState('');
  const [sizes, setSizes] = useState<string[]>([]);
  const [imageUri, setImageUri] = useState<string | null>(null);

  const addColor = () => {
    const v = colorInput.trim();
    if (v) {
      setColors(prev => [...prev, v]);
      setColorInput('');
    } else {
      setColors(prev => [...prev, '']);
    }
  };
  const removeColorAt = (idx: number) => setColors(prev => prev.filter((_, i) => i !== idx));
  const updateColor = (idx: number, v: string) => setColors(prev => prev.map((c, i) => i === idx ? v : c));

  const addSize = () => {
    const v = sizeInput.trim();
    if (v) {
      setSizes(prev => [...prev, v]);
      setSizeInput('');
    } else {
      setSizes(prev => [...prev, '']);
    }
  };
  const removeSizeAt = (idx: number) => setSizes(prev => prev.filter((_, i) => i !== idx));
  const updateSize = (idx: number, v: string) => setSizes(prev => prev.map((s, i) => i === idx ? v : s));

  const pickImage = async () => {
    try {
      const ImagePicker = require('expo-image-picker');
      const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.7 });
      if (!result.cancelled) {
        setImageUri(result.uri);
      }
    } catch (err) {
      Alert.alert('Dependência ausente', 'Instale expo-image-picker: expo install expo-image-picker');
    }
  };

  const navigation = useNavigation();

  const products = [
    {
      id: 'p1',
      name: 'Tênis Vulcan',
      image: require('../../assets/img/produto1.png'),
      price: 'R$ 500,00',
      category: 'Tênis',
      description: `Estilo e desempenho em cada passo. O Tênis Vulcan combina design moderno
              com conforto — ideal para quem busca presença e segurança no
              dia a dia.`,
      screen: 'Detalhes3'
    },
    {
      id: 'p2',
      name: 'Garrafa térmica',
      image: require('../../assets/img/produto2.png'),
      price: 'R$ 99,90',
      category: 'Acessórios',
      description: `Mantém a bebida na temperatura ideal por horas. Prática, leve e resistente,
              perfeita para treinos, trabalho ou viagens.`,
      screen: 'Detalhes4'
    },
    {
      id: 'p3',
      name: 'Mochila pop',
      image: require('../../assets/img/produto3.png'),
      price: 'R$ 399,90',
      category: 'Mochila',
      description: `Praticidade e atitude: amplo espaço interno, compartimentos organizados
              e materiais duráveis — ótima para estudos, trabalho e passeios.`,
      screen: 'Detalhes2'
    },
    {
      id: 'p4',
      name: 'Camisa flow',
      image: require('../../assets/img/produto4.png'),
      price: 'R$ 99,90',
      category: 'Camiseta',
      description: `Conforto e versatilidade: tecido leve e caimento moderno para treinos ou
              uso casual.`,
      screen: 'Detalhes'
    }
  ];

  const filteredProducts = selectedCategory ? products.filter(p => p.category === selectedCategory) : products;

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

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12, marginBottom: 6, paddingHorizontal: 12 }}>
          <TouchableOpacity style={estilos.botaoFiltro} onPress={() => setFiltersVisible(true)}>
            <Text style={estilos.textoFiltro}>FILTROS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={estilos.botaoFiltro} onPress={() => setShowModal(true)}>
            <Icon name="plus" size={14} color="#fff" />
          </TouchableOpacity>
        </View>

        <Modal visible={filtersVisible} animationType="slide" transparent>
          <View style={estilos.modalOverlay}>
            <View style={estilos.modalCard}>
              <Text style={estilos.modalTitle}>Filtrar produtos</Text>

              <Text style={estilos.modalSection}>Categorias</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {['Tênis','Camiseta','Mochila','Acessórios'].map(cat => (
                  <TouchableOpacity
                    key={cat}
                    style={[estilos.chip, selectedCategory === cat ? { backgroundColor: '#8000ff' } : null]}
                    onPress={() => setSelectedCategory(prev => prev === cat ? null : cat)}
                  >
                    <Text style={[estilos.chipText, selectedCategory === cat ? { color: '#fff' } : null]}>{cat}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={estilos.modalSection}>Preço</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={estilos.modalText}>Menor que R$100</Text>
                <Text style={estilos.modalText}>R$100 - R$300</Text>
                <Text style={estilos.modalText}>Acima de R$300</Text>
              </View>

              <View style={estilos.modalActions}>
                <TouchableOpacity style={[estilos.modalBtn, estilos.modalClear]} onPress={() => { setSelectedCategory(null); setFiltersVisible(false); }}>
                  <Text style={[estilos.modalBtnText, estilos.modalClearText]}>Retirar filtros</Text>
                </TouchableOpacity>
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

        {filteredProducts.map(prod => (
          <TouchableOpacity key={prod.id} style={estilos.itemProduto} onPress={() => navigation.navigate(prod.screen as never)}>
            <View style={estilos.colPreco}>
              <Image source={prod.image} style={estilos.produto} />
              <Text style={estilos.preco}>{prod.price}</Text>
            </View>
            <View style={estilos.conteudo}>
              <View style={estilos.topoItem}>
                <Text style={estilos.nome}>{prod.name}</Text>
                <View style={estilos.notaBox}>
                  <Text style={estilos.notaTexto}>{prod.id === 'p3' ? '5.0' : prod.id === 'p2' ? '4.8' : prod.id === 'p1' ? '4.5' : '4.3'} <Icon name="star" size={12} color="#ffd455" /></Text>
                </View>
              </View>
              <Text style={estilos.descricao}>{prod.description}</Text>
            </View>
          </TouchableOpacity>
        ))}

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

      <Modal
        visible={showModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowModal(false)}
      >
        <View style={estilos.modalOverlay}>
          <View style={estilos.modalCard}>
            <Text style={estilos.modalTitle}>Adicionar Produto</Text>
            <Text style={{ color: '#fff', marginTop: 10 }}>Nome do produto</Text>
            <TextInput
              placeholder="Ex. Mochila"
              placeholderTextColor="#888"
              style={estilos.input}
              value={novoItem.nome}
              onChangeText={(t) => setNovoItem(prev => ({ ...prev, nome: t }))}
            />
            <Text style={{ color: '#fff', marginTop: 10 }}>Preço do produto</Text>
            <TextInput
              placeholder="Ex. 99,90"
              placeholderTextColor="#888"
              style={estilos.input}
              value={novoItem.preco}
              onChangeText={(t) => setNovoItem(prev => ({ ...prev, preco: t }))}
              keyboardType="numeric"
            />

            <Text style={{ color: '#fff', marginTop: 10 }}>Descrição</Text>
            <TextInput
              placeholder="Ex. Produto resistente e durável, muito útil para longas caminhadas"
              placeholderTextColor="#888"
              style={[estilos.input, { height: 90, textAlignVertical: 'top' }]}
              value={descricao}
              onChangeText={setDescricao}
              multiline
            />

            <Text style={{ color: '#fff', marginTop: 10 }}>Cores do produto</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                placeholder="ex. Azul"
                placeholderTextColor="#888"
                style={[estilos.input, { flex: 1, marginTop: 8 }]}
                value={colorInput}
                onChangeText={setColorInput}
              />
              <TouchableOpacity onPress={addColor} style={{ marginLeft: 8, marginTop: 8, padding: 8, backgroundColor: '#8000ff', borderRadius: 6 }}>
                <Text style={{ color: '#fff', fontWeight: '700' }}>+</Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 8 }}>
              {colors.map((c, idx) => (
                <View key={idx} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                  <TextInput
                    style={[estilos.input, { flex: 1, marginTop: 0 }]}
                    value={c}
                    onChangeText={(t) => updateColor(idx, t)}
                    placeholder={`Cor ${idx + 1}`}
                    placeholderTextColor="#888"
                  />
                  <TouchableOpacity onPress={() => removeColorAt(idx)} style={{ marginLeft: 8 }}>
                    <Text style={{ color: '#fff' }}>Remover</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            <Text style={{ color: '#fff', marginTop: 10 }}>Tamanhos do produto</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                placeholder="Ex. M"
                placeholderTextColor="#888"
                style={[estilos.input, { flex: 1, marginTop: 8 }]}
                value={sizeInput}
                onChangeText={setSizeInput}
              />
              <TouchableOpacity onPress={addSize} style={{ marginLeft: 8, marginTop: 8, padding: 8, backgroundColor: '#8000ff', borderRadius: 6 }}>
                <Text style={{ color: '#fff', fontWeight: '700' }}>+</Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 8 }}>
              {sizes.map((s, idx) => (
                <View key={idx} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                  <TextInput
                    style={[estilos.input, { flex: 1, marginTop: 0 }]}
                    value={s}
                    onChangeText={(t) => updateSize(idx, t)}
                    placeholder={`Tamanho ${idx + 1}`}
                    placeholderTextColor="#888"
                  />
                  <TouchableOpacity onPress={() => removeSizeAt(idx)} style={{ marginLeft: 8 }}>
                    <Text style={{ color: '#fff' }}>Remover</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            <Text style={{ color: '#fff', marginTop: 10 }}>Imagem do produto</Text>
            <TouchableOpacity onPress={pickImage} style={estilos.uploadBox}>
              {imageUri ? (
                <Image source={{ uri: imageUri }} style={{ width: '100%', height: '100%', borderRadius: 8 }} />
              ) : (
                <View style={{ alignItems: 'center' }}>
                  <Text style={estilos.uploadText}>Enviar uma imagem ou selecione da galeria</Text>
                </View>
              )}
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 12 }}>
              <Pressable onPress={() => setShowModal(false)} style={estilos.modalBtn}>
                <Text style={estilos.modalBtnText}>Cancelar</Text>
              </Pressable>
              <Pressable onPress={() => { /* aqui você pode adicionar lógica para salvar */ setShowModal(false); }} style={[estilos.modalBtn, { backgroundColor: '#8000ff', marginLeft: 8 }]}>
                <Text style={[estilos.modalBtnText, { color: '#fff' }]}>Adicionar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
  modalClear: { backgroundColor: '#444', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 8, marginLeft: 8 },
  modalClearText: { color: '#fff', fontWeight: '700' },
  chip: { backgroundColor: '#1f1f1f', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, marginRight: 8, marginBottom: 8 },
  chipText: { color: '#fff', fontWeight: '700' },
  input: {
    borderWidth: 1,
    borderColor: '#333',
    padding: 10,
    borderRadius: 8,
    color: '#fff',
    marginTop: 8,
  },
  uploadBox: {
    height: 110,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#444',
    borderRadius: 8,
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  uploadText: {
    color: '#f5a623',
    fontWeight: '700',
    textAlign: 'center'
  },
});