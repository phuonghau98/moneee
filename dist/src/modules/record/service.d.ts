import { Model } from 'graphql';
import { RecordInterface, UserInterface } from "../../database/interface";
export declare class RecordService {
    private readonly recordModel;
    private readonly userModel;
    constructor(recordModel: Model<RecordInterface>, userModel: Model<UserInterface>);
    private getRecordById;
    private isPermitted;
    private getNewDescriptions;
    private updateRecordDescrition;
    modifyAccount(userId: string, amount: number, code: string): Promise<void>;
    createRecord(record: any): Promise<any>;
    getRecord(userId: string): Promise<any>;
    removeRecord(recordId: string): Promise<any>;
    modifyDescription(modifyDescriptionPayload: any): Promise<void>;
}
