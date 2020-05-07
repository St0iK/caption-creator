import React, { useContext, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid, TextField } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import TimingInput from "./TimingInput";
import { CueContext } from "../../../common/cue-context";

const CueEditor = ({ classes }) => {
  const {
    cue,
    onChangeCueStart,
    onChangeCueEnd,
    onChangeCueText,
    onRemoveCue,
  } = React.useContext(CueContext);
  const [text, setText] = useState(cue.text);

  const onChangeText = (e) => {
    setText(e.target.value);
  };

  const onChangeStartTime = (e) => {
    onChangeCueStart(parseFloat(e.target.value));
    console.log(e.target.value);
  };

  const onChangeEndTime = (e) => {
    onChangeCueEnd(parseFloat(e.target.value));
  };

  const onChangeTimeSpan = (e) => {
    onChangeCueEnd(cue.startTime + parseFloat(e.target.value));
  };

  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid
        container
        item
        alignItems="center"
        spacing={1}
        wrap="nowrap"
        justify="space-between"
      >
        <Grid item>
          <TimingInput
            variant="outlined"
            label="Start Time"
            value={cue.startTime}
            onChange={onChangeStartTime}
          />
        </Grid>
        <Grid item>
          <TimingInput
            variant="outlined"
            label="Show For"
            value={cue.endTime - cue.startTime}
            onChange={onChangeTimeSpan}
          />
        </Grid>
        <Grid item>
          <TimingInput
            variant="outlined"
            label="End Time"
            value={cue.endTime}
            onChange={onChangeEndTime}
          />
        </Grid>
        <Grid item>
          <IconButton aria-label="Delete" edge="end" onClick={onRemoveCue}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          fullWidth
          multiline
          rows="2"
          label="Caption text"
          value={text}
          onChange={onChangeText}
          placeholder="Enter your caption here..."
        />
      </Grid>
    </Grid>
  );
};

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    padding: 5,
    marginBottom: 10,
  },
  grow: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
  },
  item: {
    padding: 5,
    fontSize: 6,
  },
  icon: {
    // marginRight: theme.spacing.unit,
    color: "green",
    fontSize: 45,
  },
  mobile: {
    display: "none",
  },
  picture: {
    height: "50px",
    borderRadius: "90%",
    // marginRight: theme.spacing.unit * 2,
  },
});

export default withStyles(styles)(CueEditor);
