import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Modal, TextInput, Pressable, Alert, ActivityIndicator } from "react-native";
import Icon from "../components/icon";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, DrawerActions, useFocusEffect } from '@react-navigation/native';
import { User } from "../features/user";
import { Product, Cart } from "../features/product";
import { Success, Failure } from "../util/result";
import { NavigationParameter } from "../routes/Routes";

export default function Carrinho({ navigation }: NavigationParameter<"Carrinho">) {
  const insets = useSafeAreaInsets();
  
  const [user, setUser] = useState<User.UserSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<Cart | null>(null);
  const [produtos, setProdutos] = useState<Product[]>([]);
  const [updatingQuantity, setUpdatingQuantity] = useState<number | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const userSession = User.auth;
      setUser(userSession);
      
      // Buscar produtos para "Mais opções"
      const produtosResult = await Product.list();
      if (produtosResult instanceof Success) {
        setProdutos(produtosResult.result.slice(0, 4)); // Primeiros 4 produtos
      }
      
      if (userSession) {
        const cartResult = await userSession.getCarrinho();
        if (cartResult instanceof Success) {
          setCart(cartResult.result);
        } else {
          console.error('Erro ao carregar carrinho:', cartResult.failure);
          Alert.alert("Erro", "Não foi possível carregar o carrinho");
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

  const alterarQuantidade = async (produto: Product, novaQuantidade: number) => {
    if (!user || novaQuantidade < 0) return;
    
    setUpdatingQuantity(produto.id);
    try {
      const result = await user.alterarQuantidadeCarrinho(produto, novaQuantidade);
      if (result instanceof Success) {
        // Recarregar carrinho
        await loadData();
      } else {
        Alert.alert("Erro", "Não foi possível alterar a quantidade");
      }
    } catch (error) {
      console.error("Erro ao alterar quantidade:", error);
      Alert.alert("Erro", "Erro interno");
    } finally {
      setUpdatingQuantity(null);
    }
  };

  const removerItem = async (produto: Product) => {
    if (!user) return;
    
    setUpdatingQuantity(produto.id);
    try {
      const result = await user.removerDoCarrinho(produto);
      if (result instanceof Success) {
        await loadData();
      } else {
        Alert.alert("Erro", "Não foi possível remover o item");
      }
    } catch (error) {
      console.error("Erro ao remover item:", error);
      Alert.alert("Erro", "Erro interno");
    } finally {
      setUpdatingQuantity(null);
    }
  };

  // Calcular subtotal
  const calcularSubtotal = () => {
    if (!cart) return 0;
    let total = 0;
    cart.items.forEach((item, produto) => {
      total += produto.preco * item.quantidade;
    });
    return total;
  };

  const addColor = () => {
    // Função removida - não utilizada
  };
  
  const removeColorAt = (idx: number) => {
    // Função removida - não utilizada
  };
  
  const updateColor = (idx: number, v: string) => {
    // Função removida - não utilizada
  };

  const addSize = () => {
    // Função removida - não utilizada
  };
  
  const removeSizeAt = (idx: number) => {
    // Função removida - não utilizada
  };
  
  const updateSize = (idx: number, v: string) => {
    // Função removida - não utilizada
  };

  const pickImage = async () => {
    // Função removida - não utilizada
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#8000ff", paddingTop: insets.top }}>
      <ScrollView contentContainerStyle={estilos.conteudoTela}>
        <View style={estilos.header}>
          <Text style={estilos.headerTitulo}>Carrinho</Text>
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 5,
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

        {!User.auth ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 50 }}>
            <Text style={{ color: '#fff', fontSize: 16, textAlign: 'center', marginBottom: 20 }}>
              Você precisa estar logado para ver seu carrinho.
            </Text>
            <TouchableOpacity 
              style={estilos.finalizarBtn}
              onPress={() => navigation.navigate('Entrar' as never)}
            >
              <Text style={estilos.finalizarTxt}>FAZER LOGIN</Text>
            </TouchableOpacity>
          </View>
        ) : loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 50 }}>
            <ActivityIndicator size="large" color="#8400FF" />
            <Text style={{ color: '#fff', marginTop: 10 }}>Carregando carrinho...</Text>
          </View>
        ) : !cart || cart.items.size === 0 ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 50 }}>
            <Icon name="shopping-cart" size={64} color="#666" />
            <Text style={{ color: '#fff', fontSize: 16, textAlign: 'center', marginTop: 20, marginBottom: 20 }}>
              Seu carrinho está vazio.
            </Text>
            <TouchableOpacity 
              style={estilos.finalizarBtn}
              onPress={() => navigation.navigate('Produto' as never)}
            >
              <Text style={estilos.finalizarTxt}>CONTINUAR COMPRANDO</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {Array.from(cart.items.entries()).map(([produto, item]) => (
              <View key={produto.id} style={estilos.itemCarrinho}>
                <View style={estilos.imgCarrinho}>
                  <Image source={{ uri: produto.imagem.getUrl() }} style={estilos.imgProduto} />
                </View>
                <View style={estilos.infoProduto}>
                  <Text style={estilos.nomeProduto}>{produto.nome.toUpperCase()}</Text>
                  <Text style={estilos.detProduto}>{produto.descricao}</Text>
                  {item.opcao && Array.isArray(item.opcao) && item.opcao.length > 0 && (
                    <Text style={estilos.detProduto}>Opções: {item.opcao.join(', ')}</Text>
                  )}
                  <Text style={estilos.precoProduto}>R$ {produto.preco.toFixed(2).replace('.', ',')}</Text>

                  <View style={estilos.controleQtd}>
                    <TouchableOpacity 
                      onPress={() => alterarQuantidade(produto, item.quantidade - 1)}
                      disabled={updatingQuantity === produto.id || item.quantidade <= 1}
                    >
                      <Text style={[estilos.btnQtd, updatingQuantity === produto.id && { opacity: 0.5 }]}>-</Text>
                    </TouchableOpacity>
                    <Text style={estilos.qtd}>{item.quantidade}</Text>
                    <TouchableOpacity 
                      onPress={() => alterarQuantidade(produto, item.quantidade + 1)}
                      disabled={updatingQuantity === produto.id}
                    >
                      <Text style={[estilos.btnQtd, updatingQuantity === produto.id && { opacity: 0.5 }]}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity 
                  style={estilos.removeBtn}
                  onPress={() => removerItem(produto)}
                  disabled={updatingQuantity === produto.id}
                >
                  <Icon name="x" style={[estilos.icon, updatingQuantity === produto.id && { opacity: 0.5 }]} />
                </TouchableOpacity>
              </View>
            ))}
          </>
        )}

        {/* Mais opções - só mostrar se há itens no carrinho */}
        {cart && cart.items.size > 0 && (
          <>
            <Text style={estilos.secaoTitulo}>Mais opções para você:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={estilos.listaProdutos}>
              {produtos.map((produto) => (
                <View key={produto.id} style={estilos.produtoSugestao}>
                  <Image source={{ uri: produto.imagem.getUrl() }} style={estilos.sugestaoImg} />
                  <Text style={estilos.sugestaoPreco}>R$ {produto.preco.toFixed(2).replace('.', ',')}</Text>
                  <TouchableOpacity 
                    style={estilos.comprarBtn} 
                    onPress={() => navigation.navigate('Detalhes', produto)}
                  >
                    <Text style={estilos.comprarTxt}>COMPRAR</Text>
                  </TouchableOpacity>
                </View>
              ))}
              
              {/* Fallback caso não carregue produtos do banco */}
              {produtos.length === 0 && (
                <>
                  <View style={estilos.produtoSugestao}>
                    <Image source={require('../../assets/img/produto2.png')} style={estilos.sugestaoImg} />
                    <Text style={estilos.sugestaoPreco}>R$ 99,90</Text>
                    <TouchableOpacity style={estilos.comprarBtn} onPress={() => navigation.navigate('Produto' as never)}>
                      <Text style={estilos.comprarTxt}>COMPRAR</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={estilos.produtoSugestao}>
                    <Image source={require('../../assets/img/produto1.png')} style={estilos.sugestaoImg} />
                    <Text style={estilos.sugestaoPreco}>R$ 399,90</Text>
                    <TouchableOpacity style={estilos.comprarBtn} onPress={() => navigation.navigate('Produto' as never)}>
                      <Text style={estilos.comprarTxt}>COMPRAR</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={estilos.produtoSugestao}>
                    <Image source={require('../../assets/img/produto3.png')} style={estilos.sugestaoImg} />
                    <Text style={estilos.sugestaoPreco}>R$ 299,90</Text>
                    <TouchableOpacity style={estilos.comprarBtn} onPress={() => navigation.navigate('Produto' as never)}>
                      <Text style={estilos.comprarTxt}>COMPRAR</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </ScrollView>

            <View style={estilos.subtotal}>
              <Text style={estilos.subtotalTxt}>Subtotal R$ {calcularSubtotal().toFixed(2).replace('.', ',')}</Text>
              <TouchableOpacity style={estilos.finalizarBtn}>
                <Text style={estilos.finalizarTxt}
                  onPress={() => navigation.navigate('InfoEntrega' as never)}>
                  FINALIZAR COMPRA
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
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