import Logger from '../../loaders/logger';
import { Router, Request, Response } from 'express';
const route = Router();
import multer from 'multer';
import config from '../../config';
import convertVideo from './ffmpegHelper';
import { GCPUploader } from '../../services/GCPUploader';
import { GCPSpeechToText } from '../../services/GCPSpeechToText';
const { Storage } = require('@google-cloud/storage');
const speech = require('@google-cloud/speech');
const client = new speech.SpeechClient();
const upload = multer({ dest: 'uploads/' })

export default (app: Router) => {
  app.use('/upload', route);

  route.post('/video', upload.any(), async (req: Request, res: Response, next: any) => {
    req.setTimeout(500000);
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
    const [file] = req.files;
    const { path } = file;

    try {
      Logger.info("STEP 1: Convert Video to Audio");
      const audioFilePath: string = await convertVideo(path);
      console.log({ audioFilePath });

      Logger.info("STEP 2: Upload Audio to GCP");
      const gcpUploader: IUploader = new GCPUploader('caption-creator-video-upload', new Storage());
      await gcpUploader.uploadFile(audioFilePath);

      Logger.info("STEP 3: Convert Audio to Text");
      const uri = `gs://${config.googleCloudStorage.videoUpload.bucket}/${audioFilePath}`;
      const gcpSpeechToText = new GCPSpeechToText(uri, client);
      const words = await gcpSpeechToText.convertAudio()

      Logger.info("All Done, return the words");
      return res.json(words)
    } catch (err) {
      return res.status(400).send(err);
    }

  });
};
