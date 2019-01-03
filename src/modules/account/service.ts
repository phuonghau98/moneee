import { Injectable } from "@nestjs/common"
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class AccountService {
  constructor(
    @InjectModel('User') private readonly userModel: Model
  ) { }

  private async getUserById (userId) {
    return await this.userModel.findOne({ _id: userId }).exec()
  }

  public async getAccounts (userId: string) {
    const userFound = await this.getUserById(userId)
    return await userFound.accounts
  }

  public async modifyAccounts (payload) {
    const userFound = await this.getUserById(payload.userId)
    const currentAccounts = userFound.accounts
    if(payload.isIncrease) {
      currentAccounts[`${payload.code}`] = currentAccounts[`${payload.code}`] + payload.amount 
    } else {
      currentAccounts[`${payload.code}`] = currentAccounts[`${payload.code}`] - payload.amount
    }
    const modifiedAccount = await this.userModel.findOneAndUpdate({ _id: payload.userId}, { $set: { accounts: currentAccounts } }, { new: true })
    return modifiedAccount
  }
}