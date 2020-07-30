import React, { useCallback } from "react";
import { MenuItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { SaveAlt as SaveAsIcon } from "@material-ui/icons";
import { saveAs } from "file-saver";
import { getVTTFromCues } from "../../../../services/vtt-generator";
import { useSelector } from "react-redux";

const SaveAsVTT = ({ handleClose }) => {
  const cues = useSelector((state) => state.cues.cues);
  const videoFile = useSelector((state) => state.video.file);

  const handleMenuClick = useCallback((e) => {
    saveStaticDataToFile();
    handleClose();
  });

  function saveStaticDataToFile() {
    let fileName = "captions.vtt";
    if (videoFile && videoFile.name) {
      const extensionIndex = videoFile.name.lastIndexOf(".");
      fileName = videoFile.name.slice(0, extensionIndex) + ".vtt";
    }

    const vttBlob = getVTTFromCues(cues);
    saveAs(vttBlob, fileName);
  }

  return (
    <MenuItem
      onClick={handleMenuClick}
      disabled={cues.length > 0 ? false : true}
    >
      <ListItemIcon>
        <SaveAsIcon />
      </ListItemIcon>
      <ListItemText primary="Save subs as .VTT" />
    </MenuItem>
  );
};

export default SaveAsVTT;
