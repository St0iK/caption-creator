import * as React from 'react';
import { makeStyles } from '@material-ui/styles';
import {CuesContext} from "../../common/cues-context";
import {CueProvider} from "../../common/cue-context";
import CueEditor from "../Editor/Cue/CueEditor";

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  ticks: {
    zIndex: 3,
    height: 20,
    boxShadow: '0 1px 5px rgba(0, 0, 0, 0.3)',
  },
  trackRoot: {
    position: 'relative',
    flex: 1,
    // flex children won't shrink beyond their content. wavesurfer inserts a fixed height
    //   div that makes a scrollbar appear if we don't tell trackRoot its allowed to shrink as far as it wants
    minHeight: 0,
  },
  audioTrack: {
    zIndex: 1,
    height: '100%',
  },
  cueTrack: {
    zIndex: 2,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  timeTicks: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

VttTimeline.propTypes = {};

export default function VttTimeline() {
  const classes = useStyles();
  const { cues } = React.useContext(CuesContext);

  return (
      <div className={classes.root}>
        <div className={classes.ticks}>
          <div>TimeTicks</div>
          {
            cues.map((cue, index) => (
              console.log(cue)
            ))
          }
        </div>
        <div className={classes.trackRoot}>
          {/*<div className={classes.audioTrack}>*/}
          {/*  <div>AudioTrack</div>*/}
          {/*</div>*/}
          {/*<div className={classes.cueTrack}>*/}
          {/*  <div>CueTrack</div>*/}
          {/*</div>*/}
        </div>
      </div>
  );
}
