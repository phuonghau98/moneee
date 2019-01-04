import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common"
import { AuthService } from "./service"
import { GqlExecutionContext } from "@nestjs/graphql"

@Injectable()
export class UploadGuard implements CanActivate {
  constructor(private readonly authService: AuthService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest()
    const authorizationHeader = req.headers.authorization
    const userId = req.headers.userId
    return this.authService.validateToken(authorizationHeader, userId)
  }
}