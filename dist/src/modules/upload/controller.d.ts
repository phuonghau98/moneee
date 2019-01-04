import { UploadService } from "./service";
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    hellothere(): string;
    uploadPhoto(photo: any): void;
}
