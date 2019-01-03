"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const schema_1 = require("../database/schema");
const resolver_1 = require("./resolver");
const service_1 = require("./service");
const module_1 = require("../common/guards/auth/module");
const guard_1 = require("../common/guards/auth/guard");
const pubSubProvider_1 = require("../config/pubSubProvider");
let AccountModule = class AccountModule {
};
AccountModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'User', schema: schema_1.UserSchema }]),
            module_1.AuthModule
        ],
        providers: [resolver_1.AccountResolver, service_1.AccountService, guard_1.TokenGuard, pubSubProvider_1.pubSubProvider]
    })
], AccountModule);
exports.AccountModule = AccountModule;
//# sourceMappingURL=module.js.map