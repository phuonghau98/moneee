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
const resolverArguments_1 = require("../constants/resolverArguments");
const common_1 = require("@nestjs/common");
const record_1 = require("../common/pipes/transfomers/record");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const guard_1 = require("../common/guards/auth/guard");
let RecordResolver = class RecordResolver {
    constructor(recordService, pubSub) {
        this.recordService = recordService;
        this.pubSub = pubSub;
    }
    getRecord(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.recordService.getRecord(userId);
        });
    }
    createRecord(record) {
        return __awaiter(this, void 0, void 0, function* () {
            const recordCreated = yield this.recordService.createRecord(record);
            this.pubSub.publish('recordCreated', { recordCreated: recordCreated });
            return recordCreated;
        });
    }
    deleteRecord(recordId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.recordService.removeRecord(recordId);
        });
    }
    recordCreated(userId) {
        return {
            subscribe: graphql_subscriptions_1.withFilter(() => this.pubSub.asyncIterator('recordCreated'), (payload, variables) => {
                return payload.recordCreated.belongsTo === variables.userId;
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
], RecordResolver.prototype, "getRecord", null);
__decorate([
    graphql_1.Mutation(),
    __param(0, graphql_1.Args(resolverArguments_1.CREATE_RECORD)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RecordResolver.prototype, "createRecord", null);
__decorate([
    graphql_1.Mutation(),
    __param(0, graphql_1.Args(resolverArguments_1.DELETE_RECORD)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecordResolver.prototype, "deleteRecord", null);
__decorate([
    graphql_1.Subscription(),
    __param(0, graphql_1.Args('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RecordResolver.prototype, "recordCreated", null);
RecordResolver = __decorate([
    graphql_1.Resolver(),
    common_1.UseGuards(guard_1.TokenGuard),
    common_1.UsePipes(record_1.RecordTransformerPipe),
    __param(1, common_1.Inject('Pubsub')),
    __metadata("design:paramtypes", [service_1.RecordService,
        graphql_subscriptions_1.PubSub])
], RecordResolver);
exports.RecordResolver = RecordResolver;
//# sourceMappingURL=resolver.js.map