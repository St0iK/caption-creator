
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
  return wordsToJoin.join(' ');
}

function parseTimeUnit(unit) {
  const parsed = parseInt(unit);
  return isNaN(parsed) ? 0 : parsed;
}

// type speechV2TimeRepresentation = {
//   seconds: string;
//   nanos?: string;
// }
// timeString is a string in the format "10.500s"
function parseGoogleTime(timeString) {
  console.log({ timeString })
  const timeConverted = `${timeString.seconds}.${String(timeString.nanos).substr(0, 3)}`
  console.log({ timeConverted })
  return parseFloat(timeConverted.slice(0, -1));
}