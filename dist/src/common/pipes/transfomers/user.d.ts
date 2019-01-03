import { PipeTransform, ArgumentMetadata } from "@nestjs/common";
export declare class UserTransformerPipe implements PipeTransform {
    private encrytPassword;
    private getInitAccounts;
    private initUser;
    transform(value: any, metadata: ArgumentMetadata): Promise<any>;
}
