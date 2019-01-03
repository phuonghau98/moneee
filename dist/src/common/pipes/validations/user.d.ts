import { PipeTransform, ArgumentMetadata } from "@nestjs/common";
export declare class UserValidationPipe implements PipeTransform {
    private isPasswordValid;
    private isUsernameValid;
    private isNameValid;
    transform(value: any, metadata: ArgumentMetadata): any;
}
