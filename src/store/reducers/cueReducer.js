import { ADD_CUE, REMOVE_CUE, ON_CHANGE_CUE } from "../actions/actionTypes";
import sortBy from "lodash.sortby";

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
        const updatedCues = newCues.concat(
          new VTTCue(lastCue.endTime, lastCue.endTime + 2, "")
        );

        return {
          ...state,
          cues: sortBy(updatedCues, ["startTime"]),
        };
      }

      return {
        ...state,
        cues: [new VTTCue(0, 2, "")]
      };

    case REMOVE_CUE:
      newCues.splice(action.index, 1);
      return {
        ...state,
        cues: newCues
      };

    case ON_CHANGE_CUE:
      const { cue, cueIndex } = action.payload;
      newCues[cueIndex] = cue;
      return {
        ...state,
        cues: sortBy(newCues, ["startTime"])
      };

    default:
      return state;
  }
};

export default cueReducer;
