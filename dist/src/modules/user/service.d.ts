import { CreateUserInfoDTO, LoginInfoDTO } from '../../graphql.schema';
import { Model } from 'mongoose';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model);
    private findUserByUsn;
    private findUserById;
    private isPwdMatched;
    private updatePwd;
    private generateToken;
    createUser(createUserInfo: CreateUserInfoDTO): Promise<any>;
    login(loginInfo: LoginInfoDTO): Promise<{
        token: any;
        id: any;
    }>;
    updatePassword(changePwdInfo: any): Promise<{
        status: boolean;
    }>;
}
