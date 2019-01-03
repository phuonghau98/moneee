export declare class CreateUserDTO {
    name?: string;
    usn?: string;
    pwd?: string;
}
export declare class LogInfo {
    usn?: string;
    pwd?: string;
}
export declare class Accounts {
    bank?: number;
    cash?: number;
    cc?: number;
}
export declare class AuthenInfo {
    token?: string;
    id?: string;
}
export declare abstract class IMutation {
    abstract createUser(userInfo?: CreateUserDTO): User | Promise<User>;
}
export declare abstract class IQuery {
    abstract login(logInfo?: LogInfo): AuthenInfo | Promise<AuthenInfo>;
    abstract temp__(): boolean | Promise<boolean>;
}
export declare class User {
    id?: string;
    name?: string;
    usn?: string;
    pwd?: string;
    accounts?: Accounts;
}
