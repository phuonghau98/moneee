import { Injectable, MulterOptionsFactory, MulterModuleOptions } from "@nestjs/common"
import { join } from "path"

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
      dest: join(__dirname, '../../uploads/')
    }
  }
}