export class CheckBigFileDto {
    fileName: string;
    fileMd5: string;
    fileSize: number;
    chunkSize: number;
    // urlComponentsBuilder: string;
}