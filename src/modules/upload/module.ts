import { Module, MulterModule } from '@nestjs/common'
import { UploadController } from './controller'
import { UploadService } from './service'
import { ConfigModule } from 'dist/src/config/module'
import { MulterConfigService } from '../../config/multerService'

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ ConfigModule ],
      useExisting: MulterConfigService
    })
  ],
  controllers: [ UploadController ],
  providers: [ UploadService ]
})
export class UploadModule { }