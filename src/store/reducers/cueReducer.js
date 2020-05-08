import { ON_ADD_CUE } from '../actions/actionTypes';
import sortBy from "lodash.sortby";

const initialCues = {
    cues: [],
};

const cueReducer = (state = initialCues, action) => {
    const { cues } = state;
    switch (action.type) {
        case ON_ADD_CUE:
            if (cues.length) {
                const lastCue = cues[cues.length - 1];
                return { ...state, cues: cues.concat(new VTTCue(lastCue.endTime, lastCue.endTime + 2, "")) }
            }
            return { ...state, cues: [new VTTCue(0, 2, "")] };
        case 'TEST':
            return { ...state };
        default:
            return state;
    }
};

export default cueReducer;
