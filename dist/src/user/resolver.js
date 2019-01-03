"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("@nestjs/graphql");
const service_1 = require("./service");
const graphql_schema_1 = require("../graphql.schema");
const common_1 = require("@nestjs/common");
const resolverArguments_1 = require("../constants/resolverArguments");
const user_1 = require("../common/pipes/validations/user");
const user_2 = require("../common/pipes/transfomers/user");
const resolverArguments_2 = require("../constants/resolverArguments");
let UserResolver = class UserResolver {
    constructor(userService) {
        this.userService = userService;
    }
    login(loginInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userService.login(loginInfo);
        });
    }
    createUser(createUserInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userService.createUser(createUserInfo);
        });
    }
};
__decorate([
    graphql_1.Query(),
    __param(0, graphql_1.Args(resolverArguments_2.LOGIN)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graphql_schema_1.LoginInfoDTO]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    graphql_1.Mutation(),
    __param(0, graphql_1.Args(resolverArguments_1.CREATE_USER)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graphql_schema_1.CreateUserInfoDTO]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
UserResolver = __decorate([
    graphql_1.Resolver('User'),
    common_1.UsePipes(user_2.UserTransformerPipe),
    common_1.UsePipes(user_1.UserValidationPipe),
    __metadata("design:paramtypes", [service_1.UserService])
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=resolver.js.map