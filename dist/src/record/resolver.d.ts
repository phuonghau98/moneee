import { RecordService } from "./service";
import { PubSub } from "graphql-subscriptions";
export declare class RecordResolver {
    private readonly recordService;
    private readonly pubSub;
    constructor(recordService: RecordService, pubSub: PubSub);
    getRecord(userId: string): Promise<any>;
    createRecord(record: any): Promise<any>;
    deleteRecord(recordId: string): Promise<any>;
    recordCreated(userId: any): {
        subscribe: import("graphql-subscriptions").ResolverFn;
    };
}
