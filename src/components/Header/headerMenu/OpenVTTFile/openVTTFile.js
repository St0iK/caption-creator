import React, { useCallback, useRef } from "react";
import {
  MenuItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@material-ui/core";
import { TextFields as OpenVTTIcon } from "@material-ui/icons";
import { getCuesFromVTT } from "../../../../services/vtt-generator";
import { useDispatch } from "react-redux";
import { onChangeCues } from "../../../../store/actions/cueActions";

const OpenVTTFile = ({ handleClose }) => {
  const dispatch = useDispatch();

  const onFilesSelected = useCallback(async (e) => {
    e.stopPropagation();

    try {
      const newCues = await getCuesFromVTT(e.target.files[0]);
      dispatch(onChangeCues(newCues));
    } catch (e) {
      console.log("error loading .vtt file");
    }
  });

  const openVTTbtnRef = useRef();

  const handleMenuClick = (e) => {
    // Trigger the <Button>'s click event programmatically, so that the open file dialog is opened
    openVTTbtnRef.current.click();
    handleClose();
  };

  return (
    <MenuItem onClick={handleMenuClick}>
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
