import React from "react";
import {
  MenuItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@material-ui/core";
import { TextFields as OpenVTTIcon } from "@material-ui/icons";
// import { useDispatch} from 'react-redux';
// import {onSetVideoSrc} from '../../../../store/actions/videoSrcActions';

const OpenSRTFile = ({ handleClose }) => {
  // const dispatch = useDispatch();

  const onFilesSelected = (e) => {
    //stopPropagation doesn't work cause the click is triggered programmatically
    // e.stopPropagation();
    console.log("Open VTT file");
    // const [videoFile] = e.target.files;
    // dispatch(onSetVideoSrc(videoFile))
  };

  const openSRTBtnRef = React.useRef();

  const handleMenuClick = (e) => {
    // Trigger the <Button>'s click event programmatically, so that the open file dialog is opened
    openSRTBtnRef.current.click();
    handleClose();
  };

  return (
    <MenuItem onClick={handleMenuClick} disabled>
      <ListItemIcon>
        <OpenVTTIcon />
        <input
          style={{ display: "none" }}
          id="raised-button-SRT-file"
          accept=".srt"
          type="file"
          onChange={onFilesSelected}
        />

        <label htmlFor="raised-button-SRT-file">
          <Button
            ref={openSRTBtnRef}
            variant="contained"
            color="secondary"
            component="span"
            style={{ display: "none" }}
          >
            Select SRT
          </Button>
        </label>
      </ListItemIcon>
      <ListItemText primary="Load subs from SRT file" />
    </MenuItem>
  );
};

export default OpenSRTFile;
