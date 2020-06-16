import Logger from './loaders/logger';
import { GCPSpeechToText } from './services/GCPSpeechToText';
import { getCuesFromWords } from '../../src/services/VttGenerator';
const speech = require('@google-cloud/speech');
const client = new speech.SpeechClient();

(async () => {
  try {
    Logger.info('Starting audio convert');
    const uri = 'gs://caption-creator-video-upload/export.flac';
    const gcpSpeechToText = new GCPSpeechToText(uri, client);
    Logger.info('Starting audio convert');
    const wordList = await gcpSpeechToText.convertAudio();
    return wordList;
    console.log({ wordList });
    const c = getCuesFromWords(wordList);
    console.log({ c });
    Logger.info('audio convert Done ✅');
  } catch (e) {
    // this should catch all exceptions
    console.log(e);
  }
})();

