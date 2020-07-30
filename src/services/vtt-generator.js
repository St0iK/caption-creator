import { WebVTT } from "vtt.js";
import { v4 as uuidv4 } from "uuid";
import { formatSeconds } from "./timing";

export function getCuesFromWords(wordsList) {
  console.log({ wordsList });
  let cursor = 0;
  const numWords = wordsList.length;
  console.log({ numWords });
  const cues = [];

  while (cursor < numWords) {
    console.log(cursor);
    const [cue, wordCount] = getCueFromWords(wordsList, cursor);
    cues.push(cue);
    console.log({ cue });
    cursor += wordCount;
  }
  console.log({ cues });
  return cues;
}

function getCueFromWords(wordsList, cursor) {
  let charCount = 0;
  const endOfList = wordsList.length;
  const start = cursor;
  while (charCount < 40 && cursor < endOfList) {
    const wordData = wordsList[cursor];
    charCount += wordData.word.length;
    cursor++;
  }

  return [
    new VTTCue(
      parseGoogleTime(wordsList[start].startTime),
      parseGoogleTime(wordsList[cursor - 1].endTime),
      joinWords(wordsList, start, cursor)
    ),
    cursor - start,
  ];
}

function joinWords(wordsList, from, to) {
  const numWordsToJoin = to - from;
  // TODO: does using the Array constructor this way actually help with memory allocation?
  const wordsToJoin = new Array(numWordsToJoin);
  for (let i = 0; i < numWordsToJoin; i++) {
    wordsToJoin[i] = wordsList[from + i].word;
  }
  return wordsToJoin.join(" ");
}
/* so far parseTimeUnit is not used
function parseTimeUnit(unit) {
  const parsed = parseInt(unit);
  return isNaN(parsed) ? 0 : parsed;
}
*/

// type speechV2TimeRepresentation = {
//   seconds: string;
//   nanos?: string;
// }
// timeString is a string in the format "10.500s"
function parseGoogleTime(timeString) {
  console.log({ timeString });
  const timeConverted = `${timeString.seconds}.${String(
    timeString.nanos
  ).substr(0, 3)}`;
  console.log({ timeConverted });
  return parseFloat(timeConverted.slice(0, -1));
}

export function getVTTFromCues(cueList, title = "Some title") {
  const vttParts = cueList.map((nextCue) => {
    const start = formatSeconds(nextCue.startTime);
    const end = formatSeconds(nextCue.endTime);
    return `${start} --> ${end}\n${nextCue.text}\n\n`;
  });

  vttParts.unshift(`WEBVTT - ${title}\n\n`);

  return new Blob(vttParts, { type: "text/vtt" });
}

export function getCuesFromVTT(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener("error", () => {
      reader.abort();
      reject(new Error("An error occurred while reading the file."));
    });

    reader.addEventListener("load", async () => {
      if (!reader.result) return reject(new Error("Empty VTT file"));
      const cues = [];
      const parser = new WebVTT.Parser(window, WebVTT.StringDecoder());
      parser.oncue = (c) => {
        c.id = uuidv4();
        cues.push(c);
      };
      parser.onparsingerror = (e) => reject(new Error(e.message));
      parser.onflush = () => resolve(cues);
      parser.parse(reader.result);
      parser.flush();
    });

    reader.readAsText(file);
  });
}
