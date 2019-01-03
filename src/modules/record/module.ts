import { Module } from '@nestjs/common'
import { RecordSchema, UserSchema } from '../../database/schema'
import { MongooseModule } from '@nestjs/mongoose'
import { RecordResolver } from './resolver'
import { RecordService } from './service'
import { pubSubProvider } from '../../config/pubSubProvider'
import { AuthModule } from '../../common/guards/auth/module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Record', schema: RecordSchema }, { name: 'User', schema: UserSchema }]),
    AuthModule
  ],
  providers: [
    RecordResolver, RecordService, pubSubProvider
  ]
})
export class RecordModule {}
