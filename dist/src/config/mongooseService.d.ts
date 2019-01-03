import { MongooseOptionsFactory, MongooseModuleOptions } from "@nestjs/mongoose";
export declare class MongooseConfigService implements MongooseOptionsFactory {
    createMongooseOptions(): MongooseModuleOptions;
}
