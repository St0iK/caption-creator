import Logger from '../../loaders/logger';
import { Router, Request, Response } from 'express';
const route = Router();
import multer from 'multer';
import MulterGoogleCloudStorage from 'multer-google-storage';
import config from '../../config';

const uploadHandler = multer({
  storage: new MulterGoogleCloudStorage({
    email: config.googleCloudStorage.email,
    keyFilename: config.googleCloudStorage.videoUpload.keyFilename,
    projectId: config.googleCloudStorage.videoUpload.projectId,
    bucket: config.googleCloudStorage.videoUpload.bucket,
  })
});

export default (app: Router) => {

  app.use('/upload', route);

  route.post('/video', uploadHandler.any(), function (req: Request, res: Response, next: any) {
    Logger.info(req.files);
    res.json(req.files);
  });
};
