import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { CREATE_USER, LOGIN, CHANGE_PWD } from "../../../constants/resolverArguments";
const bcrypt = require('bcrypt')

@Injectable()
export class UserTransformerPipe implements PipeTransform {
  private async encrytPassword (pwd) {
    const cryptSalt = await bcrypt.genSalt(6)
    return await bcrypt.hash(pwd, cryptSalt)
  }

  private getInitAccounts () {
    return {
        bank: 0,
        cc: 0,
        cash: 0
      }
  }

  private initUser (user, ...propertyOptions) {
    let initializedUser = user
    propertyOptions.forEach(opt => {
      initializedUser = Object.assign(initializedUser, opt)
    })
    return initializedUser
  }

  async transform (value: any, metadata: ArgumentMetadata) {
    const user = value
    switch (metadata.data) {
      case CREATE_USER:
        return await this.initUser(user, { accounts: this.getInitAccounts() }, { pwd: await this.encrytPassword(user.pwd) })
      case CHANGE_PWD:
        return await this.initUser(user, { newPwd: await this.encrytPassword(user.newPwd) })
      default:
        return user
    }
  }
}