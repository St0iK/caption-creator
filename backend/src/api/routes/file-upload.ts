import Logger from '../../loaders/logger';
import { Router, Request, Response } from 'express';
const route = Router();
import multer from 'multer';
import config from '../../config';
import convertVideo from '../../services/ffmpegHelper';
import { GCPUploader } from '../../services/GCPUploader';
import { GCPSpeechToText } from '../../services/GCPSpeechToText';
import { Converter } from '../../services/Converter';
const { Storage } = require('@google-cloud/storage');
const speech = require('@google-cloud/speech');
const client = new speech.SpeechClient();
const upload = multer({ dest: 'uploads/' })
const LRUCache = require("lru-cache")
const cache = new LRUCache();
import { v4 as uuidv4 } from 'uuid';


export default (app: Router) => {
  app.use('/upload', route);

  route.post('/video', upload.any(), async (req: Request, res: Response, next: any) => {
    // req.setTimeout(500000);
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
    const [file] = req.files;
    const { path } = file;

    try {

      // Generate an Operation ID
      const operationId = uuidv4();

      this.cache.set(operationId, {
        step: 1,
        totalSteps: 4,
        result: {},
        message: 'Operation Initialized',
        status: 'not-done'
      });

      // Initialize the Converter
      const converter = new Converter(cache);
      converter.run(path, operationId);

      return res.json({ operationId });

    } catch (err) {
      return res.status(400).send(err);
    }

  });
};
