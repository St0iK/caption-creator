import React from "react";
import { withStyles } from "@material-ui/core/styles";
import VttTimeline from "./VttTimeline";
import Video from "./Video";

const Player = ({ classes }) => {
  return (
    <div className={classes.root}>
      <div className={classes.videoContainer}>
        <div className={classes.video}>
          <Video />
        </div>
      </div>
      <div className={classes.vttTimeline}>
        <VttTimeline />
      </div>
    </div>
  );
};

const styles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  videoContainer: {
    display: "flex",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "black",
    minHeight: 0,
    minWidth: 0,
  },
  video: {
    height: "100%",
    maxWidth: 1000,
  },
  vttTimeline: {
    flex: 1,
    maxHeight: 300,
    minHeight: 100,
    overflowX: "scroll",
  },
});

export default withStyles(styles)(Player);
