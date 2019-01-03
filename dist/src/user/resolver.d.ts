import { UserService } from './service';
import { CreateUserDTO } from '../graphql.schema';
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    login(logInfo: any): Promise<{
        id: string;
        token: string;
    }>;
    createUser(userInfo: CreateUserDTO): Promise<void>;
}
