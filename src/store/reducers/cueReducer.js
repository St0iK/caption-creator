import {
  ADD_CUE,
  REMOVE_CUE,
  ON_CHANGE_CUE,
  ON_DELTA_CUE,
} from "../actions/actionTypes";
import sortBy from "lodash.sortby";
import { v4 as uuidv4 } from "uuid";

const initialCues = {
  cues: [],
};

const cueReducer = (state = initialCues, action) => {
  const { cues } = state;
  const newCues = [...cues];

  switch (action.type) {
    case ADD_CUE:
      if (newCues.length) {
        const lastCue = newCues[newCues.length - 1];
        const newCue = new VTTCue(lastCue.endTime, lastCue.endTime + 2, "");
        newCue.id = uuidv4();
        const updatedCues = newCues.concat(newCue);

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
      newCues.splice(action.index, 1);
      return {
        ...state,
        cues: newCues,
      };

    case ON_CHANGE_CUE:
      const { cue, cueIndex } = action.payload;
      newCues[cueIndex] = cue;
      return {
        ...state,
        cues: sortBy(newCues, ["startTime"]),
      };

    case ON_DELTA_CUE:
      const { startDelta, endDelta, cueIndex: index } = action.payload;
      const currentCue = cues[index];
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

    default:
      return state;
  }
};

export default cueReducer;
