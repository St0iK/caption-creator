import Logger from '../loaders/logger';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';

const convertVideo = (path: string): Promise<string> => {
  const [, audioFileName] = path.split('/');
  const flacAudioFileName: string = `${audioFileName}.flac`;

  return new Promise((resolve, reject) => {
    ffmpeg(path)
      .setFfmpegPath(ffmpegStatic)
      .audioChannels(1)
      .audioFrequency(16000)
      .format('flac')
      .saveToFile(flacAudioFileName)
      .on('progress', (progress) => {
        Logger.info(`[ffmpeg] ${JSON.stringify(progress)}`);
      })
      .on('error', (err) => {
        Logger.info(`[ffmpeg] error: ${err.message}`);
        reject(`[ffmpeg] error: ${err.message}`)
      })
      .on('end', () => {
        Logger.verbose('[ffmpeg] finished');
        resolve(flacAudioFileName)
      })

  });
}

export default convertVideo;
