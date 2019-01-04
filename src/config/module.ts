import { Module, MulterModule } from '@nestjs/common'
import { GqlConfigService } from './graphqlService'
import { MongooseConfigService } from './mongooseService'
import { MulterConfigService } from './multerService'

@Module({
  providers: [ GqlConfigService, MongooseConfigService, MulterConfigService ],
  exports: [ GqlConfigService, MongooseConfigService, MulterConfigService ]
})

export class ConfigModule {}
