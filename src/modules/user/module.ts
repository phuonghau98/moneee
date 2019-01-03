import { Module } from '@nestjs/common'
import { UserResolver } from './resolver'
import { UserService } from './service'
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema } from '../../database/schema'
import { AuthModule } from '../../common/guards/auth/module'

@Module({
  imports: [ 
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    AuthModule
   ],
  providers: [ UserResolver, UserService ]
})
export class UserModule { }
