import { combineReducers } from "redux";
import cueReducer from "./cueReducer";
import videoReducer from './videoReducer';


export default combineReducers({
    cues: cueReducer,
    video: videoReducer
});
