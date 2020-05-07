import React from "react";
import withRoot from "../withRoot";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { makeStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import VTTEditor from "../components/Editor/VTTEditor";
import Player from "../components/Player/Player";
import { CueProvider } from "../common/cue-context";
import { CuesProvider } from "../common/cues-context";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flex: 1,
    minHeight: 0,
    minWidth: 0,
    height: "100%",
  },
  drawer: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  player: {
    padding: 8,
    flex: 1,
    minHeight: 0,
    minWidth: 0,
  },
  test: {
    height: "100%;",
    display: "flex",
    flexDirection: "column",
  },
});

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.test}>
      <Header />
      <CuesProvider>
        <div className={classes.root}>
          <Paper square className={classes.drawer}>
            <VTTEditor />
          </Paper>
          <div className={classes.player}>
            <Player />
          </div>
        </div>
      </CuesProvider>
      <Footer />
    </div>
  );
};

export default withRoot(App);
