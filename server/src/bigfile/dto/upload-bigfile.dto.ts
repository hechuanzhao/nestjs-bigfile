export class UploadBigFileDto {
    chunk: number;
    fileMd5: string;
    chunkMd5: string;
    MultiPartFile: File;     
}