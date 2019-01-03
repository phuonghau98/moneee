"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const module_1 = require("./config/module");
const graphql_1 = require("@nestjs/graphql");
const graphqlService_1 = require("./config/graphqlService");
const module_2 = require("./record/module");
const module_3 = require("./user/module");
const module_4 = require("./account/module");
const mongoose_1 = require("@nestjs/mongoose");
const mongooseService_1 = require("./config/mongooseService");
const module_5 = require("./common/guards/auth/module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            module_1.ConfigModule,
            graphql_1.GraphQLModule.forRootAsync({
                imports: [module_1.ConfigModule],
                useExisting: graphqlService_1.GqlConfigService
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [module_1.ConfigModule],
                useExisting: mongooseService_1.MongooseConfigService
            }),
            module_2.RecordModule,
            module_3.UserModule,
            module_4.AccountModule,
            module_5.AuthModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map