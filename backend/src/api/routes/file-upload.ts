import Logger from '../../loaders/logger';
import { Router, Request, Response } from 'express';
const route = Router();
import multer from 'multer';
import MulterGoogleCloudStorage from 'multer-google-storage';
import config from '../../config';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';
const fileUpload = require('express-fileupload');


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
  app.use(fileUpload());

  route.post('/video', uploadHandler.any(), async (req: Request, res: Response, next: any) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    const [file] = req.files;

    const { path } = file;
    Logger.info(path);

    try {
      await ffmpeg(path)
        .setFfmpegPath(ffmpegStatic.path)
        .audioChannels(1)
        .audioFrequency(16000)
        .format('flac')
        .output('./yoyoyo')
        .on('progress', (progress) => {
          Logger.info(`[ffmpeg] ${JSON.stringify(progress)}`);
        })
        .on('error', (err) => {
          Logger.info(`[ffmpeg] error: ${err.message}`);
        })
        .on('end', () => {
          Logger.verbose('[ffmpeg] finished');
        })
    } catch (e) {
      Logger.info(e);
    }

    res.json(file);
  });
};
