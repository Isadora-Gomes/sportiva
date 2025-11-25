import supabase from "../../supabase";
import { Failure, Result, Success } from "../util/result";
import { Image } from "./image";
import { NullableSetter, setToNull } from "./model";
import { Cart, Product, ProductOption, Purchase, Coupon } from "./product";

export class User {
    readonly uid: string;
    nome: string;
    email: string;
    imagem: Image | null;
    criado_em: Date;
    admin: boolean;

    constructor(uid: string, nome: string, email: string, imagem: Image | null, criado_em: Date, admin: boolean) {
        this.uid = uid;
        this.nome = nome;
        this.email = email;
        this.imagem = imagem;
        this.criado_em = criado_em;
        this.admin = admin;
    }

    static auth: User.UserSession | null = null;
    
    static async byId(uid: string): Promise<Result<User>> {
        if (this.auth == null) {
            return Failure.error("Nenhum usuário autenticado");
        }
        
        const resultDB = await supabase.from("usuarios").select("*").eq("id", uid);

        if (resultDB.error) {
            console.log(resultDB.error);
            return Failure.error("Não foi possível buscar os dados do usuário");
        }

        if (resultDB.data.length == 0) {
            return Failure.error("Usuário não encontrado");
        }

        const userData = resultDB.data[0];

        const user = new User(
            userData.uid,
            userData.nome,
            userData.email,
            userData.imagem ? new Image("usuarios", userData.uid) : null,
            new Date(userData.criado_em),
            userData.admin
        );

        return new Success(user);
    }

    private static readonly userMap = (userData: any) => new User(
        userData.uid,
        userData.nome,
        userData.email,
        userData.imagem ? new Image("usuarios", userData.uid) : null,
        new Date(userData.criado_em),
        userData.admin
    );

    static async search(): Promise<Result<User[]>> {
        if (this.auth == null) {
            return Failure.error("Nenhum usuário autenticado");
        }
        const resultDB = await supabase.from("usuarios").select("*");
        if (resultDB.error) {
            console.log(resultDB.error);
            return Failure.error("Não foi possível buscar os dados dos usuários");
        }
        const users = resultDB.data.map(User.userMap);

        return new Success(users);
    }

    static async logout(): Promise<Result<void>> {
        const result = await supabase.auth.signOut();
        if (result.error) {
            console.log(result.error);
            return Failure.error("Não foi possível finalizar a sessão");
        }
        this.auth = null;
        return new Success<void>(undefined);
    }

    static async login(email: string, password: string): Promise<Result<User.UserSession>> {
        if (this.auth != null) {
            return Failure.error("Sessão já existente");
        }
        const resultAuth = await supabase.auth.signInWithPassword({ email, password });
        if (resultAuth.error) {
            console.log(resultAuth.error);
            return Failure.error(`Não foi possível finalizar sua autenticação`);
        }
        const user = resultAuth.data.user;
        if (!user) {
            return Failure.error("Usuário não encontrado");
        }

        const resultDB = await supabase.from("usuarios").select("*").eq("id", user.id);

        if (resultDB.error) {
            console.log(resultDB.error);
            return Failure.error("Não foi possível buscar os dados do usuário");
        }

        if (resultDB.data.length == 0) {
            return Failure.error("Dados do usuário não encontrados");
        }

        const userData = resultDB.data[0];

        this.auth = new User.Session(
            user.id,
            userData.nome,
            userData.email,
            userData.imagem ? new Image("usuarios", user.id) : null,
            new Date(userData.criado_em),
            userData.admin
        );
        return new Success(this.auth);
    }

    static async register(name: string, email: string, password: string): Promise<Result<User.UserSession>> {
        if (this.auth != null) {
            return Failure.error("Sessão já existente");
        }
        const result = await supabase.auth.signUp({ 
            email, 
            password,
            options: {
                data: {
                    name: name
                }
            }
        });
        if (result.error) {
            console.log(result.error);
            return Failure.error(`Não foi possível criar sua conta`);
        }
        const user = result.data.user;
        if (!user) {
            return Failure.error("Falha ao criar usuário");
        }

        const resultDB = await supabase.from("usuarios").insert({
            id: user.id,
            nome: name,
            email: email,
        });

        if (resultDB.error) {
            console.log(resultDB.error);
            return Failure.error("Não foi possível salvar os dados do usuário");
        }

        this.auth = new User.Session(
            user.id,
            name,
            email,
            null,
            new Date(),
            false
        );
        return new Success(this.auth);
    }

    static Update = class UserUpdate {
        nome: string | null;
        imagem: NullableSetter<string>;
        email: string | null;
        senha: string | null;

        constructor(nome: string | null, imagem: NullableSetter<string>, email: string | null, senha: string | null) {
            this.nome = nome;
            this.imagem = imagem;
            this.email = email;
            this.senha = senha;
        }

        async apply(): Promise<Result<void>> {
            if (User.auth == null) {
                return Failure.error("Nenhum usuário autenticado");
            }

            const updates: {
                nome?: string,
                imagem?: boolean,
                email?: string,
                senha?: string
            } = {};
            
            if (this.nome !== null) {
                updates.nome = this.nome;
            }
            if (this.email !== null) {
                updates.email = this.email;
            }
            if (this.imagem == setToNull) {
                const resultStorage = await supabase.storage.from("imagens").remove([User.auth.imagem!.getUrl()]);
                if (resultStorage.error) {
                    console.log(resultStorage.error);
                    return Failure.error("Não foi possível remover a imagem de perfil");
                }
                updates.imagem = false;
            } else if (this.imagem !== null) {
                const imagePath = `usuarios/${User.auth.uid}`;
                const uploadResult = await supabase.storage.from("imagens").upload(imagePath, this.imagem as string, { upsert: true });
                if (uploadResult.error) {
                    console.log(uploadResult.error);
                    return Failure.error("Não foi possível atualizar a imagem de perfil");
                }
                updates.imagem = true;
            }

            const resultDB = await supabase.from("usuarios").update(updates).eq("id", User.auth.uid);
            if (resultDB.error) {
                console.log(resultDB.error);
                return Failure.error("Não foi possível atualizar os dados do usuário");
            }

            if ("nome" in updates) User.auth.nome = updates.nome!;
            if ("email" in updates) User.auth.email = updates.email!;
            if ("imagem" in updates) {
                if (updates.imagem === false) {
                    User.auth.imagem = null;
                } else {
                    User.auth.imagem = new Image("usuarios", User.auth.uid);
                }
            }

            if ("email" in updates || "senha" in updates) {
                const resultUpdateAuth = await supabase.auth.updateUser({
                    email: updates.email,
                    password: this.senha !== null ? this.senha : undefined,
                });
                if (resultUpdateAuth.error) {
                    console.log(resultUpdateAuth.error);
                    return Failure.error("Não foi possível atualizar os dados de autenticação");
                }
            }

            return new Success<void>(undefined);
        }
    }

    static Session = class Session extends User {
        private _carrinho: Cart | null = null;

        constructor(uid: string, nome: string, email: string, imagem: Image | null, criado_em: Date, admin: boolean) {
            super(uid, nome, email, imagem, criado_em, admin);
        }

        async getCarrinho(): Promise<Result<Cart>> {
            if (this._carrinho) {
                return new Success(this._carrinho);
            }

            const resultDBCarrinho = await supabase.from("itens_carrinhos").select("*").eq("usuario", this.uid);
            if (resultDBCarrinho.error) {
                console.log(resultDBCarrinho.error);
                return Failure.error("Não foi possível buscar os dados do carrinho do usuário");
            }

            const items: Map<Product, { quantidade: number, opcao: ProductOption | null }> = new Map();
            for (const itemData of resultDBCarrinho.data) {
                const productResult = await Product.byId(itemData.produto);
                if (productResult instanceof Failure) {
                    return Failure.error("Não foi possível buscar os dados do produto do carrinho");
                }
                const product = productResult.result;

                if (!product) {
                    return Failure.error("Produto do carrinho não encontrado");
                }

                const opcao = itemData.opcao ? JSON.parse(itemData.opcao) : null;
                items.set(product, { quantidade: itemData.quantidade, opcao });
            }

            this._carrinho = new Cart(this, items);
            return new Success(this._carrinho);
        }

        clearCarrinhoCache() {
            this._carrinho = null;
        }

        async adicionarAoCarrinho(produto: Product, quantidade: number = 1, opcao: ProductOption | null = null): Promise<Result<void>> {
            try {
                // Verificar se o item já existe no carrinho
                const resultDBExistente = await supabase
                    .from("itens_carrinhos")
                    .select("*")
                    .eq("usuario", this.uid)
                    .eq("produto", produto.id)
                    .single();

                if (resultDBExistente.data) {
                    // Item já existe, atualizar a quantidade
                    const novaQuantidade = resultDBExistente.data.quantidade + quantidade;
                    const resultUpdate = await supabase
                        .from("itens_carrinhos")
                        .update({ 
                            quantidade: novaQuantidade,
                            opcao: opcao ? JSON.stringify(opcao) : null 
                        })
                        .eq("usuario", this.uid)
                        .eq("produto", produto.id);

                    if (resultUpdate.error) {
                        console.log(resultUpdate.error);
                        return Failure.error("Não foi possível atualizar a quantidade no carrinho");
                    }
                } else {
                    // Item não existe, inserir novo item
                    const resultInsert = await supabase
                        .from("itens_carrinhos")
                        .insert({
                            usuario: this.uid,
                            produto: produto.id,
                            quantidade: quantidade,
                            opcao: opcao ? JSON.stringify(opcao) : null
                        });

                    if (resultInsert.error) {
                        console.log(resultInsert.error);
                        return Failure.error("Não foi possível adicionar o item ao carrinho");
                    }
                }

                // Limpar cache do carrinho para forçar recarregamento
                this.clearCarrinhoCache();
                
                return new Success<void>(undefined);
            } catch (error) {
                console.error("Erro ao adicionar ao carrinho:", error);
                return Failure.error("Erro interno ao adicionar ao carrinho");
            }
        }

        async alterarQuantidadeCarrinho(produto: Product, novaQuantidade: number): Promise<Result<void>> {
            try {
                if (novaQuantidade <= 0) {
                    return await this.removerDoCarrinho(produto);
                }

                const resultUpdate = await supabase
                    .from("itens_carrinhos")
                    .update({ quantidade: novaQuantidade })
                    .eq("usuario", this.uid)
                    .eq("produto", produto.id);

                if (resultUpdate.error) {
                    console.log(resultUpdate.error);
                    return Failure.error("Não foi possível alterar a quantidade do item");
                }

                // Limpar cache do carrinho para forçar recarregamento
                this.clearCarrinhoCache();
                
                return new Success<void>(undefined);
            } catch (error) {
                console.error("Erro ao alterar quantidade:", error);
                return Failure.error("Erro interno ao alterar quantidade");
            }
        }

        async removerDoCarrinho(produto: Product): Promise<Result<void>> {
            try {
                const resultDelete = await supabase
                    .from("itens_carrinhos")
                    .delete()
                    .eq("usuario", this.uid)
                    .eq("produto", produto.id);

                if (resultDelete.error) {
                    console.log(resultDelete.error);
                    return Failure.error("Não foi possível remover o item do carrinho");
                }

                // Limpar cache do carrinho para forçar recarregamento
                this.clearCarrinhoCache();
                
                return new Success<void>(undefined);
            } catch (error) {
                console.error("Erro ao remover do carrinho:", error);
                return Failure.error("Erro interno ao remover do carrinho");
            }
        }

        async finalizarCompra(cupom: Coupon | null = null): Promise<Result<Purchase>> {
            try {
                // Buscar carrinho atual
                const carrinhoResult = await this.getCarrinho();
                if (carrinhoResult instanceof Failure) {
                    return Failure.error("Não foi possível acessar o carrinho");
                }

                const carrinho = carrinhoResult.result;
                if (!carrinho || carrinho.items.size === 0) {
                    return Failure.error("Carrinho está vazio");
                }

                // Criar compra
                const compraResult = await Purchase.create(this, carrinho, cupom);
                if (compraResult instanceof Success) {
                    // Limpar cache do carrinho
                    this.clearCarrinhoCache();
                    return compraResult;
                }

                return compraResult;
            } catch (error) {
                console.error("Erro ao finalizar compra:", error);
                return Failure.error("Erro interno ao finalizar compra");
            }
        }

        async obterHistoricoCompras(): Promise<Result<Purchase[]>> {
            try {
                return await Purchase.listByUser(this.uid);
            } catch (error) {
                console.error("Erro ao obter histórico de compras:", error);
                return Failure.error("Erro interno ao obter histórico");
            }
        }
    }
}


export namespace User {
    export type UserSession = InstanceType<typeof User.Session>;
    
    export type UserUpdate = InstanceType<typeof User.Update>;
}