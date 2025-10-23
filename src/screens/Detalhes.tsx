// camisa
import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Icon from "../components/icon";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';

export default function Detalhes() {
	const insets = useSafeAreaInsets();
	const navigation = useNavigation();
	const images = [
		require('../../assets/img/produto4.png'),
		require('../../assets/img/camisa2.png'),
		require('../../assets/img/camisa3.png'),
	];
	const [index, setIndex] = useState(0);
	const [selectedColor, setSelectedColor] = useState<string | null>('Roxo');
	const [selectedSize, setSelectedSize] = useState<string | null>('M');

	const colors = ['Roxo', 'Rosa', 'Vermelho', 'Verde', 'Azul', 'Amarelo'];
	const sizes = ['P','M','G','GG'];

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

				<Text style={styles.title}>CAMISETA FLOW</Text>
				<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
					<Text style={styles.price}>R$ 199,90</Text>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Icon name="star" size={16} color="#ffd455" />
						<Text style={styles.rating}>4.3</Text>
						<Icon name="comment" size={16} color="#fff" style={{ marginLeft: 10 }} />
						<Text style={styles.rating}>9</Text>
					</View>
				</View>

				<Text style={styles.description}>Camiseta Flow moderna, tecido mais confortável e de qualidade para todas as práticas esportivas.</Text>

				<Text style={styles.sectionTitle}>CORES</Text>
				<View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
					{colors.map(c => (
						<TouchableOpacity key={c} onPress={() => setSelectedColor(c)} style={[styles.chip, selectedColor === c && styles.chipActive]}>
							<Text style={[styles.chipText, selectedColor === c && styles.chipTextActive]}>{c}</Text>
						</TouchableOpacity>
					))}
				</View>

				<Text style={styles.sectionTitle}>TAMANHOS</Text>
				<View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
					{sizes.map(s => (
						<TouchableOpacity key={s} onPress={() => setSelectedSize(s)} style={[styles.size, selectedSize === s && styles.sizeActive]}>
							<Text style={[styles.sizeText, selectedSize === s && styles.sizeTextActive]}>{s}</Text>
						</TouchableOpacity>
					))}
				</View>

				<TouchableOpacity style={styles.addBtn} onPress={() => Alert.alert('Adicionado', 'Produto adicionado ao carrinho') }>
					<Text style={styles.addBtnText}>Adicionar ao carrinho</Text>
				</TouchableOpacity>

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
});
