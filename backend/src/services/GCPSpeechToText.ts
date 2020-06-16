class GCPSpeechToText {
  uri: string;
  client: any;

  constructor(uri: string, client: any) {
    this.uri = uri;
    this.client = client;
  }

  async convertAudio() {
    const gcsUri = this.uri;
    const encoding = 'FLAC';
    const sampleRateHertz = 16000;
    const languageCode = 'en-US';

    const config = {
      encoding: encoding,
      sampleRateHertz: sampleRateHertz,
      languageCode: languageCode,
      enableWordTimeOffsets: true,
      enableAutomaticPunctuation: true,
    };

    const audio = {
      uri: gcsUri,
    };

    const request = {
      config: config,
      audio: audio,
    };
    console.log({ request });

    // Detects speech in the audio file. This creates a recognition job that you
    // can wait for now, or get its result later.

    const [operation] = await this.client.longRunningRecognize(request);
    console.log({ operation });
    // Get a Promise representation of the final result of the job
    const [response] = await operation.promise();
    console.log({ response });
    console.log(response.results);

    const transcription = response.results
      // .map(result => result.alternatives[0].words)
      .map(result => console.log(result.alternatives[0]))
      .join('\n');
    console.log(`Transcription: ${transcription}`);
  }
}

export { GCPSpeechToText };

