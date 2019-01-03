import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema } from '../../database/schema'
import { AccountResolver } from './resolver'
import { AccountService } from './service'
import { AuthModule } from '../../common/guards/auth/module'
import { TokenGuard } from '../../common/guards/auth/guard'
import { pubSubProvider } from '../../config/pubSubProvider'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    AuthModule
  ],
  providers: [ AccountResolver, AccountService, TokenGuard, pubSubProvider ]
})
export class AccountModule {}
