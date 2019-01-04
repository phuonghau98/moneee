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
const env_1 = require("../../constants/env");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    findUserByUsn(usn) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userModel.findOne({ usn: usn }).exec();
        });
    }
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userModel.findOne(({ _id: id })).exec();
        });
    }
    isPwdMatched(rawPwd, encryptedPwd) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt.compare(rawPwd, encryptedPwd);
        });
    }
    updatePwd(userId, newPwd) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userModel.findOneAndUpdate({ _id: userId }, { $set: { pwd: newPwd } });
        });
    }
    generateToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield jwt.sign({
                userId: user.id,
                userUsn: user.usn
            }, env_1.SECRET_CODE, {
                expiresIn: env_1.TOKEN_EXPIRED_IN
            });
        });
    }
    createUser(createUserInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const isUsnFound = yield this.findUserByUsn(createUserInfo.usn);
            if (!isUsnFound) {
                const userToCreate = new this.userModel(createUserInfo);
                return yield userToCreate.save();
            }
            else
                throw new common_1.NotAcceptableException('Username had been taken already');
        });
    }
    login(loginInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const { usn, pwd } = loginInfo;
            const userFound = yield this.findUserByUsn(usn);
            if (userFound !== null && (yield this.isPwdMatched(pwd, userFound.pwd))) {
                return yield { token: yield this.generateToken(userFound), id: userFound.id };
            }
            else
                throw new common_1.UnauthorizedException('User doesn\'t exist');
        });
    }
    updatePassword(changePwdInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, oldPwd, newPwd } = changePwdInfo;
            const userFound = yield this.findUserById(userId);
            console.log(yield this.isPwdMatched(oldPwd, userFound.pwd));
            if (yield this.isPwdMatched(oldPwd, userFound.pwd))
                yield this.updatePwd(userId, newPwd);
            else
                throw new common_1.ForbiddenException('Your old password is invalid');
            return yield {
                status: true
            };
        });
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('User')),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=service.js.map