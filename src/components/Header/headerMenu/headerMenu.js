import React, { useState } from "react";
import { Menu, IconButton } from "@material-ui/core";
import { MoreVert as MenuIcon } from "@material-ui/icons";
import AutoGenerateSubs from "./AutoGenerateSubs/autoGenerateSubs";
import ToggleTheme from "./toggleTheme/toggleTheme";
import ClearCues from "./clearCues/clearCues";
import OpenVideoFile from "./OpenVideoFile/openVideoFile";
import OpenVTTFile from "./OpenVTTFile/openVTTFile";
import OpenSRTFile from "./OpenSRTFile/openSRTFile";
import SaveAsVTT from "./saveAsVTT/saveAsVTT";
import SaveAsSRT from "./saveAsSRT/saveAsSrt";

export default function HeaderMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-controls="menu"
        aria-haspopup="true"
        variant="contained"
        title="Menu"
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        elevation={1}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <AutoGenerateSubs handleClose={handleClose} />
        <hr />
        <OpenVideoFile handleClose={handleClose} />
        <ClearCues handleClose={handleClose} />
        <hr />
        <OpenVTTFile handleClose={handleClose} />
        <OpenSRTFile handleClose={handleClose} />
        <hr />
        <SaveAsVTT handleClose={handleClose} />
        <SaveAsSRT handleClose={handleClose} />
        <hr />
        <ToggleTheme handleClose={handleClose} />
      </Menu>
    </>
  );
}
