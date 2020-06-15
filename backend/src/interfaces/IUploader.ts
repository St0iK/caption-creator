interface IUploader {
  uploadFile(filePath: string): Promise<boolean>;
}