class GCPUploader implements IUploader {
  bucketName: string;
  storage: any;

  constructor(bucketName: string, storage: any) {
    this.bucketName = bucketName;
    // Move me ! 
    this.storage = storage;
  }

  async uploadFile(filePath: string): Promise<any> {
    // Uploads a local file to the bucket
    return await this.storage.bucket(this.bucketName).upload(filePath, {
      // Support for HTTP requests made with `Accept-Encoding: gzip`
      gzip: true,
      // By setting the option `destination`, you can change the name of the
      // object you are uploading to a bucket.
      metadata: {
        // Enable long-lived HTTP caching headers
        // Use only if the contents of the file will never change
        // (If the contents will change, use cacheControl: 'no-cache')
        cacheControl: 'public, max-age=31536000',
      },
    });
  }
}

export { GCPUploader };