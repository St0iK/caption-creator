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

const OpenVTTFile = ({ handleClose }) => {
  // const dispatch = useDispatch();

  const onFilesSelected = (e) => {
    e.stopPropagation();
    console.log("Open VTT file");
    // const [videoFile] = e.target.files;
    // dispatch(onSetVideoSrc(videoFile))
  };

  const openVTTbtnRef = React.useRef();

  const handleMenuClick = (e) => {
    // Trigger the <Button>'s click event programmatically, so that the open file dialog is opened
    openVTTbtnRef.current.click();
    handleClose();
  };

  return (
    <MenuItem onClick={handleMenuClick} disabled>
      <ListItemIcon>
        <OpenVTTIcon />
        <input
          style={{ display: "none" }}
          id="raised-button-VTT-file"
          accept=".vtt"
          type="file"
          onChange={onFilesSelected}
        />

        <label htmlFor="raised-button-VTT-file">
          <Button
            ref={openVTTbtnRef}
            variant="contained"
            color="secondary"
            component="span"
            style={{ display: "none" }}
          >
            Select VTT
          </Button>
        </label>
      </ListItemIcon>
      <ListItemText primary="Load subs from VTT file" />
    </MenuItem>
  );
};

export default OpenVTTFile;
