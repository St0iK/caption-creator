import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import VttTimeline from "./VttTimeline";
import ReactPlayer from "react-player";

const useStyles = makeStyles({
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
const Player = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.videoContainer}>
        <div className={classes.video}>
          <ReactPlayer
            url="https://www.dropbox.com/s/8zw5wq5ysa7o3di/goodCatBadCat.mp4?dl=0"
            playing
            controls={true}
          />
        </div>
      </div>
      <div className={classes.vttTimeline}>
        <VttTimeline />
      </div>
    </div>
  );
};

export default Player;
