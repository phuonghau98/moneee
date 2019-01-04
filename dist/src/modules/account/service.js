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
var _a;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let AccountService = class AccountService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userModel.findOne({ _id: userId }).exec();
        });
    }
    getAccounts(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userFound = yield this.getUserById(userId);
            return yield userFound.accounts;
        });
    }
    modifyAccounts(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const userFound = yield this.getUserById(payload.userId);
            const currentAccounts = userFound.accounts;
            if (payload.isIncrease) {
                currentAccounts[`${payload.code}`] = currentAccounts[`${payload.code}`] + payload.amount;
            }
            else {
                currentAccounts[`${payload.code}`] = currentAccounts[`${payload.code}`] - payload.amount;
            }
            const modifiedAccount = yield this.userModel.findOneAndUpdate({ _id: payload.userId }, { $set: { accounts: currentAccounts } }, { new: true });
            return modifiedAccount;
        });
    }
};
AccountService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('User')),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], AccountService);
exports.AccountService = AccountService;
//# sourceMappingURL=service.js.map