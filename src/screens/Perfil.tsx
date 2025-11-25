import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { NavigationParameter } from "../routes/Routes";
import { useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { User } from "../features/user";
import { Success, Failure } from "../util/result";


const Perfil = ({ navigation }: NavigationParameter) => {
    const insets = useSafeAreaInsets();
    const { width, height } = Dimensions.get('window');
    
    // Estados do usuário
    const [user, setUser] = useState<User.UserSession | null>(null);
    const [loading, setLoading] = useState(true);
    const [salvando, setSalvando] = useState(false);
    
    // Estados do formulário
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senhaAtual, setSenhaAtual] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [imageUri, setImageUri] = useState<string | null>(null);
    
    // Estados de edição
    const [editandoNome, setEditandoNome] = useState(false);
    const [editandoEmail, setEditandoEmail] = useState(false);
    const [editandoSenha, setEditandoSenha] = useState(false);

    const loadUserData = async () => {
        try {
            setLoading(true);
            const userSession = User.auth;
            if (userSession) {
                setUser(userSession);
                setNome(userSession.nome);
                setEmail(userSession.email);
                if (userSession.imagem) {
                    setImageUri(userSession.imagem.getUrl());
                }
            }
        } catch (error) {
            console.error('Erro ao carregar dados do usuário:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUserData();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            loadUserData();
        }, [])
    );

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.7,
            allowsEditing: true,
            aspect: [1, 1],
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    const salvarAlteracoes = async () => {
        if (!user) {
            Alert.alert("Erro", "Usuário não encontrado");
            return;
        }

        // Validações
        if (editandoNome && nome.trim().length < 2) {
            Alert.alert("Erro", "Nome deve ter pelo menos 2 caracteres");
            return;
        }

        if (editandoEmail && !email.includes('@')) {
            Alert.alert("Erro", "Email inválido");
            return;
        }

        if (editandoSenha) {
            if (!senhaAtual) {
                Alert.alert("Erro", "Digite sua senha atual");
                return;
            }
            if (novaSenha.length < 6) {
                Alert.alert("Erro", "Nova senha deve ter pelo menos 6 caracteres");
                return;
            }
            if (novaSenha !== confirmarSenha) {
                Alert.alert("Erro", "Confirmação de senha não confere");
                return;
            }
        }

        setSalvando(true);
        try {
            let alteracaoSucesso = true;
            let mensagensErro: string[] = [];

            // Atualizar nome se foi editado
            if (editandoNome && nome !== user.nome) {
                user.nome = nome;
                // Aqui você implementaria a atualização no banco
                // const result = await user.updateNome(nome);
                console.log('Atualizando nome para:', nome);
            }

            // Atualizar email se foi editado
            if (editandoEmail && email !== user.email) {
                user.email = email;
                // Aqui você implementaria a atualização no banco
                // const result = await user.updateEmail(email);
                console.log('Atualizando email para:', email);
            }

            // Atualizar senha se foi editada
            if (editandoSenha) {
                // Aqui você implementaria a mudança de senha
                // const result = await user.changePassword(senhaAtual, novaSenha);
                console.log('Atualizando senha');
                setSenhaAtual('');
                setNovaSenha('');
                setConfirmarSenha('');
            }

            // Atualizar foto se foi alterada
            if (imageUri && imageUri !== user.imagem?.getUrl()) {
                // Aqui você implementaria o upload da imagem
                // const result = await user.updateProfileImage(imageUri);
                console.log('Atualizando foto de perfil');
            }

            if (alteracaoSucesso) {
                Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
                setEditandoNome(false);
                setEditandoEmail(false);
                setEditandoSenha(false);
            } else {
                Alert.alert("Erro", `Não foi possível atualizar: ${mensagensErro.join(', ')}`);
            }
        } catch (error) {
            console.error('Erro ao salvar alterações:', error);
            Alert.alert("Erro", "Erro interno ao salvar alterações");
        } finally {
            setSalvando(false);
        }
    };

    const logout = async () => {
        Alert.alert(
            "Confirmar Logout",
            "Tem certeza que deseja sair?",
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Sair", 
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await User.logout();
                            navigation.navigate('Inicio');
                        } catch (error) {
                            console.error('Erro ao fazer logout:', error);
                        }
                    }
                }
            ]
        );
    };

    const cancelarEdicao = () => {
        if (user) {
            setNome(user.nome);
            setEmail(user.email);
            if (user.imagem) {
                setImageUri(user.imagem.getUrl());
            } else {
                setImageUri(null);
            }
        }
        setSenhaAtual('');
        setNovaSenha('');
        setConfirmarSenha('');
        setEditandoNome(false);
        setEditandoEmail(false);
        setEditandoSenha(false);
    };


    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#6CB9FF" />
                <Text style={{ marginTop: 16, color: '#555' }}>Carregando perfil...</Text>
            </View>
        );
    }

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <ScrollView 
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <TouchableOpacity 
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={24} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Meu Perfil</Text>
                    <View style={styles.headerSpacer} />
                </View>

                {/* Foto do Perfil */}
                <View style={styles.profileImageSection}>
                    <TouchableOpacity onPress={pickImage} style={styles.profileImageContainer}>
                        {imageUri ? (
                            <Image source={{ uri: imageUri }} style={styles.profileImage} />
                        ) : (
                            <View style={styles.profileImagePlaceholder}>
                                <Ionicons name="person" size={60} color="#CCCCCC" />
                            </View>
                        )}
                        <View style={styles.editImageOverlay}>
                            <Ionicons name="camera" size={16} color="#FFF" />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.profileName}>{user?.nome || 'Usuário'}</Text>
                </View>

                {/* Seção de Informações Pessoais */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Informações Pessoais</Text>
                    
                    {/* Nome */}
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>Nome</Text>
                        {editandoNome ? (
                            <View style={styles.editingContainer}>
                                <TextInput
                                    style={styles.textInput}
                                    value={nome}
                                    onChangeText={setNome}
                                    placeholder="Seu nome"
                                />
                                <View style={styles.editButtons}>
                                    <TouchableOpacity 
                                        style={[styles.editButton, styles.cancelButton]}
                                        onPress={() => {
                                            setNome(user?.nome || '');
                                            setEditandoNome(false);
                                        }}
                                    >
                                        <Ionicons name="close" size={16} color="#FF6B6B" />
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        style={[styles.editButton, styles.saveButton]}
                                        onPress={() => setEditandoNome(false)}
                                    >
                                        <Ionicons name="checkmark" size={16} color="#4ECDC4" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) : (
                            <View style={styles.fieldDisplay}>
                                <Text style={styles.fieldValue}>{nome}</Text>
                                <TouchableOpacity 
                                    style={styles.editIcon}
                                    onPress={() => setEditandoNome(true)}
                                >
                                    <Ionicons name="pencil" size={16} color="#6CB9FF" />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>

                    {/* Email */}
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>Email</Text>
                        {editandoEmail ? (
                            <View style={styles.editingContainer}>
                                <TextInput
                                    style={styles.textInput}
                                    value={email}
                                    onChangeText={setEmail}
                                    placeholder="Seu email"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                                <View style={styles.editButtons}>
                                    <TouchableOpacity 
                                        style={[styles.editButton, styles.cancelButton]}
                                        onPress={() => {
                                            setEmail(user?.email || '');
                                            setEditandoEmail(false);
                                        }}
                                    >
                                        <Ionicons name="close" size={16} color="#FF6B6B" />
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        style={[styles.editButton, styles.saveButton]}
                                        onPress={() => setEditandoEmail(false)}
                                    >
                                        <Ionicons name="checkmark" size={16} color="#4ECDC4" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) : (
                            <View style={styles.fieldDisplay}>
                                <Text style={styles.fieldValue}>{email}</Text>
                                <TouchableOpacity 
                                    style={styles.editIcon}
                                    onPress={() => setEditandoEmail(true)}
                                >
                                    <Ionicons name="pencil" size={16} color="#6CB9FF" />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>

                {/* Seção de Segurança */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Segurança</Text>
                    
                    <TouchableOpacity 
                        style={styles.passwordButton}
                        onPress={() => setEditandoSenha(!editandoSenha)}
                    >
                        <Text style={styles.passwordButtonText}>
                            {editandoSenha ? 'Cancelar alteração de senha' : 'Alterar senha'}
                        </Text>
                        <Ionicons 
                            name={editandoSenha ? "chevron-up" : "chevron-down"} 
                            size={20} 
                            color="#6CB9FF" 
                        />
                    </TouchableOpacity>

                    {editandoSenha && (
                        <View style={styles.passwordSection}>
                            <TextInput
                                style={styles.textInput}
                                value={senhaAtual}
                                onChangeText={setSenhaAtual}
                                placeholder="Senha atual"
                                secureTextEntry
                            />
                            <TextInput
                                style={styles.textInput}
                                value={novaSenha}
                                onChangeText={setNovaSenha}
                                placeholder="Nova senha (min. 6 caracteres)"
                                secureTextEntry
                            />
                            <TextInput
                                style={styles.textInput}
                                value={confirmarSenha}
                                onChangeText={setConfirmarSenha}
                                placeholder="Confirmar nova senha"
                                secureTextEntry
                            />
                        </View>
                    )}
                </View>

                {/* Botões de Ação */}
                <View style={styles.actionButtons}>
                    {(editandoNome || editandoEmail || editandoSenha || imageUri !== user?.imagem?.getUrl()) && (
                        <View style={styles.saveSection}>
                            <TouchableOpacity 
                                style={styles.cancelAllButton}
                                onPress={cancelarEdicao}
                            >
                                <Text style={styles.cancelAllButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                style={[styles.saveAllButton, salvando && styles.saveAllButtonDisabled]}
                                onPress={salvarAlteracoes}
                                disabled={salvando}
                            >
                                {salvando ? (
                                    <ActivityIndicator size="small" color="#FFF" />
                                ) : (
                                    <Text style={styles.saveAllButtonText}>Salvar Alterações</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    )}

                    <TouchableOpacity 
                        style={styles.logoutButton}
                        onPress={logout}
                    >
                        <Ionicons name="log-out-outline" size={20} color="#FF6B6B" />
                        <Text style={styles.logoutButtonText}>Sair da Conta</Text>
                    </TouchableOpacity>
                </View>

                {/* Menu de Navegação */}
                <View style={styles.navigationMenu}>
                    <TouchableOpacity 
                        style={styles.navButton}
                        onPress={() => navigation.navigate('HistoricoCompras')}
                    >
                        <Ionicons name="receipt-outline" size={20} color="#6CB9FF" />
                        <Text style={styles.navButtonText}>Histórico de Compras</Text>
                        <Ionicons name="chevron-forward" size={16} color="#CCCCCC" />
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.navButton}
                        onPress={() => navigation.navigate('Carrinho')}
                    >
                        <Ionicons name="cart-outline" size={20} color="#6CB9FF" />
                        <Text style={styles.navButtonText}>Meu Carrinho</Text>
                        <Ionicons name="chevron-forward" size={16} color="#CCCCCC" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E1E8ED',
    },
    backButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: '#F0F0F0',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
        flex: 1,
    },
    headerSpacer: {
        width: 40,
    },
    profileImageSection: {
        alignItems: 'center',
        paddingVertical: 24,
        backgroundColor: '#FFFFFF',
        marginTop: 8,
    },
    profileImageContainer: {
        position: 'relative',
        marginBottom: 12,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    profileImagePlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    editImageOverlay: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#6CB9FF',
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    profileName: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        marginTop: 8,
    },
    section: {
        backgroundColor: '#FFFFFF',
        marginTop: 8,
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 16,
    },
    fieldContainer: {
        marginBottom: 20,
    },
    fieldLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#666',
        marginBottom: 8,
    },
    fieldDisplay: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#F8F9FA',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E1E8ED',
    },
    fieldValue: {
        fontSize: 16,
        color: '#333',
        flex: 1,
    },
    editIcon: {
        padding: 4,
    },
    editingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    textInput: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E1E8ED',
        fontSize: 16,
        color: '#333',
    },
    editButtons: {
        flexDirection: 'row',
        gap: 8,
    },
    editButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#FFE5E5',
    },
    saveButton: {
        backgroundColor: '#E5F9F6',
    },
    passwordButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#F8F9FA',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E1E8ED',
    },
    passwordButtonText: {
        fontSize: 16,
        color: '#6CB9FF',
        fontWeight: '500',
    },
    passwordSection: {
        marginTop: 16,
        gap: 12,
    },
    actionButtons: {
        padding: 20,
    },
    saveSection: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 16,
    },
    cancelAllButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E1E8ED',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    cancelAllButtonText: {
        color: '#666',
        fontSize: 16,
        fontWeight: '500',
    },
    saveAllButton: {
        flex: 2,
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        backgroundColor: '#6CB9FF',
    },
    saveAllButtonDisabled: {
        backgroundColor: '#B0D4FF',
    },
    saveAllButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#FFE5E5',
        backgroundColor: '#FFF5F5',
        gap: 8,
    },
    logoutButtonText: {
        color: '#FF6B6B',
        fontSize: 16,
        fontWeight: '500',
    },
    navigationMenu: {
        backgroundColor: '#FFFFFF',
        marginTop: 8,
        paddingVertical: 8,
    },
    navButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
        gap: 12,
    },
    navButtonText: {
        fontSize: 16,
        color: '#333',
        flex: 1,
    },
    // Styles antigos mantidos para compatibilidade
    background: {
        flex: 1,
        backgroundColor: '#000',
    },
    logo: {
        width: 400,
        height: 200,
    },
    titulo: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '500',
        fontFamily: 'Outfit',
        padding: 30,
        textAlign: 'left',
        width: '100%',
        height: 100,
        backgroundColor: '#8400FF'
    },
    label: {
        color: '#D2D2D2',
        fontSize: 16,
        marginBottom: 5,
        fontFamily: 'Gotham',
        alignSelf: 'flex-start',
        marginLeft: 40,
        fontWeight: '600',
    },
    input: {
        flex: 1,
        height: 40,
        color: '#fff',
        fontFamily: 'Gotham',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#8400FF',
        marginBottom: 20,
        width: 300,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 38,
        width: 300,
        borderRadius: 17,
        marginBottom: 20,
        marginTop: 20,
        backgroundColor: 'rgb(83, 72, 207)',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '800',
        fontFamily: 'Gotham',
    },
    textCadastro: {
        marginTop: 20,
        marginBottom: 80,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 60,
    },
    linkCadastro: {
        fontFamily: 'Gotham',
        fontSize: 16,
        color: '#AFAFAF',
    },
    linkDestacado: {
        color: '#8400FF',
        textDecorationLine: 'underline',
    },
    divfoto: {
        alignItems: "center",
        marginBottom: 20,
    },
    foto: {
        width: 140,
        height: 140,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 13,
    },
});

export default Perfil;