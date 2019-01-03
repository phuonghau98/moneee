import { PipeTransform, ArgumentMetadata } from "@nestjs/common";
export declare class RecordTransformerPipe implements PipeTransform {
    private getTime;
    private initRecord;
    private: any;
    transform(value: any, metadata: ArgumentMetadata): Promise<any>;
}
