import { Controller, Get, Post, UploadedFile, UseInterceptors, FileInterceptor } from "@nestjs/common"
import { UploadService } from "./service"

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }

  @Get()
  hellothere() {
    return 'Hello'
  }

  @Post('photo')
  @UseInterceptors(FileInterceptor('file'))
  uploadPhoto(@UploadedFile() photo) {
    console.log('Hello there')
  }
}