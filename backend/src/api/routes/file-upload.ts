import { Router, Request, Response } from 'express';
import middlewares from '../middlewares';
const route = Router();
import path from 'path';
import multer from 'multer';

const upload = multer().array('imgCollection')

export default (app: Router) => {

  app.use('/upload', route);

  route.post('/video', function (req, res, next) {
    // Imports the Google Cloud client library.
    const { Storage } = require('@google-cloud/storage');

    const storage = new Storage({ projectId: 'gcp-project-id', keyFilename: path.join(__dirname, '../creds.json') });

    try {
      async function uploadFile(file, folder) {
        let bucketName = 'bucket-name'
        let bucket = storage.bucket(bucketName)

        let newFileName = folder + '/' + file.originalname;

        let fileUpload = bucket.file(newFileName);
        const blobStream = fileUpload.createWriteStream({
          metadata: {
            contentType: file.mimetype
          }
        });

        blobStream.on('error', (error) => {
          console.log('Something is wrong! Unable to upload at the moment.' + error);
        });

        blobStream.on('finish', () => {
          const url = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`; //image url from firebase server
          console.log(url)

        });

        blobStream.end(file.buffer);
      }

      upload(req, res, function (err) {
        let files = req.files

        for (let file in files) {
          uploadFile(files[file], req.body.folder)
        }

        if (err) {
          return res.end("Error uploading file." + err);
        }
        res.end("File is uploaded");
      })
    } catch (err) {
      res.send(err)
    }
  });
};
