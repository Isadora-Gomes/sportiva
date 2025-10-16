import { Failure, Result } from "../util/result";

export class User {
    readonly id: number;

    constructor(id: number) {
        this.id = id;
    }

    static Service =  class UserService {
        private auth: UserSession | null = null;
        
        async byId(): Promise<Result<User>> {
            if (this.auth == null) {
                return new Failure<User>("No auth found").result();
            }
            return new Failure<User>("Unimplemented").result();
        }

        async search(): Promise<Result<User[]>> {
            if (this.auth == null) {
                return new Failure<User[]>("No auth found").result();
            }
            return new Failure<User[]>("Unimplemented").result();
        }
    }

    static Repository = class UserRepository {
        
    }

    static Update = class UserUpdate {}

    static Session = class Session extends User {}
}

export type UserSession = InstanceType<typeof User.Session>;

export interface UserData {}