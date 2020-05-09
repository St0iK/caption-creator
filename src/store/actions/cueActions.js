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

export function onChangeCue(cue, cueIndex) {
  return {
    type: ON_CHANGE_CUE,
    payload: {
      cue,
      cueIndex
    },
  };
}

