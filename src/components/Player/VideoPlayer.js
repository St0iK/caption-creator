import React, { forwardRef, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";
import axios from "axios";
import { getCuesFromWords } from "../../services/vtt-generator";
import { formatSeconds } from "../../services/timing";
import { useDispatch, useSelector } from "react-redux";
import { onChangeCues } from "../../store/actions/cueActions";
import {
  UPLOAD_STATE_COMPLETED,
  UPLOAD_STATE_EXTRACTING,
} from "./UploadProgress";
import CueExtractionDialog from "./ConverterDialog";

const useStyles = makeStyles((theme) => ({
  loaderRoot: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const VideoPlayer = forwardRef((props, ref) => {
  const cues = useSelector((state) => state.cues.cues);
  const dispatch = useDispatch();
  const [captionSrc, setCaptionSrc] = useState(null);
  const { width, height } = props;
  const [file, setFile] = useState();
  const [src, setSrc] = useState("");
  const [converting, setConverting] = useState(false);
  const [uploadState, setUploadState] = useState("");
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
    const [file] = e.target.files;
    setFile(file);
    if (src) {
      URL.revokeObjectURL(src);
    }
    const localUrl = URL.createObjectURL(file);
    setSrc(localUrl);
  };

  const onGenerateCaptions = async (e) => {
    setConverting(true);
    const formData = new FormData();
    formData.append("file", file);
    setUploadState(UPLOAD_STATE_EXTRACTING);

    const res = await axios.post(
      "http://localhost:5000/api/upload/video",
      formData
    );
    const { operationId } = res.data;

    const intervalId = setInterval(async () => {
      const resp = await fetch(
        `http://localhost:5000/api/operation/poll/${operationId}`
      );
      if (resp.ok) {
        const job = await resp.json();
        console.log({ job });
        setUploadState(UPLOAD_STATE_EXTRACTING);
        if (job.done) {
          clearInterval(intervalId);
          const cuesFromWords = getCuesFromWords(job.result.words);
          dispatch(onChangeCues(cuesFromWords));
          setUploadState(UPLOAD_STATE_COMPLETED);
          setConverting(false);
        }
      } else {
        clearInterval(intervalId);
      }
    }, 2000);

    setTimeout(() => {
      clearInterval(intervalId);
    }, 200000);
  };

  if (!file) {
    return (
      <div className={classes.loaderRoot}>
        <input
          className={""}
          style={{ display: "none" }}
          id="raised-button-file"
          multiple
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

      <Button component="span" className={""} onClick={onGenerateCaptions}>
        Generate Captions
      </Button>

      {converting && <CueExtractionDialog uploadState={uploadState} />}
    </div>
  );
});

export default VideoPlayer;
