// gaarrafa
import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Alert, Modal, FlatList } from "react-native";
import Icon from "../components/icon";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';

export default function Detalhes() {
	const insets = useSafeAreaInsets();
	const navigation = useNavigation();
	const images = [
		require('../../assets/img/produto2.png'),
		require('../../assets/img/garrafa2.png'),
		require('../../assets/img/garrafa3.png'),
	];

const [modalVisivel, setModalVisivel] = useState(false);

	const comentarios = [
		{
			id: '1',
			nome: 'Luis Felipe',
			texto: 'Amei demais, mas rasgou quando cai andando de bicicleta.',
			estrelas: 4,
		},
		{
			id: '2',
			nome: 'Wesley Fioreze',
			texto: 'Melhor camiseta que eu comprei na minha vida. Recomendo demais.',
			estrelas: 5,
		},
		{
			id: '3',
			nome: 'Lucas Machado',
			texto: 'Compro tudo na Sportiva, melhor loja que existe.',
			estrelas: 5,
		},
	];

	const [index, setIndex] = useState(0);
	const [selectedColor, setSelectedColor] = useState<string | null>('Roxo');
	const [selectedSize, setSelectedSize] = useState<string | null>('M');

	const colors = ['Roxo', 'Rosa', 'Vermelho', 'Verde', 'Azul', 'Amarelo'];

	function prev() { setIndex(i => Math.max(0, i - 1)); }
	function next() { setIndex(i => Math.min(images.length -1, i + 1)); }

	return (
		<SafeAreaView style={[styles.container, { paddingTop: insets.top }]}> 
			<ScrollView contentContainerStyle={styles.content}>
				<View style={styles.topbar}>
					<TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Produto' as never)}><Icon name="chevron-left" size={20} color="#fff" /></TouchableOpacity>
					<TouchableOpacity style={styles.iconBtn}><Icon name="heart" size={20} color="#fff" /></TouchableOpacity>
				</View>

				<View style={styles.carouselWrap}>
					<Image source={images[index]} style={styles.carouselImage} />
					<TouchableOpacity style={[styles.carouselNav, { left: 8 }]} onPress={prev}><Icon name="chevron-left" size={18} color="#fff" /></TouchableOpacity>
					<TouchableOpacity style={[styles.carouselNav, { right: 8 }]} onPress={next}><Icon name="chevron-right" size={18} color="#fff" /></TouchableOpacity>
				</View>

				<Text style={styles.title}>GARRAFA TÉRMICA</Text>
				<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
					<Text style={styles.price}>R$ 99,90</Text>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Icon name="star" size={16} color="#ffd455" />
						<Text style={styles.rating}>4.8</Text>
						<TouchableOpacity onPress={() => setModalVisivel(true)} style={{ marginLeft: 10 }}>
							<Icon name="comment" size={16} color="#fff" />
						</TouchableOpacity>
					</View>
				</View>

				<Text style={styles.description}>Mantém a bebida na temperatura ideal por horas. Prática, leve e resistente,
            perfeita para treinos, trabalho ou viagens.</Text>

				<Text style={styles.sectionTitle}>CORES</Text>
				<View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
					{colors.map(c => (
						<TouchableOpacity key={c} onPress={() => setSelectedColor(c)} style={[styles.chip, selectedColor === c && styles.chipActive]}>
							<Text style={[styles.chipText, selectedColor === c && styles.chipTextActive]}>{c}</Text>
						</TouchableOpacity>
					))}
				</View>


				<TouchableOpacity style={styles.addBtn} onPress={() => Alert.alert('Adicionado', 'Produto adicionado ao carrinho') }>
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
        data={comentarios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.comentarioBox}>
            <View style={styles.comentarioHeader}>
              <Icon name="user-circle" size={22} color="#A77BFF" />
              <Text style={styles.comentarioNome}>{item.nome}</Text>
              <View style={styles.estrelasContainer}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Icon
                    key={i}
                    name="star"
                    size={16}
                    color={i <= item.estrelas ? '#FFD700' : '#777'}
                    style={{ marginLeft: 2 }}
                  />
                ))}
              </View>
            </View>
            <Text style={styles.comentarioTexto}>{item.texto}</Text>
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
	rating: { color: '#fff', marginLeft: 6, fontWeight: '700' },
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
