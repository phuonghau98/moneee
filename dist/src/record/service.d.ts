import { Model } from 'graphql';
export declare class RecordService {
    private readonly recordModel;
    private readonly userModel;
    constructor(recordModel: Model, userModel: Model);
    modifyAccount(userId: any, amount: any, code: any): Promise<void>;
    createRecord(record: any): Promise<any>;
    getRecord(userId: string): Promise<any>;
    removeRecord(recordId: string): Promise<any>;
}
