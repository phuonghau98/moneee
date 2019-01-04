import { Middleware, NestMiddleware } from '@nestjs/common'
import * as multer from 'multer'

@Middleware()
export class MulterMiddleware implements NestMiddleware {
  resolve() {
    const storage = multer.diskStorage({
      destination (req, file, cb) {
        cb(null, './public/images');
      },
      filename (req, file, cb) {
        cb(null, file.originalname);
      },
    })

    const fileFilter = (req, file, cb) => {
      let extension = (file.originalname.split('.').pop())
      //Put here your custom validation for file extensións.
      // To accept the file pass `true`, like so:
      cb(null, true)
      // To reject this file pass `false` or throw Exception, like so:
      //cb(new HttpException ("File format is not valid", HttpStatus.BAD_REQUEST), false)
    }

    return multer({
      storage: storage,
      limits: {
        fileSize: 2097152//2 Megabytes
      },
      fileFilter: fileFilter
    })
  }
}