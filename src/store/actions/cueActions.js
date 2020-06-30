import {
  ADD_CUE,
  REMOVE_CUE,
  ON_CHANGE_CUE,
  ON_CHANGE_CUES,
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
      cueIndex,
    },
  };
}

export function onDeltaChange(startDelta, endDelta, cueIndex) {
  return {
    type: ON_DELTA_CUE,
    payload: {
      startDelta,
      endDelta,
      cueIndex,
    },
  };
}

export function onChangeCueText(index, text) {
  return {
    type: ON_CHANGE_CUE_TEXT,
    payload: { index, text },
  };
}

export function onChangeCues(cues) {
  return {
    type: ON_CHANGE_CUES,
    payload: {
      cues
    },
  };
}