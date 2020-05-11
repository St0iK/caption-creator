import React, { useState, useCallback, useEffect } from "react";
import { Grid, TextField, makeStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import TimingInput from "./TimingInput";
import {
  removeCue,
  onChangeCue,
  onChangeCueText,
} from "../../../store/actions/cueActions";
import { useDispatch } from "react-redux";
import { debounce } from "lodash";

const CueEditor = ({ cue, cueIndex }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [text, setText] = useState(cue.text);

  // https://medium.com/@rajeshnaroth/using-throttle-and-debounce-in-a-react-function-component-5489fc3461b3
  // https://codesandbox.io/s/functional-component-debounce-l543l?file=/src/index.js
  const updateCueText = (text) => dispatch(onChangeCueText(cueIndex, text));
  const debounceTextUpdate = useCallback(
    debounce((text) => updateCueText(text), 400),
    []
  );

  const handleTextAreaBlure = () => {
    debounceTextUpdate.flush();
  };

  useEffect(() => {
    // cancel debounceTextUpdate on Unmount
    return () => debounceTextUpdate.cancel();
  }, []);

  const onChangeText = (e) => {
    setText(e.target.value);
    debounceTextUpdate(e.target.value);
  };

  const onChangeStartTime = (e) => {
    const newStartTime = parseFloat(e.target.value);
    const newCue = new VTTCue(newStartTime, cue.endTime, cue.text);
    dispatch(onChangeCue(newCue, cueIndex));
  };

  const onChangeTimeSpan = (e) => {
    const newEndTime = cue.startTime + parseFloat(e.target.value);
    const newCue = new VTTCue(cue.startTime, newEndTime, cue.text);
    dispatch(onChangeCue(newCue, cueIndex));
  };

  const onChangeEndTime = (e) => {
    const newEndTime = parseFloat(e.target.value);
    const newCue = new VTTCue(cue.startTime, newEndTime, cue.text);
    dispatch(onChangeCue(newCue, cueIndex));
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
          <IconButton
            aria-label="Delete"
            edge="end"
            size="small"
            onClick={() => dispatch(removeCue(cueIndex))}
          >
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
          onBlur={handleTextAreaBlure}
          placeholder="Enter your caption here..."
        />
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 5,
    marginBottom: 10,
  },
  inputContainer: {
    display: "flex",
    width: "100%",
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
    color: "green",
    fontSize: 45,
  },
  mobile: {
    display: "none",
  },
  picture: {
    height: "50px",
    borderRadius: "90%",
  },
}));

export default CueEditor;
