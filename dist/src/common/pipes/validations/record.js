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
let RecordValidationPipe = class RecordValidationPipe {
    transform(value, metadata) {
        const record = value;
        switch (metadata.data) {
            case resolverArguments_1.MODIFY_RECORD_DESCRIPTION:
                const { content, curUserId, recordId } = value;
                if (content.length === 0)
                    throw new common_1.NotAcceptableException('There is nothing to update');
                break;
            default:
                return record;
        }
    }
};
RecordValidationPipe = __decorate([
    common_1.Injectable()
], RecordValidationPipe);
exports.RecordValidationPipe = RecordValidationPipe;
//# sourceMappingURL=record.js.map