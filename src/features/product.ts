import { Discount } from "./promotion";
import { User } from "./user";

export class Category {
    readonly id: number;
    nome: string;
    descricao: string;

    constructor(id: number, nome: string, descricao: string) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
    }
}

export class Product {
    readonly id: number;
    nome: string;
    descricao: string;
    preco: number;
    estoque: number;
    categoria: Category | null; 
    opcoes: ProductOption[];

    constructor(id: number, nome: string, descricao: string, preco: number, estoque: number, categoria: Category | null, opcoes: ProductOption[]) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.estoque = estoque;
        this.categoria = categoria;
        this.opcoes = opcoes;
    }
}

export class ProductOption {
    readonly id: number;
    nome: string;
    grupo: string;
    produto: Product;

    constructor(id: number, nome: string, grupo: string, produto: Product) {
        this.id = id;
        this.nome = nome;
        this.grupo = grupo;
        this.produto = produto;
    }
}

export class Evaluation {
    readonly id: number;
    usuario: User;
    produto: Product;
    date: Date;
    nota: 1 | 2 | 3 | 4 | 5;
    comentario: string | null;

    constructor(id: number, usuario: User, produto: Product, date: Date, nota: 1 | 2 | 3 | 4 | 5, comentario: string | null) {
        this.id = id;
        this.usuario = usuario;
        this.produto = produto;
        this.date = date;
        this.nota = nota;
        this.comentario = comentario;
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
}

class PurchaseItem {
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

export class Coupon {
    discount: Discount;

    private constructor(discount: Discount) {
        this.discount = discount;
    }
}