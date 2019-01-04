import { Controller, FileInterceptor, Post, UseInterceptors, UploadedFile, UseGuards } from "@nestjs/common"
import { UploadService } from "./service"
import { UploadGuard } from "../../common/guards/auth/uploadGuard"

@Controller('upload')
@UseGuards(UploadGuard)
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }

  @Post('profile_image')
  @UseInterceptors(FileInterceptor('profile_image'))
  uploadProfileImage (@UploadedFile() profileImage) {
  }
}