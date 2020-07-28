import React from "react";
import {
  MenuItem,
  ListItemIcon,
  ListItemText,
  Button,
  // makeStyles,
} from "@material-ui/core";
import { FolderOpen } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { onSetVideoSrc } from "../../../../store/actions/videoSrcActions";

// const useStyles = makeStyles((theme) => ({
//   loaderRoot: {
//     width: "100%",
//     height: "100%",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//   },
// }));

const OpenVideoFile = ({ handleClose }) => {
  const dispatch = useDispatch();
  // const classes = useStyles();

  const onFilesSelected = (e) => {
    e.stopPropagation();
    const [videoFile] = e.target.files;
    // console.log("video opened triggered");

    dispatch(onSetVideoSrc(videoFile));
  };

  const btnRef = React.useRef();

  const handleMenuClick = React.useCallback((e) => {
    // Trigger the <Button>'s click event programmatically, so that the open file dialog is opened
    btnRef.current.click();
    handleClose();
  });

  return (
    <MenuItem onClick={handleMenuClick}>
      <ListItemIcon>
        <FolderOpen />
        <input
          style={{ display: "none" }}
          id="raised-button-file"
          // multiple
          accept="video/*"
          type="file"
          onChange={onFilesSelected}
        />
        <label htmlFor="raised-button-file">
          <Button
            ref={btnRef}
            variant="contained"
            color="secondary"
            component="span"
            style={{ display: "none" }}
          >
            Select Video
          </Button>
        </label>
      </ListItemIcon>
      <ListItemText primary="Select Video" />
    </MenuItem>
  );
};

export default OpenVideoFile;
