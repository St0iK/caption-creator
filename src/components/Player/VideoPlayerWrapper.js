import React, { useEffect, forwardRef } from "react";
// import ReactPlayer from "react-player";
// import { withResizeDetector } from "react-resize-detector";
import ReactResizeDetector from "react-resize-detector";
import { useSelector } from "react-redux";
// import VTTtrack from "./my_captions.vtt";
// import VTTtrack2 from "./my_captions2.vtt";
import videoTrack from "./videoplayback.mp4";

const VideoPlayerWrapper = forwardRef((props, ref) => {
  // const W = props.width - 20;
  // const H = props.height - 20;
  // const playerRef = React.useRef();
  const cues = useSelector((state) => state.cues.cues);

  const [captionSrc, setCaptionSrc] = React.useState(null);

  useEffect(() => {
    const vttBlob = getVTTFromCues(cues); // cuesTest
    setCaptionSrc(vttBlob);
    const vttBlobUrl = URL.createObjectURL(vttBlob);
    setCaptionSrc((oldUrl) => {
      if (oldUrl) URL.revokeObjectURL(oldUrl);
      return vttBlobUrl;
    });
  }, [cues]);

  function getVTTFromCues(cueList, title = "Some title") {
    const vttParts = cueList.map((nextCue) => {
      const start = formatSeconds(nextCue.startTime);
      const end = formatSeconds(nextCue.endTime);
      return `${start} --> ${end}\n${nextCue.text}\n\n`;
    });

    vttParts.unshift(`WEBVTT - ${title}\n\n`);

    return new Blob(vttParts, { type: "text/vtt" });
  }

  // decSeconds is a float version of the time in seconds (e.g. 13.456)
  function formatSeconds(decSeconds) {
    if (isNaN(decSeconds)) return "00:00.000";
    const min = Math.floor(decSeconds / 60);
    const sec = Math.floor(decSeconds % 60);
    const mill = Math.round((decSeconds - Math.floor(decSeconds)) * 1000);
    return `${formatTimeUnit(min, 2)}:${formatTimeUnit(
      sec,
      2
    )}.${formatTimeUnit(mill, 3)}`;
  }

  function formatTimeUnit(unit, width) {
    if (!unit) return "0".repeat(width);
    return unit.toString().padStart(width, "0");
  }

  return (
    <ReactResizeDetector handleWidth handleHeight>
      {({ width, height }) => (
        <video
          controls
          src={videoTrack}
          width={width || 200}
          height={height || 200}
          ref={ref}
        >
          <track default src={captionSrc} />
        </video>
      )}
    </ReactResizeDetector>
  );
});

export default VideoPlayerWrapper;
