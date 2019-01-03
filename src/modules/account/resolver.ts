import { Resolver, Query, Args, Mutation, Subscription } from "@nestjs/graphql"
import { AccountService } from "./service"
import { UseGuards, Inject } from "@nestjs/common"
import { TokenGuard } from "../../common/guards/auth/guard"
import { withFilter, PubSub } from 'graphql-subscriptions'

@Resolver()
@UseGuards(TokenGuard)
export class AccountResolver {
  constructor(
    private readonly accountService: AccountService,
    @Inject('Pubsub') private readonly pubSub: PubSub
  ) { }
  
  @Query()
  async getAccounts (@Args('userId') userId: string) {
    return await this.accountService.getAccounts(userId)
  }
  
  @Mutation()
  async modifyAccounts(@Args('modifyPayload') modifyPayload){
    const accountModified = await this.accountService.modifyAccounts(modifyPayload)
    this.pubSub.publish('accountsChanged', { userId: accountModified.id, accountsChanged: accountModified.accounts })
    return accountModified.accounts
  }

  @Subscription()
  accountsChanged () {
    return {
      subscribe: withFilter(() => this.pubSub.asyncIterator('accountsChanged'), (payload, variables) => {
        return payload.userId === variables.userId
      })
    }
  }
}