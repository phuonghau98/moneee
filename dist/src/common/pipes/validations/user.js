"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const resolverArguments_1 = require("../../../constants/resolverArguments");
let UserValidationPipe = class UserValidationPipe {
    isPasswordValid(pwd) {
        const validPwdRegEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
        return validPwdRegEx.test(pwd);
    }
    isUsernameValid(usn) {
        const validUsnRegEx = /^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/;
        return validUsnRegEx.test(usn);
    }
    isNameValid(name) {
        const validNameRegEx = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
        return validNameRegEx.test(name);
    }
    transform(value, metadata) {
        const user = value;
        switch (metadata.data) {
            case resolverArguments_1.CREATE_USER:
                if (this.isUsernameValid(user.usn) && this.isNameValid(user.name) && this.isPasswordValid(user.pwd))
                    return user;
                throw new common_1.BadRequestException('Register info is invalid');
            case resolverArguments_1.CHANGE_PWD:
                if (this.isPasswordValid(user.newPwd))
                    return user;
                throw new common_1.BadRequestException('Password is not valid');
            default:
                return user;
        }
    }
};
UserValidationPipe = __decorate([
    common_1.Injectable()
], UserValidationPipe);
exports.UserValidationPipe = UserValidationPipe;
//# sourceMappingURL=user.js.map