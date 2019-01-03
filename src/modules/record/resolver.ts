import { Resolver, Mutation, Args, Query, Subscription } from "@nestjs/graphql"
import { RecordService } from "./service"
import { CREATE_RECORD, DELETE_RECORD, MODIFY_RECORD_DESCRIPTION } from "../../constants/resolverArguments"
import { UsePipes, Inject } from "@nestjs/common"
import { RecordTransformerPipe } from "../../common/pipes/transfomers/record"
import { withFilter, PubSub } from "graphql-subscriptions"
import { RecordValidationPipe } from "../../common/pipes/validations/record"

@Resolver()
@UsePipes(RecordTransformerPipe)
@UsePipes(RecordValidationPipe)
export class RecordResolver {
  constructor(
    private readonly recordService: RecordService,
    @Inject('Pubsub') private readonly pubSub: PubSub
  ){ }

  @Query()
  async getRecord (@Args('userId') userId: string) {
    return await this.recordService.getRecord(userId)
  }

  @Mutation()
  async createRecord(@Args(CREATE_RECORD) record) {
    const recordCreated = await this.recordService.createRecord(record)
    this.pubSub.publish('recordCreated', { recordCreated: recordCreated })
    return recordCreated
  }

  @Mutation()
  async deleteRecord(@Args(DELETE_RECORD) recordId: string) {
    return await this.recordService.removeRecord(recordId)
  }

  @Mutation()
  async modifyDescription (@Args(MODIFY_RECORD_DESCRIPTION) modifyDescriptionPayload) {
    return await this.recordService.modifyDescription(modifyDescriptionPayload)
  }

  @Subscription()
  recordCreated (@Args('userId') userId) {
    return {
      subscribe: withFilter(() => this.pubSub.asyncIterator('recordCreated'), (payload, variables) => {
        return payload.recordCreated.belongsTo === variables.userId
      })
    }
  }
}