import { Injectable, BadRequestException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from 'graphql'
import { RecordInterface, UserInterface } from "../../database/interface"

@Injectable()
export class RecordService {
  constructor(
    @InjectModel('Record') private readonly recordModel: Model<RecordInterface>,
    @InjectModel('User') private readonly userModel: Model<UserInterface>
  ){ }

  private async getRecordById (recordId: string) {
    return await this.recordModel.findOne({ _id: recordId })
  }

  private isPermitted (userId, recordId) {
    return userId === recordId
  }

  private getNewDescriptions (currentDescriptions = [], content) {
    const newDescription = {
      content: content,
      date: new Date().toLocaleString()
    }

    return [...currentDescriptions, newDescription]
  }

  private async updateRecordDescrition(recordId, descriptions) {
    return await this.recordModel.findOneAndUpdate({ _id: recordId }, { $set: { description: descriptions} })
  }

  public async modifyAccount(userId: string, amount: number, code: string) {
    const userFound = await this.userModel.findOne({ _id: userId })
    const currentAccount = userFound.accounts
    currentAccount[`${code}`] = currentAccount[`${code}`] - amount
    await this.userModel.findOneAndUpdate({ _id: userId }, { $set: { accounts: currentAccount } })
  }

  public async createRecord (record) {
    const newRecord = new this.recordModel(record)
    await this.modifyAccount(record.belongsTo, record.amount, record.method)
    return await newRecord.save()
  }

  public async getRecord (userId: string) {
    const records = await this.recordModel.find({ belongsTo: userId }).exec()
    return records
  }

  public async removeRecord(recordId: string) {
    return await this.recordModel.findOneAndDelete({ _id: recordId })
  }

  public async modifyDescription(modifyDescriptionPayload) {
    const { recordId, content, curUserId } = modifyDescriptionPayload
    const recordToModify = await this.getRecordById(recordId)

    if (this.isPermitted(curUserId, recordToModify.belongsTo)) {
      await this.updateRecordDescrition(recordId, await this.getNewDescriptions(recordToModify.description, content))
    }
    else throw new BadRequestException('Great try! But not enough')
  }
}