import { Injectable, MulterOptionsFactory, MulterModuleOptions } from "@nestjs/common"
import { join } from "path"
import * as multer from 'multer'

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
      storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, join(__dirname, '../uploads/')),
        filename: (req, file, cb) => {
          cb(null, new Date().toISOString() + '\'s photo')
        }
      }),
      limits: {
        fileSize: 1024 * 1024 * 1024
      }
    }
  }
}