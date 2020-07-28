import React from "react";
import {
  MenuItem,
  ListItemIcon,
  ListItemText,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import {
  Delete as DeleteIcon,
  WarningRounded as WarningRoundedIcon,
} from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { onChangeCues } from "../../../../store/actions/cueActions";

const ClearCues = ({ handleClose }) => {
  const dispatch = useDispatch();

  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleClearCues = () => {
    dispatch(onChangeCues());
    handleCloseDialog();
    handleClose();
  };

  return (
    <>
      <MenuItem onClick={handleOpenDialog}>
        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        <ListItemText primary="Delete all cues" />
      </MenuItem>
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="confirm-delete-cues"
        aria-describedby="confirm-delete-cues-description"
      >
        <DialogTitle id="confirm-delete-cues">
          Are you sure you want to Delete All Cues?
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="confirm-delete-cues-description"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <WarningRoundedIcon
              fontSize="large"
              style={{ color: "#caaa10", margin: "0.5rem" }}
            />
            Warning! this action cannot be reversed - all unsaved cues will be
            deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClearCues} color="primary" autoFocus>
            Delete Cues
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ClearCues;
