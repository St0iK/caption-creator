import { ON_SET_VIDEO_SRC } from "./actionTypes.js";

export function onSetVideoSrc(file) {
  // console.log(file)
  return {
    type: ON_SET_VIDEO_SRC,
    file: file,
  };
}
