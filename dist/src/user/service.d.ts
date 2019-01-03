import { CreateUserDTO, LogInfo } from '../graphql.schema';
export declare class UserService {
    createUser(userInfo: CreateUserDTO): Promise<void>;
    login(logInfo: LogInfo): Promise<{
        id: string;
        token: string;
    }>;
}
