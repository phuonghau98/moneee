import { Injectable } from "@nestjs/common"
import { MongooseOptionsFactory, MongooseModuleOptions } from "@nestjs/mongoose"
import { MONGO_URI } from "../constants/config"

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  createMongooseOptions() : MongooseModuleOptions {
    return {
      uri: MONGO_URI
    }
  }
}