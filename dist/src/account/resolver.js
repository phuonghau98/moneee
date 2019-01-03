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
const common_1 = require("@nestjs/common");
const graphql_subscriptions_1 = require("graphql-subscriptions");
let AccountResolver = class AccountResolver {
    constructor(accountService, pubSub) {
        this.accountService = accountService;
        this.pubSub = pubSub;
    }
    getAccounts(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.accountService.getAccounts(userId);
        });
    }
    modifyAccounts(modifyPayload) {
        return __awaiter(this, void 0, void 0, function* () {
            const accountModified = yield this.accountService.modifyAccounts(modifyPayload);
            this.pubSub.publish('accountsChanged', { userId: accountModified.id, accountsChanged: accountModified.accounts });
            return accountModified.accounts;
        });
    }
    accountsChanged() {
        return {
            subscribe: graphql_subscriptions_1.withFilter(() => this.pubSub.asyncIterator('accountsChanged'), (payload, variables) => {
                return payload.userId === variables.userId;
            })
        };
    }
};
__decorate([
    graphql_1.Query(),
    __param(0, graphql_1.Args('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AccountResolver.prototype, "getAccounts", null);
__decorate([
    graphql_1.Mutation(),
    __param(0, graphql_1.Args('modifyPayload')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccountResolver.prototype, "modifyAccounts", null);
__decorate([
    graphql_1.Subscription(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AccountResolver.prototype, "accountsChanged", null);
AccountResolver = __decorate([
    graphql_1.Resolver(),
    __param(1, common_1.Inject('Pubsub')),
    __metadata("design:paramtypes", [service_1.AccountService,
        graphql_subscriptions_1.PubSub])
], AccountResolver);
exports.AccountResolver = AccountResolver;
//# sourceMappingURL=resolver.js.map