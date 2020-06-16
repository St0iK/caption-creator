import Logger from './loaders/logger';
import { GCPSpeechToText } from './services/GCPSpeechToText';
const speech = require('@google-cloud/speech');
const client = new speech.SpeechClient();

(async () => {
  try {
    Logger.info('Starting audio convert');
    const uri = 'gs://caption-creator-video-upload/export.flac';
    const gcpSpeechToText = new GCPSpeechToText(uri, client);
    Logger.info('Starting audio convert');
    await gcpSpeechToText.convertAudio()
    Logger.info('audio convert Done ✅');
  } catch (e) {
    // this should catch all exceptions
  }
})();

