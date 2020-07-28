import React, { forwardRef, useState, useEffect } from "react";
// import * as PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { onSetVideoSrc } from "../../store/actions/videoSrcActions";
import { formatSeconds } from "../../services/timing";

const useStyles = makeStyles((theme) => ({
  loaderRoot: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

// VideoPlayer.propTypes = {
// 	className: PropTypes.any,
// };

const VideoPlayer = forwardRef((props, ref) => {
  const { width, height } = props;
  const dispatch = useDispatch();
  const [captionSrc, setCaptionSrc] = useState(null);
  const cues = useSelector((state) => state.cues.cues);

  const src = useSelector((state) => state.video.src);
  const classes = useStyles();

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

  const onFilesSelected = (e) => {
    const [videoFile] = e.target.files;
    dispatch(onSetVideoSrc(videoFile));
  };

  if (!src) {
    return (
      <div className={classes.loaderRoot}>
        <input
          className={""}
          style={{ display: "none" }}
          id="raised-button-file"
          accept="video/*"
          type="file"
          onChange={onFilesSelected}
        />
        <label htmlFor="raised-button-file">
          <Button
            variant="contained"
            color="secondary"
            component="span"
            className={""}
          >
            Select Video
          </Button>
        </label>
      </div>
    );
  }

  return (
    <div>
      <video
        controls
        src={src}
        width={width || 200}
        height={height || 200}
        ref={ref}
      >
        <track default src={captionSrc} />
      </video>
    </div>
  );
});

export default VideoPlayer;
