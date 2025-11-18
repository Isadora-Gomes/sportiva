import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Modal, TextInput, Pressable, Alert } from "react-native";
import Icon from "../components/icon";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, DrawerActions } from '@react-navigation/native';

export default function Carrinho() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [mochilaQty, setMochilaQty] = useState(1);
  const [garrafaQty, setGarrafaQty] = useState(1);

  const subtotal = 399.90 * mochilaQty + 99.90 * garrafaQty;

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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#8000ff", paddingTop: insets.top }}>
      <ScrollView contentContainerStyle={estilos.conteudoTela}>
        <View style={estilos.header}>
          <Text style={estilos.headerTitulo}>Carrinho</Text>
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: insets.top + 5,
              right: 10,
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
        </View>
        <View style={estilos.itemCarrinho}>
          <View style={estilos.imgCarrinho}>
            <Image source={require('../../assets/img/produto3.png')} style={estilos.imgProduto} />
          </View>
          <View style={estilos.infoProduto}>
            <Text style={estilos.nomeProduto}>MOCHILA POP</Text>
            <Text style={estilos.detProduto}>Dimensões: 38 cm (A) x 28 cm (L) x 13 cm (P)</Text>
            <Text style={estilos.detProduto}>100% poliéster</Text>
            <Text style={estilos.precoProduto}>R$ 399,90</Text>

            <View style={estilos.controleQtd}>
              <TouchableOpacity onPress={() => setMochilaQty(prev => Math.max(prev - 1, 1))}>
                <Text style={estilos.btnQtd}>-</Text>
              </TouchableOpacity>
              <Text style={estilos.qtd}>{mochilaQty}</Text>
              <TouchableOpacity onPress={() => setMochilaQty(prev => prev + 1)}>
                <Text style={estilos.btnQtd}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={estilos.removeBtn}>
            <Icon name="x" style={estilos.icon} />
            <TouchableOpacity onPress={() => setShowModal(true)}>
              <Icon name="plus" style={estilos.icon2} />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        {/* Garrafa Térmica */}
        <View style={estilos.itemCarrinho}>
          <View style={estilos.imgCarrinho}>
            <Image source={require('../../assets/img/produto2.png')} style={estilos.imgProduto} />
          </View>
          <View style={estilos.infoProduto}>
            <Text style={estilos.nomeProduto}>GARRAFA TÉRMICA</Text>
            <Text style={estilos.detProduto}>500ml</Text>
            <Text style={estilos.detProduto}>Cor: roxa</Text>
            <Text style={estilos.precoProduto}>R$ 99,90</Text>

            <View style={estilos.controleQtd}>
              <TouchableOpacity onPress={() => setGarrafaQty(prev => Math.max(prev - 1, 1))}>
                <Text style={estilos.btnQtd}>-</Text>
              </TouchableOpacity>
              <Text style={estilos.qtd}>{garrafaQty}</Text>
              <TouchableOpacity onPress={() => setGarrafaQty(prev => prev + 1)}>
                <Text style={estilos.btnQtd}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={estilos.removeBtn}>
            <Icon name="x" style={estilos.icon} />
            <TouchableOpacity onPress={() => setShowModal(true)}>
              <Icon name="plus" style={estilos.icon2} />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        {/* Mais opções */}
        <Text style={estilos.secaoTitulo}>Mais opções para você:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={estilos.listaProdutos}>
          <View style={estilos.produtoSugestao}>
            <Image source={require('../../assets/img/produto2.png')} style={estilos.sugestaoImg} />
            <Text style={estilos.sugestaoPreco}>R$ 99,90</Text>
            <TouchableOpacity style={estilos.comprarBtn} onPress={() => navigation.navigate('Detalhes4' as never)}>
              <Text style={estilos.comprarTxt}>COMPRAR</Text>
            </TouchableOpacity>
          </View>

          <View style={estilos.produtoSugestao}>
            <Image source={require('../../assets/img/produto1.png')} style={estilos.sugestaoImg} />
            <Text style={estilos.sugestaoPreco}>R$ 399,90</Text>
            <TouchableOpacity style={estilos.comprarBtn} onPress={() => navigation.navigate('Detalhes3' as never)}>
              <Text style={estilos.comprarTxt}>COMPRAR</Text>
            </TouchableOpacity>
          </View>

          <View style={estilos.produtoSugestao}>
            <Image source={require('../../assets/img/produto3.png')} style={estilos.sugestaoImg} />
            <Text style={estilos.sugestaoPreco}>R$ 299,90</Text>
            <TouchableOpacity style={estilos.comprarBtn} onPress={() => navigation.navigate('Detalhes2' as never)}>
              <Text style={estilos.comprarTxt}>COMPRAR</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={estilos.subtotal}>
          <Text style={estilos.subtotalTxt}>Subtotal R$ {subtotal.toFixed(2)}</Text>
          <TouchableOpacity style={estilos.finalizarBtn}>
            <Text style={estilos.finalizarTxt}
              onPress={() => navigation.navigate('InfoEntrega' as never)}>
              Concluir pedido</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>


      <Modal
        visible={showModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowModal(false)}
      >
        <View style={estilos.modalOverlay}>
          <View style={estilos.modalContainer}>
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
                <Text style={estilos.modalBtnTxt}>Cancelar</Text>
              </Pressable>
              <Pressable onPress={() => { /* aqui você pode adicionar lógica para salvar */ setShowModal(false); }} style={[estilos.modalBtn, { backgroundColor: '#8000ff', marginLeft: 8 }]}>
                <Text style={[estilos.modalBtnTxt, { color: '#fff' }]}>Adicionar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  conteudoTela: {
    paddingBottom: 40,
    backgroundColor: "#0f0f10",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#8000ff",
  },
  headerTitulo: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    flex: 1,
  },
  itemCarrinho: {
    flexDirection: "row",
    margin: 12,
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
  },
  imgCarrinho: {
    backgroundColor: "#3C3C3C",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginRight: 12,
    flex: 1,
    maxWidth: 80,
  },
  imgProduto: {
    width: 66,
    height: 66,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: 13,
    bottom: 38,
    color: "#fff",
    marginLeft: 10,
  },
  icon2: {
    fontSize: 15,
    bottom: 52,
    right: 20,
    color: "#fff",

  },

  infoProduto: {
    flex: 1,
  },
  nomeProduto: {
    color: "#fff",
    fontWeight: "700",
  },
  detProduto: {
    color: "#ccc",
    fontSize: 12,
  },
  precoProduto: {
    color: "#fff",
    fontWeight: "800",
    marginTop: 4,
  },
  controleQtd: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  btnQtd: {
    color: "#fff",
    fontSize: 18,
    paddingHorizontal: 12,
  },
  qtd: {
    color: "#fff",
    marginHorizontal: 8,
    fontWeight: "700",
  },
  removeBtn: {
    padding: 6,
  },
  secaoTitulo: {
    color: "#fff",
    fontWeight: "700",
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
  },
  listaProdutos: {
    paddingLeft: 16,
  },
  produtoSugestao: {
    backgroundColor: "#1f1f1f",
    borderRadius: 10,
    marginRight: 12,
    width: 120,
    alignItems: "center",
    padding: 8,
  },
  sugestaoImg: {
    width: 56,
    height: 56,
    marginBottom: 4,
    borderRadius: 6,
  },
  sugestaoPreco: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
    marginBottom: 4,
  },
  comprarBtn: {
    backgroundColor: "#8000ff",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  comprarTxt: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },
  subtotal: {
    marginTop: 20,
    paddingTop: 24,
    backgroundColor: "#8000ff",
    borderRadius: 10,
    alignItems: "center",
    bottom: -70,
    width: "100%",
    left: 0,
    right: 0,
    height: 70,

  },
  subtotalTxt: {
    color: "#fff",
    fontWeight: "700",
    marginBottom: 12,
  },
  finalizarBtn: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  finalizarTxt: {
    fontWeight: "700",
    color: "#8000ff",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    width: '86%',
    backgroundColor: '#0f0f10',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2a2a2a'
  },
  modalTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#333',
    padding: 10,
    borderRadius: 8,
    color: '#fff',
    marginTop: 8,
  },
  modalBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#ddd'
  },
  modalBtnTxt: {
    color: '#111',
    fontWeight: '700'
  },
  chip: {
    backgroundColor: '#1f1f1f',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
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