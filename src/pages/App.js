import React from "react";
import withRoot from "../withRoot";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { makeStyles } from '@material-ui/styles';
import Paper from "@material-ui/core/Paper";
import VTTEditor from "../components/Editor/VTTEditor";
import Player from "../components/Player/Player";

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flex: 1,
        minHeight: 0,
        minWidth: 0,
    },
    drawer: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    player: {
        padding: 8,
        flex: 1,
        minHeight: 0,
        minWidth: 0,
    },
});

const App = () => {
  const classes = useStyles();

  return (
      <>
      <Header/>
      <div className={classes.root}>
          <Paper square className={classes.drawer}>
              <VTTEditor />
          </Paper>
          <div className={classes.player}>
              <Player />
          </div>

      </div>
    <Footer/>
    </>
  );
};

export default withRoot(App);


