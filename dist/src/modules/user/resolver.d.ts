import { UserService } from './service';
import { CreateUserInfoDTO, LoginInfoDTO, ChangePwdInfoDTO } from '../../graphql.schema';
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    login(loginInfo: LoginInfoDTO): Promise<{
        token: any;
        id: any;
    }>;
    createUser(createUserInfo: CreateUserInfoDTO): Promise<any>;
    updatePassword(changePwdInfo: ChangePwdInfoDTO): Promise<{
        status: boolean;
    }>;
}
