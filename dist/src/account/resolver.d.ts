import { AccountService } from "./service";
import { PubSub } from 'graphql-subscriptions';
export declare class AccountResolver {
    private readonly accountService;
    private readonly pubSub;
    constructor(accountService: AccountService, pubSub: PubSub);
    getAccounts(userId: string): Promise<any>;
    modifyAccounts(modifyPayload: any): Promise<any>;
    accountsChanged(): {
        subscribe: import("graphql-subscriptions").ResolverFn;
    };
}
