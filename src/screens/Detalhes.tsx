// camisa
import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Alert, Modal, FlatList } from "react-native";
import Icon from "../components/icon";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NavigationParameter } from "../routes/Routes";
import { Evaluation } from "../features/product";
import { Success, Failure } from "../util/result";
import { User } from "../features/user";

export default function Detalhes({ navigation, route: { params: product } }: NavigationParameter<"Detalhes">) {
	const insets = useSafeAreaInsets();
	
	// Usar apenas a imagem do produto ao invés de múltiplas imagens
	const productImage = product.imagem.getUrl();

	const [modalVisivel, setModalVisivel] = useState(false);
	const [userAuth, setUserAuth] = useState(User.auth);

	const [avaliacoes, setAvaliacoes] = useState<Evaluation[]>([]);

	useEffect(() => {
		(async () => {
			const result = await product.getAvaliacoes();
			if (result instanceof Success) {
				setAvaliacoes(result.result);
			}
		})();
	}, [product]);

	// Atualizar estado do usuário quando a tela receber foco
	useFocusEffect(
		React.useCallback(() => {
			setUserAuth(User.auth);
		}, [])
	);

	const [index, setIndex] = useState(0);
	const [selectedColor, setSelectedColor] = useState<string | null>(
		product.opcoes.cores && product.opcoes.cores.length > 0 ? product.opcoes.cores[0] : null
	);
	const [selectedSize, setSelectedSize] = useState<string | null>(
		product.opcoes.tamanhos && product.opcoes.tamanhos.length > 0 ? product.opcoes.tamanhos[0] : null
	);

	const colors = product.opcoes.cores || [];
	const sizes = product.opcoes.tamanhos || [];

	const adicionarAoCarrinho = async () => {
		if (!userAuth) {
			Alert.alert("Erro", "Você precisa estar logado para adicionar produtos ao carrinho");
			navigation.navigate('Entrar');
			return;
		}

		// Preparar opções selecionadas - criar array com as opções selecionadas
		const opcoesSelecionadas: string[] = [];
		if (selectedColor) opcoesSelecionadas.push(selectedColor);
		if (selectedSize) opcoesSelecionadas.push(selectedSize);
		
		const opcaoFinal = opcoesSelecionadas.length > 0 ? opcoesSelecionadas : null;

		try {
			const resultado = await userAuth.adicionarAoCarrinho(product, 1, opcaoFinal);
			if (resultado instanceof Success) {
				Alert.alert("Sucesso", "Produto adicionado ao carrinho com sucesso!", [
					{ text: "Continuar comprando", style: "cancel" },
					{ text: "Ver carrinho", onPress: () => navigation.navigate('Carrinho' as never) }
				]);
			} else if (resultado instanceof Failure) {
				Alert.alert("Erro", resultado.failure);
			}
		} catch (error) {
			Alert.alert("Erro", "Erro interno ao adicionar ao carrinho");
		}
	};

	return (
		<SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
			<ScrollView contentContainerStyle={styles.content}>
				<View style={styles.topbar}>
					<TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Produto' as never)}><Icon name="chevron-left" size={20} color="#fff" /></TouchableOpacity>
					<TouchableOpacity style={styles.iconBtn}><Icon name="heart" size={20} color="#fff" /></TouchableOpacity>
				</View>

				<View style={styles.carouselWrap}>
					<Image source={{ uri: productImage }} style={styles.carouselImage} />
				</View>

				<Text style={styles.title}>{product.nome.toUpperCase()}</Text>
				<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
					<Text style={styles.price}>R$ {product.preco.toFixed(2).replace('.', ',')}</Text>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Icon name="star" size={16} color="#ffd455" />
						<Text style={styles.rating}>4.5</Text>
						<TouchableOpacity onPress={() => setModalVisivel(true)} style={{ marginLeft: 10 }}>
							<Icon name="comment" size={16} color="#fff" />
						</TouchableOpacity>

					</View>
				</View>

				<Text style={styles.description}>{product.descricao}</Text>

				{colors.length > 0 && (
					<>
						<Text style={styles.sectionTitle}>CORES</Text>
						<View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
							{colors.map(c => (
								<TouchableOpacity key={c} onPress={() => setSelectedColor(c)} style={[styles.chip, selectedColor === c && styles.chipActive]}>
									<Text style={[styles.chipText, selectedColor === c && styles.chipTextActive]}>{c}</Text>
								</TouchableOpacity>
							))}
						</View>
					</>
				)}

				{sizes.length > 0 && (
					<>
						<Text style={styles.sectionTitle}>TAMANHOS</Text>
						<View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
							{sizes.map(s => (
								<TouchableOpacity key={s} onPress={() => setSelectedSize(s)} style={[styles.size, selectedSize === s && styles.sizeActive]}>
									<Text style={[styles.sizeText, selectedSize === s && styles.sizeTextActive]}>{s}</Text>
								</TouchableOpacity>
							))}
						</View>
					</>
				)}

				<TouchableOpacity style={styles.addBtn} onPress={adicionarAoCarrinho}>
					<Text style={styles.addBtnText}>Adicionar ao carrinho</Text>
				</TouchableOpacity>

<Modal
  visible={modalVisivel}
  transparent
  animationType="fade"
  onRequestClose={() => setModalVisivel(false)}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitulo}>COMENTÁRIOS</Text>
      <View style={styles.linhaSeparadora} />

      <FlatList
        data={avaliacoes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.comentarioBox}>
            <View style={styles.comentarioHeader}>
              <Icon name="user-circle" size={22} color="#A77BFF" />
              <Text style={styles.comentarioNome}>{item.usuario.nome}</Text>
              <View style={styles.estrelasContainer}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Icon
                    key={i}
                    name="star"
                    size={16}
                    color={i <= item.nota ? '#FFD700' : '#777'}
                    style={{ marginLeft: 2 }}
                  />
                ))}
              </View>
            </View>
            <Text style={styles.comentarioTexto}>{item.comentario}</Text>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.botaoFechar}
        onPress={() => setModalVisivel(false)}
      >
        <Text style={styles.textoFechar}>Fechar</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#0f0f10' },
	content: { padding: 18, paddingBottom: 40 },
	topbar: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
	iconBtn: { padding: 8 },
	carouselWrap: { height: 220, backgroundColor: '#222', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
	carouselImage: { width: '92%', height: '92%', resizeMode: 'contain', borderRadius: 8 },
	carouselNav: { position: 'absolute', top: '50%', transform: [{ translateY: -18 }], backgroundColor: 'rgba(0,0,0,0.4)', padding: 8, borderRadius: 20 },
	title: { color: '#fff', fontSize: 20, fontWeight: '800', marginTop: 8 },
	price: { color: '#fff', fontSize: 16, fontWeight: '700' },
	rating: { color: '#fff', marginLeft: 6, fontWeight: '700'},
	description: { color: '#bfbfbf', marginTop: 12, marginBottom: 12 },
	sectionTitle: { color: '#fff', fontWeight: '700', marginTop: 8, marginBottom: 8 },
	chip: { backgroundColor: '#1f1f1f', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, marginRight: 8, marginBottom: 8 },
	chipActive: { backgroundColor: '#8000ff' },
	chipText: { color: '#fff', fontWeight: '700' },
	chipTextActive: { color: '#fff' },
	size: { backgroundColor: '#1f1f1f', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 20, marginRight: 8, marginBottom: 8 },
	sizeActive: { backgroundColor: '#8000ff' },
	sizeText: { color: '#fff', fontWeight: '700' },
	sizeTextActive: { color: '#fff' },
	addBtn: { marginTop: 18, backgroundColor: '#8000ff', paddingVertical: 14, borderRadius: 999, alignItems: 'center' },
	addBtnText: { color: '#fff', fontWeight: '800' },
	modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.6)',
  justifyContent: 'center',
  alignItems: 'center',
},
modalContainer: {
  backgroundColor: '#1c1c1c',
  width: 340,
  borderRadius: 15,
  paddingVertical: 20,
  paddingHorizontal: 15,
  shadowColor: '#000',
  shadowOpacity: 0.4,
  shadowRadius: 10,
},
modalTitulo: {
  color: '#fff',
  fontSize: 18,
  fontWeight: '700',
  textAlign: 'center',
  marginBottom: 8,
},
linhaSeparadora: {
  height: 2,
  backgroundColor: '#A77BFF',
  marginBottom: 15,
},
comentarioBox: {
  marginBottom: 12,
},
comentarioHeader: {
  flexDirection: 'row',
  alignItems: 'center',
},
comentarioNome: {
  color: '#fff',
  fontWeight: '700',
  marginLeft: 8,
  flex: 1,
},
estrelasContainer: {
  flexDirection: 'row',
  marginRight: 4,
},
comentarioTexto: {
  color: '#ccc',
  marginTop: 4,
  marginLeft: 30,
  fontSize: 13,
  lineHeight: 18,
},
botaoFechar: {
  backgroundColor: '#A77BFF',
  borderRadius: 8,
  paddingVertical: 10,
  marginTop: 10,
  alignSelf: 'center',
  width: 120,
  alignItems: 'center',
},
textoFechar: {
  color: '#fff',
  fontWeight: '700',
},

});
