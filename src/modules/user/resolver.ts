import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { UserService } from './service'
import { CreateUserInfoDTO, LoginInfoDTO, ChangePwdInfoDTO } from '../../graphql.schema'
import { UsePipes, UseGuards } from '@nestjs/common'
import { CREATE_USER, CHANGE_PWD } from '../../constants/resolverArguments'
import { UserValidationPipe } from '../../common/pipes/validations/user'
import { UserTransformerPipe } from '../../common/pipes/transfomers/user'
import { LOGIN } from '../../constants/resolverArguments'
import { TokenGuard } from '../../common/guards/auth/guard'

@Resolver('User')
@UsePipes(UserTransformerPipe)
@UsePipes(UserValidationPipe)
export class UserResolver {
  constructor (
    private readonly userService: UserService
  ) { }
  
  @Query()
  async login (@Args(LOGIN) loginInfo: LoginInfoDTO) {
    return await this.userService.login(loginInfo)
  }
  
  @Mutation()
  async createUser (@Args(CREATE_USER) createUserInfo: CreateUserInfoDTO) {
    return await this.userService.createUser(createUserInfo)
  }

  @Mutation()
  @UseGuards(TokenGuard)
  async updatePassword (@Args(CHANGE_PWD) changePwdInfo: ChangePwdInfoDTO) {
    return await this.userService.updatePassword(changePwdInfo)
  }
}
