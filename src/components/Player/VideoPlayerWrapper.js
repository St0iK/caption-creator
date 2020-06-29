import React, { useEffect, forwardRef } from "react";
// import ReactPlayer from "react-player";
// import { withResizeDetector } from "react-resize-detector";
import ReactResizeDetector from "react-resize-detector";
import { useSelector } from "react-redux";
// import VTTtrack from "./my_captions.vtt";
// import VTTtrack2 from "./my_captions2.vtt";
import videoTrack from "./videoplayback.mp4";
import { Paper } from "@material-ui/core";
import { Resizable } from "re-resizable";
import useWindowSize from "../../common/useWindowSize";

const HEADER_AND_TIMELINE_HEIGHT = -80 - 150;

const style2 = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid rgb(221, 221, 221)",
  background: "rgb(240, 240, 240)",
  width: "100%",
  height: "100%",
  minWidth: "200px",
};

const VideoPlayerWrapper = forwardRef((props, ref) => {
  const size = useWindowSize();

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
    <Resizable
      enable={{
        top: false,
        right: false,
        bottom: false,
        left: true,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
      maxWidth="65vw"
      minWidth={400}
      defaultSize={{
        width: "60vw",
        height: "75vh",
      }}
      maxHeight={size.height - HEADER_AND_TIMELINE_HEIGHT}
      // maxHeight={size.height - 80 - 150} // header - vttTimeLine
    >
      <Paper style={style2}>
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
      </Paper>
    </Resizable>
  );
});

export default VideoPlayerWrapper;
