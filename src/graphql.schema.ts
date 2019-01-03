export class ChangePwdInfoDTO {
    userId: string;
    oldPwd: string;
    newPwd: string;
}

export class CreateUserInfoDTO {
    name?: string;
    usn?: string;
    pwd?: string;
}

export class DescriptionModifyPayload {
    curUserId: string;
    recordId: string;
    content?: string;
}

export class LoginInfoDTO {
    usn?: string;
    pwd?: string;
}

export class ModifyPayload {
    userId: string;
    isIncrease: boolean;
    amount: number;
    code: string;
}

export class RecordInput {
    belongsTo: string;
    amount: number;
    method: string;
    tag: string;
    description?: string;
}

export class Accounts {
    bank?: number;
    cc?: number;
    cash?: number;
}

export class AuthenInfo {
    token?: string;
    id?: string;
}

export class Description {
    id: string;
    content: string;
    date: string;
}

export abstract class IMutation {
    abstract modifyAccounts(modifyPayload?: ModifyPayload): Accounts | Promise<Accounts>;

    abstract createRecord(recordInfo?: RecordInput): Record | Promise<Record>;

    abstract deleteRecord(recordId: string): Record | Promise<Record>;

    abstract modifyDescription(descriptionModifyPayload?: DescriptionModifyPayload): Description | Promise<Description>;

    abstract createUser(createUserInfo?: CreateUserInfoDTO): User | Promise<User>;

    abstract updatePassword(changePwdInfo?: ChangePwdInfoDTO): Status | Promise<Status>;
}

export abstract class IQuery {
    abstract getAccounts(userId?: string): Accounts | Promise<Accounts>;

    abstract getRecord(userId: string): Record[] | Promise<Record[]>;

    abstract login(loginInfo?: LoginInfoDTO): AuthenInfo | Promise<AuthenInfo>;

    abstract temp__(): boolean | Promise<boolean>;
}

export class Record {
    id: string;
    belongsTo: string;
    amount: string;
    method: string;
    tag: string;
    date: string;
    description?: Description[];
}

export class Status {
    status?: boolean;
}

export abstract class ISubscription {
    abstract accountsChanged(userId?: string): Accounts | Promise<Accounts>;

    abstract recordCreated(userId: string): Record | Promise<Record>;
}

export class User {
    id?: string;
    name?: string;
    usn?: string;
    pwd?: string;
    accounts?: Accounts;
}
