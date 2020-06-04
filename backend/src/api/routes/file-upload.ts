import Logger from '../../loaders/logger';
import { Router, Request, Response } from 'express';
const route = Router();
import multer from 'multer';
import MulterGoogleCloudStorage from 'multer-google-storage';
import config from '../../config';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';


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

  route.post('/video', uploadHandler.any(), async (req: Request, res: Response, next: any) => {
    Logger.info(req.files);
    const { path } = JSON.parse(req.files);
    Logger.info(req.files.path);
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



    res.json(req.files);
  });
};
