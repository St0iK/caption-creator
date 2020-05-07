import React, { useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import VttTimeline from "./VttTimeline";
import ReactPlayerLoader from "@brightcove/react-player-loader";
import CueTrack from "./CueTrack";


const Player = ({ classes }) => {
  return (
    <div className={classes.root}>
      <div className={classes.videoContainer}>
        <div className={classes.video}>
          <ReactPlayerLoader
            accountId={"1752604059001"}
            videoId={"5819230967001"}
            className={classes.video}
          />
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
  },
});

export default withStyles(styles)(Player);
