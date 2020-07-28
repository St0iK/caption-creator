import React, { useState, forwardRef } from "react";
import axios from "axios";
import { MissedVideoCallRounded as VideoIcon } from "@material-ui/icons";
import { MenuItem, ListItemIcon, ListItemText } from "@material-ui/core";
import {
  UPLOAD_STATE_COMPLETED,
  UPLOAD_STATE_EXTRACTING,
} from "../../../Player/UploadProgress";
import { getCuesFromWords } from "../../../../services/vtt-generator";
import { useDispatch, useSelector } from "react-redux";
import { onChangeCues } from "../../../../store/actions/cueActions";
import CueExtractionDialog from "../../../Player/ConverterDialog";

//for some reason <Menu/> expects a ref to it's first child, it will throw errors if no ref is provided,
//the forwardRef fixes the console error
const GenerateCaptionsBtn = forwardRef((props, ref) => {
  const [converting, setConverting] = useState(false);
  const [uploadState, setUploadState] = useState("");
  const dispatch = useDispatch();
  const file = useSelector((state) => state.video.file);

  const onGenerateCaptions = async (e) => {
    props.handleClose();
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
          const cues = getCuesFromWords(job.result.words);
          dispatch(onChangeCues(cues));
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

  return (
    <>
      <MenuItem onClick={onGenerateCaptions} disabled={!file}>
        <ListItemIcon>
          <VideoIcon />
        </ListItemIcon>
        <ListItemText primary="Auto-Generate Subs" />
      </MenuItem>
      {converting && <CueExtractionDialog uploadState={uploadState} />}
    </>
  );
});

export default GenerateCaptionsBtn;
