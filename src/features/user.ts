import { Failure, Result } from "../util/result";

export class User {
    readonly uid: string;

    constructor(uid: string) {
        this.uid = uid;
    }

    static Service =  class UserService {
        private auth: User.UserSession | null = null;
        
        async byId(uid: string): Promise<Result<User>> {
            if (this.auth == null) {
                return Failure.error("No auth found");
            }
            return Failure.error("Unimplemented");
        }

        async search(): Promise<Result<User[]>> {
            if (this.auth == null) {
                return Failure.error("No auth found");
            }
            return Failure.error("Unimplemented");
        }
    }

    static Repository = class UserRepository {
        
    }

    static Update = class UserUpdate {}

    static Session = class Session extends User {}
}


interface UserData {
    uid: string
}

export namespace User {
    export type UserSession = InstanceType<typeof User.Session>;
    
    export type UserRepository = InstanceType<typeof User.Repository>;

    export type UserUpdate = InstanceType<typeof User.Update>;

    export type UserService = InstanceType<typeof User.Service>;

    export type DataModel = UserData;
}