"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
const common_1 = require("@nestjs/common");
const resolverArguments_1 = require("../../../constants/resolverArguments");
const bcrypt = require('bcrypt');
let UserTransformerPipe = class UserTransformerPipe {
    encrytPassword(pwd) {
        return __awaiter(this, void 0, void 0, function* () {
            const cryptSalt = yield bcrypt.genSalt(6);
            return yield bcrypt.hash(pwd, cryptSalt);
        });
    }
    getInitAccounts() {
        return {
            bank: 0,
            cc: 0,
            cash: 0
        };
    }
    initUser(user, ...propertyOptions) {
        let initializedUser = user;
        propertyOptions.forEach(opt => {
            initializedUser = Object.assign(initializedUser, opt);
        });
        return initializedUser;
    }
    transform(value, metadata) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = value;
            switch (metadata.data) {
                case resolverArguments_1.CREATE_USER:
                    return yield this.initUser(user, { accounts: this.getInitAccounts() }, { pwd: yield this.encrytPassword(user.pwd) });
                case resolverArguments_1.CHANGE_PWD:
                    return yield this.initUser(user, { newPwd: yield this.encrytPassword(user.newPwd) });
                default:
                    return user;
            }
        });
    }
};
UserTransformerPipe = __decorate([
    common_1.Injectable()
], UserTransformerPipe);
exports.UserTransformerPipe = UserTransformerPipe;
//# sourceMappingURL=user.js.map