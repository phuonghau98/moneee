import { Model } from 'mongoose';
export declare class AuthService {
    private readonly userModel;
    constructor(userModel: Model);
    validate(authorizationHeader: any, userId: any): Promise<boolean>;
}
