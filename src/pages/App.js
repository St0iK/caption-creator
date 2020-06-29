import React from "react";
import withRoot from "../withRoot";
import Header from "../components/Header";
import { makeStyles } from "@material-ui/core/";
import VTTEditor from "../components/Editor/VTTEditor";
import VttTimeline from "../components/Player/VttTimeline";
import Player from "../components/Player/VideoPlayerWrapper";
import useAutoScroll from "../common/useAutoScroll";

const useStyles = makeStyles({
  root: {
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
  },
  vttTimeline: {
    flex: 1,
    maxHeight: 300,
    minHeight: 150,
    overflowX: "scroll",
    marginTop: "auto",
  },
  resizableWrapper: {
    display: "flex",
    flexWrap: "wrap",
    flexFlow: "raw",
    justifyContent: "space-between",
    flex: 1,
    overflow: "hidden",
  },
  container: {
    width: "100%",
    display: "flex",
    overflow: "hidden",
  },
});

const App = (props) => {
  const classes = useStyles();
  const [cueRefArray, playerRef, vttTimelineRef] = useAutoScroll();

  return (
    <>
      <div className={classes.root}>
        <div style={{ flex: "1" }}>
          <Header />
          <div className={classes.resizableWrapper}>
            <main className={classes.container}>
              <VTTEditor ref={cueRefArray} />
              <Player ref={playerRef} />
            </main>
          </div>
        </div>
        <div className={classes.vttTimeline} ref={vttTimelineRef}>
          <VttTimeline />
        </div>
      </div>
    </>
  );
};

export default withRoot(App);
