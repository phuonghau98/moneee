import { Model } from 'mongoose';
export declare class AccountService {
    private readonly userModel;
    constructor(userModel: Model);
    private getUserById;
    getAccounts(userId: string): Promise<any>;
    modifyAccounts(payload: any): Promise<any>;
}
