import React, { useState } from "react";
import withRoot from "../withRoot";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Paper, makeStyles } from "@material-ui/core/";
import VTTEditor from "../components/Editor/VTTEditor";
import Player from "../components/Player/Player";
import axios from 'axios';

import { FilePond, registerPlugin } from "react-filepond"
import "filepond/dist/filepond.min.css"
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation"
import FilePondPluginImagePreview from "filepond-plugin-image-preview"
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

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
    overflowY: "scroll",
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


  const [imgCollection, setImgCollection] = useState('')

  const onFileChange = (files) => {
    let items = files.map(fileItem => fileItem.file)
    // @ts-ignore
    setImgCollection([...imgCollection, items])
  }

  const onSubmit = (e) => {
    e.preventDefault()

    var formData = new FormData()

    for (let img in imgCollection[0]) {
      formData.append('imgCollection', imgCollection[0][img])
    }

    formData.append('folder', 'folder-name')

    console.log({ formData });
    // axios.post(`${process.env.REACT_APP_API_ENDPOINT}/`, formData, {
    // }).then(res => {
    //   console.log(res.data)
    // })
  }


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


      <form onSubmit={onSubmit}>
        <div className="form-group">
          <button className="btn btn-primary" type="submit">Upload</button>
        </div>
        <div className="filepond-wrapper">
          <FilePond
            files={imgCollection}
            allowMultiple={true}
            server={null}
            instantUpload={false}
            onupdatefiles={(fileItems) => onFileChange(fileItems)}>
          </FilePond>
        </div>
      </form>


    </div>
  );
};

export default withRoot(App);
