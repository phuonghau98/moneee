import { PipeTransform, ArgumentMetadata } from "@nestjs/common";
export declare class RecordValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any;
}
