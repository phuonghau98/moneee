import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { UserSchema } from "../../../database/schema"
import { TokenGuard } from "./guard"
import { AuthService } from "./service"
import { UploadGuard } from "./uploadGuard"

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
  ],
  providers: [ TokenGuard, AuthService, UploadGuard ],
  exports: [ TokenGuard, AuthService, UploadGuard ]
})
export class AuthModule { }
