import React, { useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import FabButton from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import CueEditor from "./Cue/CueEditor";
import { CueProvider } from "../../common/cue-context";
import { CuesContext } from "../../common/cues-context";

const VTTEditor = ({ classes }) => {
  const { cues, loading, onAddCue } = useContext(CuesContext);

  return (
    <div className={classes.root}>
      {cues.map((cue, index) => (
        <CueProvider cue={cue} cueIndex={index}>
          <CueEditor />
        </CueProvider>
      ))}
      <FabButton
        className={classes.fab}
        color="primary"
        aria-label="Add Cue"
        onClick={onAddCue}
      >
        <AddIcon />
      </FabButton>
    </div>
  );
};

const styles = (theme) => ({
  root: {
    position: "relative",
    flex: 1,
    width: 400,
    padding: 20,
  },
});

export default withStyles(styles)(VTTEditor);
