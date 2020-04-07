import React, {useContext, useState} from "react";
import {withStyles} from "@material-ui/core/styles";
import FabButton from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CueEditor from "./Cue/CueEditor";


const VTTEditor = ({classes}) => {
  const mockQueues = [
    new VTTCue(0, 2, '')
  ];

  const [cues, setCues] = useState(mockQueues);

  const onAddCue = () => {
    console.log('Add a new Cue');
    const newCues = cues.concat(new VTTCue(0, 2, ''));
    setCues(newCues);
  }
  return (
    <div className={classes.root}>
      {
        cues.map((cue, index) => (
          <CueEditor cue={cue}/>
        ))
      }

      <FabButton className={classes.fab} color="primary" aria-label="Add Cue" onClick={onAddCue}>
        <AddIcon/>
      </FabButton>
    </div>
  );
};

const styles = theme => ({
  root: {
    position: 'relative',
    flex: 1,
    width: 400,
    padding: 20
  }
});

export default withStyles(styles)(VTTEditor);
