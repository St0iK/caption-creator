import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { CuesContext } from "../../common/cues-context";
import { CueProvider } from "../../common/cue-context";
import CueEditor from "../Editor/Cue/CueEditor";
import { formatSeconds } from "../../services/timing";
import { useEffect, useState } from "react";
import CueTrack from "./CueTrack";
import TimeTicks from "./TimeTicks";
import ZoomContainer from "../ZoomContainer";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  ticks: {
    zIndex: 3,
    height: 20,
    boxShadow: "0 1px 5px rgba(0, 0, 0, 0.3)",
  },
  trackRoot: {
    position: "relative",
    flex: 1,
    minHeight: 0,
  },
  audioTrack: {
    zIndex: 1,
    height: "100%",
  },
  cueTrack: {
    zIndex: 2,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  timeTicks: {
    position: "absolute",
    top: 0,
    left: 0,
  },
});

VttTimeline.propTypes = {};

export default function VttTimeline() {
  const classes = useStyles();
  const { cues } = React.useContext(CuesContext);
  const [width, setWidth] = useState(0);

  // run when the cues change
  useEffect(() => {
    if (cues.length) {
      const lastCue = cues[cues.length - 1];
      setWidth(lastCue.endTime * 200);
    }
  }, [cues]);

  return (
    <ZoomContainer>
      <div className={classes.root}>
        <div className={classes.ticks}>
          <TimeTicks />
        </div>
        <div className={classes.trackRoot}>
          <CueTrack />
        </div>
      </div>
    </ZoomContainer>
  );
}
