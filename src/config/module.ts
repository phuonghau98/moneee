import { Module } from '@nestjs/common'
import { GqlConfigService } from './graphqlService'
import { MongooseConfigService } from './mongooseService'

@Module({
  providers: [ GqlConfigService, MongooseConfigService ],
  exports: [ GqlConfigService, MongooseConfigService ]
})

export class ConfigModule {}
