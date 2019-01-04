import { Controller, Get, Post, UploadedFile, UseInterceptors, FileInterceptor } from "@nestjs/common"
import { UploadService } from "./service"
import { join } from 'path'
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }

  @Get()
  hellothere() {
    return 'Hello'
  }

  @Post('photo')
  @UseInterceptors(FileInterceptor('profile_image'))
  uploadPhoto(@UploadedFile() photo) {
    console.log(photo)
  }
}