import { Controller, FileInterceptor, Post, UseInterceptors, UploadedFile } from "@nestjs/common"
import { UploadService } from "./service"

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }

  @Post('profile_image')
  @UseInterceptors(FileInterceptor('profile_image'))
  uploadProfileImage (@UploadedFile() profileImage) {
    console.log(profileImage)
  }
}