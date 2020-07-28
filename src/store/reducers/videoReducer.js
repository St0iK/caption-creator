import { ON_SET_VIDEO_SRC } from "../actions/actionTypes";

const initialVideoState = {
  src: null,
  file: null,
};

const videoSrcReducer = (state = initialVideoState, action) => {
  switch (action.type) {
    case ON_SET_VIDEO_SRC:
      // console.log(state)
      if (state.src) {
        console.log("revoking URL");
        URL.revokeObjectURL(state.src);
      }
      return {
        ...state,
        file: action.file,
        src: URL.createObjectURL(action.file),
      };
    default:
      return state;
  }
};

export default videoSrcReducer;
