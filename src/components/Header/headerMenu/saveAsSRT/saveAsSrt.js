import React from "react";
import { MenuItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { SaveAlt as SaveAsIcon } from "@material-ui/icons";

const SaveAsSRT = ({ handleClose }) => {
  const handleClearCues = () => {
    handleClose();
  };

  return (
    <MenuItem onClick={handleClearCues} disabled>
      <ListItemIcon>
        <SaveAsIcon />
      </ListItemIcon>
      <ListItemText primary="Save subs as .SRT" />
    </MenuItem>
  );
};

export default SaveAsSRT;
