import React from "react";
import { makeStyles } from "@material-ui/styles";
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
});

VttTimeline.propTypes = {};

export default function VttTimeline() {
  const classes = useStyles();

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
