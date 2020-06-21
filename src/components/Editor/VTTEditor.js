import React, { forwardRef } from "react";
import { Fab, makeStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CueEditor from "./Cue/CueEditor";
import { useSelector, useDispatch } from "react-redux";
import { addCue } from "../../store/actions/cueActions";

const useStyles = makeStyles((theme) => ({
  VTTEditorContainer: {
    flex: 1,
    padding: 10,
    overflowY: "scroll",
  },
  fab: {
    position: "absolute",
    bottom: "5%",
    right: "5%",
  },
}));

const VTTEditor = forwardRef((props, ref) => {
  const cues = useSelector((state) => state.cues.cues);
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <div className={classes.VTTEditorContainer}>
      {cues.map((cue, index) => (
        <CueEditor
          cue={cue}
          cueIndex={index}
          key={cue.id}
          ref={ref.current[index]}
        />
      ))}
      <Fab
        className={classes.fab}
        color="primary"
        aria-label="Add Cue"
        onClick={() => dispatch(addCue())}
      >
        <AddIcon />
      </Fab>
    </div>
  );
});

export default VTTEditor;
