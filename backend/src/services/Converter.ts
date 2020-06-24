import Logger from '../loaders/logger';
import { Router, Request, Response } from 'express';
const route = Router();
import multer from 'multer';
import config from '../config';
import convertVideo from '../services/ffmpegHelper';
import { GCPUploader } from '../services/GCPUploader';
import { GCPSpeechToText } from '../services/GCPSpeechToText';
import LRUCache from 'lru-cache';
const { Storage } = require('@google-cloud/storage');
const speech = require('@google-cloud/speech');
const client = new speech.SpeechClient();

class Converter {

  cache: LRUCache<string, object>

  constructor(cache: LRUCache<string, object>) {
    this.cache = cache;
  }

  async run(path: string, operationId: string): Promise<void> {

    Logger.info("STEP 1: Convert Video to Audio");
    const audioFilePath: string = await convertVideo(path);
    this.cache.set(operationId, {
      step: 2,
      totalSteps: 4,
      result: { audioFilePath },
      message: 'Converted Video to Audio',
      status: 'not-done'
    });

    Logger.info("STEP 2: Upload Audio to GCP");
    const gcpUploader: IUploader = new GCPUploader('caption-creator-video-upload', new Storage());
    await gcpUploader.uploadFile(audioFilePath);
    const uri = `gs://${config.googleCloudStorage.videoUpload.bucket}/${audioFilePath}`;
    this.cache.set(operationId, {
      step: 3,
      totalSteps: 4,
      result: { uri },
      message: 'Uploaded audio file to GCP',
      status: 'not-done'
    });

    Logger.info("STEP 3: Convert Audio to Text");
    const gcpSpeechToText = new GCPSpeechToText(uri, client);
    const words = await gcpSpeechToText.convertAudio()

    Logger.info("All Done, return the words");
    this.cache.set(operationId, {
      step: 4,
      totalSteps: 4,
      result: { words },
      message: 'Converted audio to words',
      status: 'done'
    });
  }
}

export { Converter }