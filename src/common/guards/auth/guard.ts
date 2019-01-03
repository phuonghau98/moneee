import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common"
import { AuthService } from "./service"
import { GqlExecutionContext } from "@nestjs/graphql"

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private readonly authService: AuthService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context)
    const req = await ctx.getContext().req
    const authorizationHeader = await req.headers.authorization
    const useridHeader = await req.headers.userid
    return await this.authService.validateToken(authorizationHeader, useridHeader)
  }
}