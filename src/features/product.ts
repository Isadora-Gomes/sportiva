import { Discount } from "./promotion";
import { User } from "./user";
import supabase from "../../supabase";
import { Failure, Result, Success } from "../util/result";
import { Image } from "./image";

export class Evaluation {
    readonly id: number;
    usuario: User;
    produto: Product;
    data: Date;
    nota: 1 | 2 | 3 | 4 | 5;
    comentario: string | null;

    constructor(id: number, usuario: User, produto: Product, date: Date, nota: 1 | 2 | 3 | 4 | 5, comentario: string | null) {
        this.id = id;
        this.usuario = usuario;
        this.produto = produto;
        this.data = date;
        this.nota = nota;
        this.comentario = comentario;
    }
}

export type ProductOption = string[]

export interface ProductOptions {
    [key: string]: string[]
}

export namespace ProductOptions {
    export function parse(json: { [key: string]: any } | string) {
        if (typeof json == "string") {
            json = JSON.parse(json);
        }
        const options: ProductOptions = {};
        for (const key in json as { [key: string]: any }) {
            const option = (json as { [key: string]: any })[key];
            if (option instanceof Array) {
                options[key] = option as string[];
            }
        }
        return options;
    }
}

export class Product {
    readonly id: number;
    nome: string;
    descricao: string;
    preco: number;
    estoque: number;
    categoria: string;
    opcoes: ProductOptions;
    imagem: Image;

    private constructor(id: number, nome: string, descricao: string, preco: number, estoque: number, categoria: string, opcoes: ProductOptions) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.estoque = estoque;
        this.categoria = categoria;
        this.opcoes = opcoes;
        this.imagem = new Image("produtos", this.id.toString());
    }

    static async create(nome: string, descricao: string, preco: number, estoque: number, categoria: string, opcoes: ProductOptions, imagemUri: string): Promise<Result<Product>> {
        // Primeiro, criar o produto no banco
        const resultDB = await supabase.from("produtos").insert({
            nome,
            descricao,
            preco,
            estoque,
            categoria,
            opcoes
        }).select("*").single();
        if (resultDB.error) {
            console.log(resultDB.error);
            return Failure.error("Não foi possível criar o produto");
        }
        const data = resultDB.data;

        try {
            // Fazer upload da imagem
            const imagePath = `produtos/${data.id}`;
            
            // Preparar arquivo para upload no React Native/Expo
            let fileToUpload: Uint8Array | string;
            
            if (imagemUri.startsWith('data:')) {
                // Se é uma URI de dados base64
                const base64Data = imagemUri.split(',')[1];
                // Converter base64 para Uint8Array
                const binaryString = atob(base64Data);
                const bytes = new Uint8Array(binaryString.length);
                for (let i = 0; i < binaryString.length; i++) {
                    bytes[i] = binaryString.charCodeAt(i);
                }
                fileToUpload = bytes;
            } else {
                // Para URI de arquivo local (file://, content://, etc.)
                try {
                    // Usar fetch para ler o arquivo como ArrayBuffer
                    const response = await fetch(imagemUri);
                    if (!response.ok) {
                        throw new Error('Não foi possível ler o arquivo de imagem');
                    }
                    const arrayBuffer = await response.arrayBuffer();
                    fileToUpload = new Uint8Array(arrayBuffer);
                } catch (fetchError) {
                    console.log("Erro ao ler arquivo:", fetchError);
                    // Fallback: tentar usar a URI diretamente (pode funcionar em alguns casos)
                    fileToUpload = imagemUri;
                }
            }

            const uploadResult = await supabase.storage
                .from("imagens")
                .upload(imagePath, fileToUpload, { 
                    upsert: true,
                    contentType: 'image/jpeg'
                });

            if (uploadResult.error) {
                console.log("Erro do Supabase Storage:", uploadResult.error);
                // Remover produto criado se falhou upload da imagem
                await supabase.from("produtos").delete().eq("id", data.id);
                return Failure.error("Não foi possível fazer upload da imagem do produto");
            }
        } catch (error) {
            console.log("Erro no upload da imagem:", error);
            // Remover produto criado se falhou upload da imagem
            await supabase.from("produtos").delete().eq("id", data.id);
            return Failure.error("Erro ao processar a imagem do produto");
        }

        const produto = new Product(data.id, data.nome, data.descricao, data.preco, data.estoque, categoria, opcoes);

        return new Success(produto);
    }

    static async byId(id: number): Promise<Result<Product>> {
        const resultDB = await supabase.from("produtos").select("*").eq("id", id).single();
        if (resultDB.error) {
            console.log(resultDB.error);
            return Failure.error("Não foi possível buscar os dados do produto");
        }
        const data = resultDB.data;
        const produto = new Product(data.id, data.nome, data.descricao, data.preco, data.estoque, data.categoria, ProductOptions.parse(data.opcoes));
        return new Success(produto);
    }

    static async list(categoria?: string): Promise<Result<Product[]>> {
        let query = supabase.from("produtos").select("*");
        
        if (categoria) {
            query = query.eq("categoria", categoria);
        }
        
        const resultDB = await query;
        if (resultDB.error) {
            console.log(resultDB.error);
            return Failure.error("Não foi possível buscar a lista de produtos");
        }
        
        const produtos: Product[] = [];
        for (const data of resultDB.data) {
            const produto = new Product(
                data.id,
                data.nome,
                data.descricao,
                data.preco,
                data.estoque,
                data.categoria,
                ProductOptions.parse(data.opcoes)
            );
            produtos.push(produto);
        }
        
        return new Success(produtos);
    }

    static async delete(id: string | number): Promise<Result<void>> {
        try {
            const idNumber = typeof id === 'string' ? parseInt(id) : id;
            
            // Deletar a imagem do Supabase Storage
            try {
                const imagePath = `produtos/${idNumber}`;
                await supabase.storage.from("imagens").remove([imagePath]);
            } catch (error) {
                console.log("Aviso: Não foi possível deletar a imagem:", error);
                // Continuar mesmo se falhar a deleção da imagem
            }

            // Deletar o produto do banco de dados
            const result = await supabase.from("produtos").delete().eq("id", idNumber);
            
            if (result.error) {
                console.log(result.error);
                return Failure.error("Não foi possível deletar o produto");
            }
            
            return new Success(undefined);
        } catch (error) {
            console.error("Erro ao deletar produto:", error);
            return Failure.error("Erro interno ao deletar produto");
        }
    }

    async getAvaliacoes(): Promise<Result<Evaluation[]>> {
        const resultDB = await supabase.from("avaliacoes").select("*").eq("produto", this.id);
        if (resultDB.error) {
            console.log(resultDB.error);
            return Failure.error("Não foi possível buscar as avaliações do produto");
        }
        const avaliacoes: Evaluation[] = [];
        for (const avaliacaoData of resultDB.data) {
            const usuarios: { [key: string]: User | null } = {}
            
            
            let usuario = usuarios[avaliacaoData.usuario];
            if (!usuario) {
                const userResult = await User.byId(avaliacaoData.usuario);
                if (userResult instanceof Failure) {
                    return Failure.error("Não foi possível buscar os dados do usuário da avaliação");
                }
                usuario = userResult.result;
                usuarios[avaliacaoData.usuario] = usuario;
            }

            const avaliacao = new Evaluation(
                avaliacaoData.id,
                usuario!,
                this,
                new Date(avaliacaoData.data),
                avaliacaoData.nota,
                avaliacaoData.comentario,
            );
            avaliacoes.push(avaliacao);
        }
        return new Success(avaliacoes);
    }
}

export class Purchase {
    readonly id: number;
    readonly usuario: User;
    readonly data: Date;
    readonly preco: number;
    readonly cupom: Coupon;
    readonly items: PurchaseItem[];

    constructor(id: number, usuario: User, data: Date, preco: number, cupom: Coupon, items: PurchaseItem[]) {
        this.id = id;
        this.usuario = usuario;
        this.data = data;
        this.preco = preco;
        this.cupom = cupom;
        this.items = items;
    }

    static async byId(id: number): Promise<Result<Purchase>> {
        // Buscar dados da compra
        const resultDB = await supabase.from("compras").select("*").eq("id", id).single();
        if (resultDB.error) {
            console.log(resultDB.error);
            return Failure.error("Não foi possível buscar os dados da compra");
        }
        const compraData = resultDB.data;

        // Buscar dados do usuário
        const usuarioResult = await User.byId(compraData.usuario);
        if (usuarioResult instanceof Failure) {
            return Failure.error("Não foi possível buscar os dados do usuário da compra");
        }
        const usuario = usuarioResult.result;
        if (!usuario) {
            return Failure.error("Usuário da compra não encontrado");
        }

        // Buscar itens da compra
        const resultItens = await supabase.from("itens_compras").select("*").eq("compra", id);
        if (resultItens.error) {
            console.log(resultItens.error);
            return Failure.error("Não foi possível buscar os itens da compra");
        }

        const items: PurchaseItem[] = [];
        for (const itemData of resultItens.data) {
            let produto: Product | null = null;
            
            // Buscar dados do produto se existir
            if (itemData.produto) {
                const produtoResult = await Product.byId(itemData.produto);
                if (produtoResult instanceof Success) {
                    produto = produtoResult.result;
                }
            }

            const item = new PurchaseItem(
                itemData.id,
                produto,
                itemData.quantidade,
                itemData.opcao ? JSON.parse(itemData.opcao) : null,
                {} as Purchase // Será definido após criar a compra
            );
            items.push(item);
        }

        // Criar cupom com base nos dados salvos
        let cupom: Coupon;
        if (compraData.cupom) {
            const cupomParsed = Coupon.parse(compraData.cupom);
            cupom = cupomParsed || Coupon.CUPONS_ESTATICOS.SEM_DESCONTO;
        } else {
            cupom = Coupon.CUPONS_ESTATICOS.SEM_DESCONTO;
        }

        const purchase = new Purchase(
            compraData.id,
            usuario,
            new Date(compraData.data),
            compraData.preco,
            cupom,
            items
        );

        // Atualizar referência da compra nos itens
        items.forEach(item => {
            (item as any).compra = purchase;
        });

        return new Success(purchase);
    }

    static async listByUser(userId: string): Promise<Result<Purchase[]>> {
        // Buscar compras do usuário
        const resultDB = await supabase.from("compras").select("*").eq("usuario", userId).order("data", { ascending: false });
        if (resultDB.error) {
            console.log(resultDB.error);
            return Failure.error("Não foi possível buscar as compras do usuário");
        }

        const purchases: Purchase[] = [];
        
        // Buscar dados do usuário uma vez
        const usuarioResult = await User.byId(userId);
        if (usuarioResult instanceof Failure) {
            return Failure.error("Não foi possível buscar os dados do usuário");
        }
        const usuario = usuarioResult.result;
        if (!usuario) {
            return Failure.error("Usuário não encontrado");
        }

        for (const compraData of resultDB.data) {
            // Buscar itens da compra
            const resultItens = await supabase.from("itens_compras").select("*").eq("compra", compraData.id);
            if (resultItens.error) {
                console.log(resultItens.error);
                continue; // Pular esta compra em caso de erro nos itens
            }

            const items: PurchaseItem[] = [];
            for (const itemData of resultItens.data) {
                let produto: Product | null = null;
                
                // Buscar dados do produto se existir
                if (itemData.produto) {
                    const produtoResult = await Product.byId(itemData.produto);
                    if (produtoResult instanceof Success) {
                        produto = produtoResult.result;
                    }
                }

                const item = new PurchaseItem(
                    itemData.id,
                    produto,
                    itemData.quantidade,
                    itemData.opcao ? JSON.parse(itemData.opcao) : null,
                    {} as Purchase // Será definido após criar a compra
                );
                items.push(item);
            }

            // Criar cupom com base nos dados salvos
            let cupom: Coupon;
            if (compraData.cupom) {
                const cupomParsed = Coupon.parse(compraData.cupom);
                cupom = cupomParsed || Coupon.CUPONS_ESTATICOS.SEM_DESCONTO;
            } else {
                cupom = Coupon.CUPONS_ESTATICOS.SEM_DESCONTO;
            }

            const purchase = new Purchase(
                compraData.id,
                usuario,
                new Date(compraData.data),
                compraData.preco,
                cupom,
                items
            );

            // Atualizar referência da compra nos itens
            items.forEach(item => {
                (item as any).compra = purchase;
            });

            purchases.push(purchase);
        }

        return new Success(purchases);
    }

    static async create(usuario: User, carrinho: Cart, cupom: Coupon | null = null): Promise<Result<Purchase>> {
        try {
            // Calcular preço total
            let precoTotal = 0;
            carrinho.items.forEach((item, produto) => {
                precoTotal += produto.preco * item.quantidade;
            });

            // Aplicar desconto do cupom se existir
            let precoFinal = precoTotal;
            let cupomFinal = cupom;
            
            if (cupom && cupom.isValido()) {
                const desconto = cupom.calcularDesconto(precoTotal);
                precoFinal = precoTotal - desconto;
            } else {
                cupomFinal = Coupon.CUPONS_ESTATICOS.SEM_DESCONTO;
            }

            // Criar compra no banco
            const compraResult = await supabase.from("compras").insert({
                usuario: usuario.uid,
                data: new Date().toISOString(),
                preco: precoFinal,
                cupom: cupomFinal ? cupomFinal.toJSON() : null
            }).select().single();

            if (compraResult.error) {
                console.log('Erro ao criar compra:', compraResult.error);
                return Failure.error("Não foi possível criar a compra");
            }

            const compraId = compraResult.data.id;

            // Criar itens da compra
            const itensCompra = [];
            for (const [produto, item] of carrinho.items.entries()) {
                itensCompra.push({
                    compra: compraId,
                    produto: produto.id,
                    quantidade: item.quantidade,
                    opcao: item.opcao ? JSON.stringify(item.opcao) : null
                });
            }

            const itensResult = await supabase.from("itens_compras").insert(itensCompra);
            if (itensResult.error) {
                console.log('Erro ao criar itens da compra:', itensResult.error);
                // Tentar remover a compra criada
                await supabase.from("compras").delete().eq("id", compraId);
                return Failure.error("Não foi possível criar os itens da compra");
            }

            // Limpar carrinho do usuário
            const clearCartResult = await supabase.from("itens_carrinhos").delete().eq("usuario", usuario.uid);
            if (clearCartResult.error) {
                console.log('Aviso: Não foi possível limpar o carrinho:', clearCartResult.error);
                // Não retornamos erro aqui pois a compra foi criada com sucesso
            }

            // Buscar a compra criada para retornar o objeto completo
            const purchaseResult = await Purchase.byId(compraId);
            if (purchaseResult instanceof Success) {
                return purchaseResult;
            }

            return Failure.error("Compra criada, mas não foi possível recuperar os dados");
        } catch (error) {
            console.error('Erro ao criar compra:', error);
            return Failure.error("Erro interno ao criar compra");
        }
    }
}

export class PurchaseItem {
    readonly id: number;
    readonly produto: Product | null;
    readonly quantidade: number;
    readonly opcao: ProductOption | null;
    readonly compra: Purchase;

    constructor(id: number, produto: Product | null, quantidade: number, opcao: ProductOption | null, compra: Purchase) {
        this.id = id;
        this.produto = produto;
        this.quantidade = quantidade;
        this.opcao = opcao;
        this.compra = compra;
    }
}

export class Cart {
    readonly usuario: User;
    readonly items: Map<Product, { quantidade: number, opcao: ProductOption | null }>;
    
    constructor(usuario: User, items: Map<Product, { quantidade: number, opcao: ProductOption | null }>) {
        this.usuario = usuario;
        this.items = items;
    }
}

export class Coupon {
    readonly codigo: string;
    readonly descricao: string;
    readonly discount: Discount;
    readonly ativo: boolean;
    readonly dataExpiracao: Date | null;

    private constructor(codigo: string, descricao: string, discount: Discount, ativo: boolean = true, dataExpiracao: Date | null = null) {
        this.codigo = codigo;
        this.descricao = descricao;
        this.discount = discount;
        this.ativo = ativo;
        this.dataExpiracao = dataExpiracao;
    }

    static parse(json: any): Coupon | null {
        if (!json || typeof json !== 'object') {
            return null;
        }

        try {
            const codigo = json.codigo || '';
            const descricao = json.descricao || '';
            const ativo = json.ativo !== false; // default true
            
            let dataExpiracao: Date | null = null;
            if (json.dataExpiracao) {
                dataExpiracao = new Date(json.dataExpiracao);
            }

            // Parse do discount
            let discount: Discount;
            if (json.discount) {
                const discountData = json.discount;
                const minValue = discountData.minValue || null;
                
                if (discountData.tipo === 'percentual') {
                    const porcentagem = discountData.valor || 0;
                    discount = {
                        minValue,
                        apply: (product: Product, amount: number) => {
                            const totalValue = product.preco * amount;
                            if (minValue && totalValue < minValue) return totalValue;
                            const discountValue = totalValue * (porcentagem / 100);
                            return totalValue - discountValue;
                        }
                    };
                } else if (discountData.tipo === 'valor_fixo') {
                    const valorFixo = discountData.valor || 0;
                    discount = {
                        minValue,
                        apply: (product: Product, amount: number) => {
                            const totalValue = product.preco * amount;
                            if (minValue && totalValue < minValue) return totalValue;
                            const discountValue = Math.min(valorFixo, totalValue);
                            return totalValue - discountValue;
                        }
                    };
                } else {
                    // Sem desconto
                    discount = {
                        minValue: null,
                        apply: (product: Product, amount: number) => product.preco * amount
                    };
                }
            } else {
                // Sem desconto
                discount = {
                    minValue: null,
                    apply: (product: Product, amount: number) => product.preco * amount
                };
            }

            return new Coupon(codigo, descricao, discount, ativo, dataExpiracao);
        } catch (error) {
            console.error('Erro ao parsear cupom:', error);
            return null;
        }
    }

    static fromJson(jsonString: string): Coupon | null {
        try {
            const json = JSON.parse(jsonString);
            return Coupon.parse(json);
        } catch (error) {
            console.error('Erro ao parsear JSON do cupom:', error);
            return null;
        }
    }

    // Cupons estáticos predefinidos
    static readonly CUPONS_ESTATICOS = {
        BEMVINDO10: new Coupon(
            'BEMVINDO10',
            'Desconto de boas-vindas de 10%',
            {
                minValue: 50,
                apply: (product: Product, amount: number) => {
                    const totalValue = product.preco * amount;
                    if (totalValue >= 50) {
                        const discount = totalValue * 0.10;
                        return totalValue - discount;
                    }
                    return totalValue;
                }
            },
            true
        ),
        
        FRETE_GRATIS: new Coupon(
            'FRETEGRATIS',
            'Frete grátis para compras acima de R$ 100',
            {
                minValue: 100,
                apply: (product: Product, amount: number) => {
                    const totalValue = product.preco * amount;
                    if (totalValue >= 100) {
                        return totalValue - 15; // R$ 15 de desconto simulando frete
                    }
                    return totalValue;
                }
            },
            true
        ),

        DESCONTO20: new Coupon(
            'DESCONTO20',
            'Desconto de 20% para compras acima de R$ 200',
            {
                minValue: 200,
                apply: (product: Product, amount: number) => {
                    const totalValue = product.preco * amount;
                    if (totalValue >= 200) {
                        const discount = totalValue * 0.20;
                        return totalValue - discount;
                    }
                    return totalValue;
                }
            },
            true
        ),

        CINQUENTA_OFF: new Coupon(
            'CINQUENTAOFF',
            'R$ 50 de desconto para compras acima de R$ 300',
            {
                minValue: 300,
                apply: (product: Product, amount: number) => {
                    const totalValue = product.preco * amount;
                    if (totalValue >= 300) {
                        const discount = Math.min(50, totalValue);
                        return totalValue - discount;
                    }
                    return totalValue;
                }
            },
            true
        ),

        SEM_DESCONTO: new Coupon(
            '',
            'Sem cupom aplicado',
            {
                minValue: null,
                apply: (product: Product, amount: number) => product.preco * amount
            },
            false
        )
    };

    static buscarPorCodigo(codigo: string): Coupon | null {
        const codigoUpper = codigo.toUpperCase().replace(/\s/g, '');
        
        // Buscar nos cupons estáticos
        for (const [key, cupom] of Object.entries(this.CUPONS_ESTATICOS)) {
            if (cupom.codigo.toUpperCase() === codigoUpper && cupom.ativo) {
                return cupom;
            }
        }
        
        return null;
    }

    isValido(): boolean {
        if (!this.ativo) return false;
        if (this.dataExpiracao && this.dataExpiracao < new Date()) return false;
        return true;
    }

    calcularDesconto(totalCarrinho: number): number {
        if (!this.isValido()) return 0;
        
        // Para calcular desconto total do carrinho, criamos um produto fictício
        const produtoFicticio = { preco: totalCarrinho } as Product;
        const precoComDesconto = this.discount.apply(produtoFicticio, 1);
        return totalCarrinho - precoComDesconto;
    }

    toJSON() {
        return {
            codigo: this.codigo,
            descricao: this.descricao,
            ativo: this.ativo,
            dataExpiracao: this.dataExpiracao?.toISOString(),
            discount: {
                minValue: this.discount.minValue
            }
        };
    }
}