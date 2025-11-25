import supabase from "../../supabase";
import { Failure, Result, Success } from "../util/result";
import { Image } from "./image";
import { NullableSetter, setToNull } from "./model";

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

    private static auth: User.UserSession | null = null;
    
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

    static Session = class Session extends User {}
}


export namespace User {
    export type UserSession = InstanceType<typeof User.Session>;
    
    export type UserUpdate = InstanceType<typeof User.Update>;
}