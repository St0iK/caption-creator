import { useRef, useEffect, createRef } from "react";
import { useSelector } from "react-redux";

/**
 * -useAutoScroll has one purpose: to automatically scroll the cues in VTTEditor and vttTimeline
 * based on the current video time (without any unncessary re-rendering).
 * -Since the task is very specific useAutoScroll is not written for re-usability
 * but rather to abstract the scrolling functionality from the root component <App.js>
 */

const useAutoScroll = () => {
  const playerRef = useRef();
  const cues = useSelector((state) => state.cues.cues);
  //cueRefArray is an array of Refs where each element holds a DOM reference to the corresponding <CueEditor> component
  const cueRefArray = useRef([]);
  cueRefArray.current = cues.map(() => createRef());
  let currentCueIndex = useRef(undefined);
  const vttTimelineRef = useRef();

  let timerID = useRef();

  const validateScroll = () => {
    if (cues.length === 0) return;
    // console.log("Validating Scroll...");
    let currentTime = playerRef.current.currentTime;
    findCurrentCueIndex();
    if (!currentCueIndex.current) return;
    if (
      cues.length > 0 &&
      currentTime >= cues[currentCueIndex.current].startTime &&
      currentTime <= cues[currentCueIndex.current].endTime
    ) {
      scrollCues();
      if (currentCueIndex.current < cues.length - 1) currentCueIndex.current++;
    }
  };

  const onPlay = () => {
    // https://stackoverflow.com/questions/6685396/execute-the-setinterval-function-without-delay-the-first-time
    validateScroll();
    timerID.current = setInterval(validateScroll, 1000);
  };

  const findCurrentCueIndex = () => {
    if (cues.length > 0) {
      let minIndex = 0;
      let maxIndex = cues.length - 1;
      let midIndex = Math.floor((maxIndex - minIndex) / 2);
      let currentTime = playerRef.current.currentTime;
      currentCueIndex.current = undefined;
      // console.log(`findCurrentCueIndex: ${currentTime}`);
      if (
        currentTime >= cues[minIndex].startTime &&
        currentTime <= cues[minIndex].endTime
      ) {
        currentCueIndex.current = minIndex;
        scrollCues();
        return;
      } else if (
        currentTime >= cues[maxIndex].startTime &&
        currentTime <= cues[maxIndex].endTime
      ) {
        currentCueIndex.current = maxIndex;
        scrollCues();
        return;
      }

      do {
        if (cues[midIndex].startTime >= currentTime) {
          maxIndex = midIndex;
          midIndex = minIndex + Math.floor((maxIndex - minIndex) / 2);
        } else {
          minIndex = midIndex;
          midIndex = minIndex + Math.floor((maxIndex - minIndex) / 2);
        }
      } while (maxIndex - minIndex > 3);

      for (let i = minIndex; i < maxIndex; i++) {
        if (
          currentTime >= cues[i].startTime &&
          currentTime <= cues[i].endTime
        ) {
          currentCueIndex.current = i;
        }
      }
      if (currentCueIndex.current) {
        scrollCues();
      }
    }
  };

  const scrollCues = () => {
    cueRefArray.current[currentCueIndex.current].current.scrollIntoView();
    let SCROLLPOSITION = cues[currentCueIndex.current].startTime * 200;
    vttTimelineRef.current.scrollTo({
      top: 0,
      left: SCROLLPOSITION,
      behavior: "smooth",
    });
  };

  const onSeek = () => findCurrentCueIndex();

  const onPause = () => {
    clearInterval(timerID.current);
  };

  useEffect(
    (e) => {
      playerRef.current.addEventListener("seeked", onSeek);
      playerRef.current.addEventListener("play", onPlay);
      playerRef.current.addEventListener("pause", onPause);
      return () => {
        playerRef.current.removeEventListener("seeked", onSeek);
        playerRef.current.removeEventListener("play", onPlay);
        playerRef.current.removeEventListener("pause", onPause);
        if (!playerRef.current.paused) {
          onPause();
          onPlay();
        }
      };
    },
    [cues, onSeek, onPlay, onPause]
  );

  return [cueRefArray, playerRef, vttTimelineRef];
};

export default useAutoScroll;
