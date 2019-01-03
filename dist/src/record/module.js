"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const schema_1 = require("../database/schema");
const mongoose_1 = require("@nestjs/mongoose");
const resolver_1 = require("./resolver");
const service_1 = require("./service");
const pubSubProvider_1 = require("../config/pubSubProvider");
const module_1 = require("../common/guards/auth/module");
let RecordModule = class RecordModule {
};
RecordModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Record', schema: schema_1.RecordSchema }, { name: 'User', schema: schema_1.UserSchema }]),
            module_1.AuthModule
        ],
        providers: [
            resolver_1.RecordResolver, service_1.RecordService, pubSubProvider_1.pubSubProvider
        ]
    })
], RecordModule);
exports.RecordModule = RecordModule;
//# sourceMappingURL=module.js.map