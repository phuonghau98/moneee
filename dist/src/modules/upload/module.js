"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const controller_1 = require("./controller");
const service_1 = require("./service");
const module_1 = require("dist/src/config/module");
const multerService_1 = require("../../config/multerService");
let UploadModule = class UploadModule {
};
UploadModule = __decorate([
    common_1.Module({
        imports: [
            common_1.MulterModule.registerAsync({
                imports: [module_1.ConfigModule],
                useExisting: multerService_1.MulterConfigService
            })
        ],
        controllers: [controller_1.UploadController],
        providers: [service_1.UploadService]
    })
], UploadModule);
exports.UploadModule = UploadModule;
//# sourceMappingURL=module.js.map