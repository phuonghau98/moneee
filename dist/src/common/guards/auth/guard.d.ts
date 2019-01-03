import { CanActivate, ExecutionContext } from "@nestjs/common";
import { AuthService } from "./service";
export declare class TokenGuard implements CanActivate {
    private readonly authService;
    constructor(authService: AuthService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
