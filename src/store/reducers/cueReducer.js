import {
  ADD_CUE,
  REMOVE_CUE,
  ON_CHANGE_CUE,
  ON_CHANGE_CUES,
  ON_DELTA_CUE,
  ON_CHANGE_CUE_TEXT,
} from "../actions/actionTypes";
import sortBy from "lodash.sortby";
import { v4 as uuidv4 } from "uuid";

const initialCues = {
  cues: [],
};

const cueReducer = (state = initialCues, action) => {
  const { cues } = state;
  const newCues = [...cues];
  let updatedCues;

  switch (action.type) {
    case ADD_CUE:
      if (newCues.length) {
        const lastCue = newCues[newCues.length - 1];
        const newCue = new VTTCue(lastCue.endTime, lastCue.endTime + 2, "");
        newCue.id = uuidv4();
        updatedCues = newCues.concat(newCue);

        return {
          ...state,
          cues: sortBy(updatedCues, ["startTime"]),
        };
      }
      const newCue = new VTTCue(0, 2, "");
      newCue.id = uuidv4();
      return {
        ...state,
        cues: [newCue],
      };

    case REMOVE_CUE:
      updatedCues = newCues.filter((c, i) => i !== action.index);
      return {
        ...state,
        cues: updatedCues,
      };

    case ON_CHANGE_CUE:
      const { cue, cueIndex } = action.payload;
      newCues[cueIndex] = cue;
      newCues[cueIndex].id = cues[cueIndex].id;

      return {
        ...state,
        cues: sortBy(newCues, ["startTime"]),
      };

    case ON_CHANGE_CUES:
      const { cues: changedCues } = action.payload;
      console.log({ changedCues });
      return {
        ...state,
        cues: sortBy(changedCues, ["startTime"]),
      };

    case ON_DELTA_CUE:
      const { startDelta, endDelta, cueIndex: index } = action.payload;
      const currentCue = newCues[index];
      let newStartTime = currentCue.startTime + startDelta;
      let newEndTime = currentCue.endTime + endDelta;

      if (newStartTime < 0 && endDelta) {
        newStartTime = 0;
        newEndTime = currentCue.endTime - currentCue.startTime;
      } else if (newStartTime < 0) {
        newStartTime = 0;
      }

      const finalQue = new VTTCue(newStartTime, newEndTime, currentCue.text);
      finalQue.id = currentCue.id;
      newCues[index] = finalQue;

      return {
        ...state,
        cues: sortBy(newCues, ["startTime"]),
      };
    case ON_CHANGE_CUE_TEXT:
      const { index: textIndex, text } = action.payload;
      const prevCue = newCues[textIndex];
      updatedCues = newCues.map((cue, i) => {
        if (i === textIndex) {
          const newCue = new VTTCue(prevCue.startTime, prevCue.endTime, text);
          newCue.id = prevCue.id;
          return newCue;
        } else {
          return cue;
        }
      });
      return { ...state, cues: updatedCues };
    default:
      return state;
  }
};

export default cueReducer;
