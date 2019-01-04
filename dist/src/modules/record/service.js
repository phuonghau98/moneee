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
var _a, _b;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const graphql_1 = require("graphql");
let RecordService = class RecordService {
    constructor(recordModel, userModel) {
        this.recordModel = recordModel;
        this.userModel = userModel;
    }
    getRecordById(recordId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.recordModel.findOne({ _id: recordId });
        });
    }
    isPermitted(userId, recordId) {
        return userId === recordId;
    }
    getNewDescriptions(currentDescriptions = [], content) {
        const newDescription = {
            content: content,
            date: new Date().toLocaleString()
        };
        return [...currentDescriptions, newDescription];
    }
    updateRecordDescrition(recordId, descriptions) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.recordModel.findOneAndUpdate({ _id: recordId }, { $set: { description: descriptions } });
        });
    }
    modifyAccount(userId, amount, code) {
        return __awaiter(this, void 0, void 0, function* () {
            const userFound = yield this.userModel.findOne({ _id: userId });
            const currentAccount = userFound.accounts;
            currentAccount[`${code}`] = currentAccount[`${code}`] - amount;
            yield this.userModel.findOneAndUpdate({ _id: userId }, { $set: { accounts: currentAccount } });
        });
    }
    createRecord(record) {
        return __awaiter(this, void 0, void 0, function* () {
            const newRecord = new this.recordModel(record);
            yield this.modifyAccount(record.belongsTo, record.amount, record.method);
            return yield newRecord.save();
        });
    }
    getRecord(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const records = yield this.recordModel.find({ belongsTo: userId }).exec();
            return records;
        });
    }
    removeRecord(recordId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.recordModel.findOneAndDelete({ _id: recordId });
        });
    }
    modifyDescription(modifyDescriptionPayload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { recordId, content, curUserId } = modifyDescriptionPayload;
            const recordToModify = yield this.getRecordById(recordId);
            if (this.isPermitted(curUserId, recordToModify.belongsTo)) {
                yield this.updateRecordDescrition(recordId, yield this.getNewDescriptions(recordToModify.description, content));
            }
            else
                throw new common_1.BadRequestException('Great try! But not enough');
        });
    }
};
RecordService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Record')),
    __param(1, mongoose_1.InjectModel('User')),
    __metadata("design:paramtypes", [typeof (_a = typeof graphql_1.Model !== "undefined" && graphql_1.Model) === "function" ? _a : Object, typeof (_b = typeof graphql_1.Model !== "undefined" && graphql_1.Model) === "function" ? _b : Object])
], RecordService);
exports.RecordService = RecordService;
//# sourceMappingURL=service.js.map