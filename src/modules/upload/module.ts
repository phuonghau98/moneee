import { Module, MulterModule, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common'
import { UploadController } from './controller'
import { UploadService } from './service'
import { ConfigModule } from 'dist/src/config/module'
import { MulterConfigService } from '../../config/multerService'
import { MulterMiddleware } from '../../common/middlewares/multer'

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
export class UploadModule implements NestModule{ 
  configure( consumer: MiddlewareConsumer) {
    consumer
      .apply(MulterMiddleware)
      .with([{ name: 'profile_image' }])
      .forRoutes(
        { path: '/profileImage', method: RequestMethod.POST }
      )
  }
}