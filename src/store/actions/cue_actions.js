import {
  ADD_CUE,
  REMOVE_CUE,
  ON_CHANGE_CUE,
  ON_CHANGE_CUES,
  ON_LOADING_CUES,
  ON_CHANGE_CUE_START,
  ON_CHANGE_CUE_END,
  ON_DELTA_CUE,
  ON_CHANGE_CUE_TEXT,
} from "./actionTypes.js";

//from cue
// onChangeCueStart: () => {},
// onChangeCueEnd: () => {},
// onDeltaCue: () => {},
// onChangeCueText: () => {},
// onRemoveCue: () => {},

//from cues
// onAddCue: () => {},
// onRemoveCue: () => {},
// // onChangeCue takes three args, the new cue, the index of the cue, and a boolean to indicate whether startTime was changed
// onChangeCue: () => {},
// onChangeCues: () => {},
// onLoadingCues: () => {},
export function addCue() {
  return {
    type: ADD_CUE,
  };
}

export function removeCue(index) {
  return {
    type: REMOVE_CUE,
    index,
  };
}
