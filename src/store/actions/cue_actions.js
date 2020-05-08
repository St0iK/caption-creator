import {
    ON_ADD_CUE,
    ON_REMOVE_CUE,
    ON_CHANGE_CUE,
    ON_CHANGE_CUES,
    ON_LOADING_CUES,
    ON_CHANGE_CUE_START,
    ON_CHANGE_CUE_END,
    ON_DELTA_CUE,
    ON_CHANGE_CUE_TEXT,
} from './actionTypes.js';

const TEST = 'TEST';
export function test() {
    return {
        type: TEST,
    }
}
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
export function onAddCue(cue) {
    return {
        type: ON_ADD_CUE,
        payload: cue
    }
}

export function onRemoveCue(cue) {
    return {
        type: ON_REMOVE_CUE,
        payload: cue
    }
}
