import React, { useContext } from "react";
import { Fab, makeStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CueEditor from "./Cue/CueEditor";
import { CueProvider } from "../../common/cue-context";
import { CuesContext } from "../../common/cues-context";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    width: 400,
    padding: 10,
    marginBottom: "5rem",
  },
  fab: {
    position: "absolute",
    left: "300px",
    top: "85%",
  },
}));

const VTTEditor = () => {
  const { cues, loading, onAddCue } = useContext(CuesContext);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {cues.map((cue, index) => (
        // WARNING CHANGE key={index} to key={something unique, preferably an id}
        <CueProvider cue={cue} cueIndex={index} key={index}>
          <CueEditor />
        </CueProvider>
      ))}
      <Fab
        className={classes.fab}
        color="primary"
        aria-label="Add Cue"
        onClick={onAddCue}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default VTTEditor;
