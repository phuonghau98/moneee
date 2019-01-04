import { Module, MulterModule, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common'
import { UploadController } from './controller'
import { UploadService } from './service'
import { ConfigModule } from 'dist/src/config/module'
import { MulterConfigService } from '../../config/multerService'
import { AuthModule } from '../../common/guards/auth/module'

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ ConfigModule ],
      useExisting: MulterConfigService
    }),
    AuthModule
  ],
  controllers: [ UploadController ],
  providers: [ UploadService ]
})
export class UploadModule { }