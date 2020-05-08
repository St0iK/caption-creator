import { combineReducers } from "redux";
import cueReducer from "./cueReducer";

export default combineReducers({
    cues: cueReducer,
});
