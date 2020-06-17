import Logger from '../../loaders/logger';
import { Router, Request, Response } from 'express';
const route = Router();
import multer from 'multer';
var upload = multer({ dest: 'uploads/' })
import MulterGoogleCloudStorage from 'multer-google-storage';
import config from '../../config';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';
import convertVideo from './ffmpegHelper';
import { GCPUploader } from '../../services/GCPUploader';
import { GCPSpeechToText } from '../../services/GCPSpeechToText';
const { Storage } = require('@google-cloud/storage');
const speech = require('@google-cloud/speech');
const client = new speech.SpeechClient();


export default (app: Router) => {

  app.use('/upload', route);

  route.post('/video', upload.any(), async (req: Request, res: Response, next: any) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    const [file] = req.files;

    const { path } = file;

    Logger.info(path);

    try {
      const storage = new Storage();
      //const audioFilePath: string = await convertVideo(path);
      //const gcpUploader: IUploader = new GCPUploader('caption-creator-video-upload', storage);
      //const uploadResult = await gcpUploader.uploadFile(audioFilePath);
      //console.log({ uploadResult });
      const uri = 'gs://caption-creator-video-upload/export.flac';
      const gcpSpeechToText = new GCPSpeechToText(uri, client);
      Logger.info('Starting audio convert');
      const r = await gcpSpeechToText.convertAudio()
      Logger.info('audio convert Done ✅');
      return res.json(r)
    } catch (err) {
      return res.status(400).send(err);
    }


  });
};
