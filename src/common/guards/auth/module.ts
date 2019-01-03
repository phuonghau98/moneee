import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { UserSchema } from "../../../database/schema"
import { TokenGuard } from "./guard"
import { AuthService } from "./service"

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
  ],
  providers: [ TokenGuard, AuthService ],
  exports: [ TokenGuard, AuthService ]
})
export class AuthModule { }
