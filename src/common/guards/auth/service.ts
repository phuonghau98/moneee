import { Injectable, UnauthorizedException } from "@nestjs/common"
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { SECRET_CODE } from "../../../constants/env"
const jwt = require('jsonwebtoken')

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly userModel: Model) { }

  async validateToken(authorizationHeader, userId) {
    if(authorizationHeader === undefined) return false
    const token = authorizationHeader.split(' ')[1]
    const decoded = jwt.verify(token, SECRET_CODE);
    const user = await this.userModel.findOne({ _id: decoded.userId })
    if(userId === decoded.userId && user.id === decoded.userId) return true
    throw new UnauthorizedException('Something went wrong!')
  }

}