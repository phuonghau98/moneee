import { Injectable, UnauthorizedException, ForbiddenException, NotAcceptableException } from '@nestjs/common'
import { CreateUserInfoDTO, LoginInfoDTO } from '../../graphql.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { SECRET_CODE, TOKEN_EXPIRED_IN } from '../../constants/env'
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model) { }
  
  private async findUserByUsn (usn: string) {
    return await this.userModel.findOne({ usn: usn }).exec()
  }

  private async findUserById (id: string) {
    return await this.userModel.findOne(({ _id: id})).exec()
  }

  private async isPwdMatched(rawPwd: string, encryptedPwd: string) {
    return await bcrypt.compare(rawPwd, encryptedPwd)
  }

  private async updatePwd (userId: string, newPwd: string) {
    await this.userModel.findOneAndUpdate({ _id: userId }, { $set: { pwd: newPwd } })
  }

  private async generateToken (user) {
      return await jwt.sign({
        userId: user.id,
        userUsn: user.usn
      },
        SECRET_CODE,
      {
        expiresIn: TOKEN_EXPIRED_IN
      })
  }

  public async createUser (createUserInfo: CreateUserInfoDTO) {
    const isUsnFound = await this.findUserByUsn(createUserInfo.usn)

    if (!isUsnFound) {
      const userToCreate = new this.userModel(createUserInfo)
      return await userToCreate.save()
    } else throw new NotAcceptableException('Username had been taken already')
  }

  public async login (loginInfo: LoginInfoDTO) {
    const { usn, pwd } = loginInfo
    const userFound = await this.findUserByUsn(usn)

    if(userFound !== null && await this.isPwdMatched(pwd, userFound.pwd)) {
      return await { token: await this.generateToken(userFound), id: userFound.id }
    }
    else throw new UnauthorizedException('User doesn\'t exist')
  }

  public async updatePassword (changePwdInfo) {
    const { userId, oldPwd, newPwd } = changePwdInfo
    const userFound = await this.findUserById(userId)

    console.log(await this.isPwdMatched(oldPwd, userFound.pwd))
    if (await this.isPwdMatched(oldPwd, userFound.pwd)) await this.updatePwd(userId, newPwd)
    else throw new ForbiddenException('Your old password is invalid')

    return await {
      status: true
    }
  }
}
