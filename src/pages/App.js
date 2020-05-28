import React from "react";
import GridLayout from "react-grid-layout";
import useWindowSize from "../common/useWindowSize";
import withRoot from "../withRoot";
import Header from "../components/Header";
import { Paper, makeStyles } from "@material-ui/core/";
import VTTEditor from "../components/Editor/VTTEditor";
import VttTimeline from "../components/Player/VttTimeline";
import Player from "../components/Player/VideoPlayerWrapper";
import { Resizable } from "re-resizable";

const useStyles = makeStyles({
  appWrapper: {
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
  },
  root: {
    display: "flex",
    flexDirection: "column",
    height: "calc(100vh - 64px)",
    flex: "1",
  },
  cueEditorContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
  player: {
    padding: 8,
    flex: 1,
    minHeight: 0,
    minWidth: 0,
  },
  gridItem: {
    backgroundColor: "#cecdcd",
  },
  vttTimeline: {
    flex: 1,
    maxHeight: 300,
    minHeight: 150,
    overflowX: "scroll",
    marginTop: "auto",
  },
  video: {
    height: "100%",
    maxWidth: 1000,
  },
  videoContainer: {
    display: "flex",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "black",
    minHeight: 0,
    minWidth: 0,
  },
  //
  resizableWrapperRoot: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "solid 1px #ddd",
    background: "#f0f0f0",
    margin: "4px",
  },
  wrapperStyle: {
    display: "flex",
    flexDirection: "column",
  },
  resizableWrapper: {
    display: "flex",
    flexWrap: "wrap",
    flexFlow: "raw",
    justifyContent: "space-between",
    flex: 1,
  },
  footerStyle: {
    width: "100%",
    minHeight: "5vh",
    backgroundColor: "grey",
  },
});

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f0",
  margin: "4px",
};

const wrapperStyle = {
  display: "flex",
  flexDirection: "column",
  // margin:'auto'
};

const resizableWrapper = {
  display: "flex",
  flexWrap: "wrap",
  flexFlow: "raw",
  justifyContent: "space-between",
  flex: 1,
  // maxWidth: "98.5vw",
  overflow: "hidden",
};

const footerStyle = {
  width: "100%",
  minHeight: "64px",
  backgroundColor: "grey",
};

const containerStyle = {
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
};

const App = (props) => {
  const classes = useStyles();
  const size = useWindowSize();
  return (
    <>
      <div style={containerStyle}>
        <main
          style={{
            flex: "1",
          }}
        >
          <Header />

          <div style={resizableWrapper}>
            <Resizable
              style={style}
              minWidth={400}
              minHeight={200}
              maxWidth={"98vw"}
              // maxHeight={"93vh"}
              maxHeight={size.height - 67 - 150}
              //window.height - header - vttCueEditor - margins
              grid={[10, 10]}
              defaultSize={{
                width: "60vw",
                height: "75vh",
              }}
            >
              <Paper square className={classes.cueEditorContainer}>
                <VTTEditor />
              </Paper>
            </Resizable>
            <Resizable
              style={style}
              minWidth={200}
              minHeight={200}
              maxWidth={"98vw"}
              // maxHeight={"calc(94vh - 64px)"}
              // maxHeight={"94vh"}
              maxHeight={size.height - 67 - 150}
              grid={[10, 10]}
              defaultSize={{
                width: "38vw",
                height: "75vh",
              }}
            >
              <Paper
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Player />
              </Paper>
            </Resizable>
          </div>
        </main>
        <div className={classes.vttTimeline}>
          <VttTimeline />
        </div>
        {/* <footer style={footerStyle} /> */}
      </div>
    </>
  );
};

export default withRoot(App);
