import Logger from '../../loaders/logger';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';

Logger.info('FFMPEG is about to run !');

const convertVideo = (path): Promise<string> => {
  return new Promise((resolve, reject) => {
    Logger.info(ffmpegStatic);
    // ffmpeg('./file_example_MOV_1920_2_2MB.mov')
    ffmpeg(path)
      .setFfmpegPath(ffmpegStatic)
      .audioChannels(1)
      .audioFrequency(16000)
      .format('flac')
      .saveToFile('./export.flac')
      .on('progress', (progress) => {
        Logger.info(`[ffmpeg] ${JSON.stringify(progress)}`);
      })
      .on('error', (err) => {
        Logger.info(`[ffmpeg] error: ${err.message}`);
        reject(`[ffmpeg] error: ${err.message}`)
      })
      .on('end', () => {
        Logger.verbose('[ffmpeg] finished');
        resolve('./export.flac')
      })

  });
}

export default convertVideo;
