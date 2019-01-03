import { Module } from '@nestjs/common'
import { ConfigModule } from './config/module'
import { GraphQLModule } from '@nestjs/graphql'
import { GqlConfigService } from './config/graphqlService'
import { RecordModule } from './modules/record/module'
import { UserModule } from './modules/user/module'
import { AccountModule } from './modules/account/module'
import { MongooseModule } from '@nestjs/mongoose'
import { MongooseConfigService } from './config/mongooseService'
import { AuthModule } from './common/guards/auth/module'
import { UploadModule } from './modules/upload/module'

@Module({
  imports: [ 
    ConfigModule,
    GraphQLModule.forRootAsync({
      imports: [ ConfigModule ],
      useExisting: GqlConfigService
    }),
    MongooseModule.forRootAsync({
      imports: [ ConfigModule ],
      useExisting: MongooseConfigService
    }),
    RecordModule,
    UserModule,
    AccountModule,
    AuthModule,
    UploadModule
   ]
})
export class AppModule {}
