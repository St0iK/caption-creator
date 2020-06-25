import React, { useState } from "react";
import withRoot from "../withRoot";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Paper, makeStyles } from "@material-ui/core/";
import VTTEditor from "../components/Editor/VTTEditor";
import Player from "../components/Player/Player";
import axios from 'axios';
import { getCuesFromWords } from '../services/VttGenerator';
import { FilePond, registerPlugin } from "react-filepond"
import "filepond/dist/filepond.min.css"
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation"
import FilePondPluginImagePreview from "filepond-plugin-image-preview"
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"
import { useSelector, useDispatch } from "react-redux";
import { onChangeCues } from "../store/actions/cueActions";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const useStyles = makeStyles({
  root: {
    display: "flex",
    flex: 1,
    minHeight: 0,
    minWidth: 0,
    height: "100%",
    color: '#172c66'
  },
  drawer: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    overflowY: "scroll",
    backgroundColor: "#fef6e4",
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
    backgroundColor: "#fef6e4"
  },
});

const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.test}>
      <Header />
      <div className={classes.root}>
        <Paper square className={classes.drawer}>
          <VTTEditor />
        </Paper>
        <div className={classes.player}>
          <Player />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default withRoot(App);
