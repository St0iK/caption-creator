import React, { useEffect, useRef, createRef } from "react";
// import GridLayout from "react-grid-layout";
import useWindowSize from "../common/useWindowSize";
import withRoot from "../withRoot";
import Header from "../components/Header";
import { Paper, makeStyles } from "@material-ui/core/";
import VTTEditor from "../components/Editor/VTTEditor";
import VttTimeline from "../components/Player/VttTimeline";
import Player from "../components/Player/VideoPlayerWrapper";
import { Resizable } from "re-resizable";
import { useSelector } from "react-redux";

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
  resizableWrapper: {
    display: "flex",
    flexWrap: "wrap",
    flexFlow: "raw",
    justifyContent: "space-between",
    flex: 1,
    overflow: "hidden",
  },
  containerStyle: {
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
  },
  resizableStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "solid 1px #ddd",
    background: "#f0f0f0",
    margin: "4px",
  },
});

// const resizableStyle = {
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   border: "solid 1px #ddd",
//   background: "#f0f0f0",
//   margin: "4px",
// };

// const resizableWrapper = {
//   display: "flex",
//   flexWrap: "wrap",
//   flexFlow: "raw",
//   justifyContent: "space-between",
//   flex: 1,
//   overflow: "hidden",
// };

// const containerStyle = {
//   display: "flex",
//   minHeight: "100vh",
//   flexDirection: "column",
// };

const App = (props) => {
  const classes = useStyles();
  const size = useWindowSize();
  const playerRef = useRef();
  const cues = useSelector((state) => state.cues.cues);
  // console.log(cues);
  const refsArray = useRef([]);
  refsArray.current = cues.map(() => createRef());
  useEffect(() => console.log("re-render"));

  // console.log(refsArray);
  /** BRING THE SCROLL METHODS: */
  let keepTime;
  let currentCueIndex = useRef(undefined);

  const playFunk = () => {
    // console.log("play fired");
    // console.log(`currentTime: ${playerRef.current.currentTime}`);

    keepTime = setInterval(() => {
      let currentTime = playerRef.current.currentTime;
      // console.log(currentCueIndex);
      if (!currentCueIndex.current) currentCueIndex.current = 0;
      // console.log(cues[currentCueIndex.current]);
      console.log(
        `currentTime:${playerRef.current.currentTime}, currentCueIndex:${
          currentCueIndex.current
        }, startTime:${cues[currentCueIndex.current].startTime}`
      );
      if (
        cues.length > 0 &&
        currentTime >= cues[currentCueIndex.current].startTime &&
        currentTime <= cues[currentCueIndex.current].endTime
      ) {
        // console.log("current from 172 is " + currentCueIndex.current);
        refsArray.current[currentCueIndex.current].current.scrollIntoView({
          block: "end",
          behavior: "smooth",
        });
        if (currentCueIndex.current < cues.length - 1) {
          currentCueIndex.current++;
          // console.log("current from 172 is " + currentCueIndex.current);
        }
        // refsArray.current[currentCueIndex.current].current.scrollIntoView({
        //   block: "end",
        //   behavior: "smooth",
        // });
      }
    }, 1000);
  };

  const seekFunk = () => {
    if (cues.length > 0) {
      let minIndex = 0;
      let maxIndex = cues.length - 1;
      let midIndex = Math.floor((maxIndex - minIndex) / 2);
      console.log(
        `minIndex=${minIndex}, midIndex=${midIndex},maxIndex=${maxIndex}`
      );

      let currentTime = playerRef.current.currentTime;
      if (
        currentTime >= cues[minIndex].startTime &&
        currentTime <= cues[minIndex].endTime
      ) {
        currentCueIndex.current = minIndex;
        refsArray.current[currentCueIndex.current].current.scrollIntoView();
        console.log(
          `the index is the minIndex: ${currentCueIndex.current}, SCROLL(!)`
        );
        return;
      }
      if (
        currentTime >= cues[maxIndex].startTime &&
        currentTime <= cues[maxIndex].endTime
      ) {
        currentCueIndex.current = maxIndex;
        refsArray.current[currentCueIndex.current].current.scrollIntoView();
        console.log(
          `the index is the maxIndex: ${currentCueIndex.current}, SCROLL(!)`
        );
        return;
      }

      do {
        if (cues[midIndex].startTime >= currentTime) {
          maxIndex = midIndex;
          midIndex = minIndex + Math.floor((maxIndex - minIndex) / 2);
          console.log(
            `IF LOOP:minIndex=${minIndex}, midIndex=${midIndex},maxIndex=${maxIndex}`
          );
        } else {
          minIndex = midIndex;
          midIndex = minIndex + Math.floor((maxIndex - minIndex) / 2);
          console.log(
            `ELSE LOOP:minIndex=${minIndex}, midIndex=${midIndex},maxIndex=${maxIndex}`
          );
        }
      } while (maxIndex - minIndex > 3);
      console.log(
        `minIndex=${minIndex}, midIndex=${midIndex},maxIndex=${maxIndex}`
      );

      for (let i = minIndex; i < maxIndex; i++) {
        if (
          currentTime >= cues[i].startTime &&
          currentTime <= cues[i].endTime
        ) {
          currentCueIndex.current = i;
        }
      }
      if (currentCueIndex.current) {
        refsArray.current[currentCueIndex.current].current.scrollIntoView();
      }
      // console.log(currentCueIndex.current);
    }
  };

  useEffect(
    (e) => {
      playerRef.current.addEventListener("seeked", seekFunk);
      playerRef.current.addEventListener("play", playFunk);
      playerRef.current.addEventListener("pause", () =>
        clearInterval(keepTime)
      );
      return () => {
        playerRef.current.removeEventListener("seeked", seekFunk);
        playerRef.current.removeEventListener("play", playFunk);
      };
    },
    [cues, seekFunk]
  );

  return (
    <>
      <div className={classes.containerStyle}>
        <main
          style={{
            flex: "1",
          }}
        >
          <Header />

          <div className={classes.resizableWrapper}>
            <Resizable
              // style={resizableStyle}
              className={classes.resizableStyle}
              minWidth={400}
              minHeight={200}
              maxWidth={"98vw"}
              maxHeight={size.height - 80 - 150}
              grid={[10, 10]}
              defaultSize={{
                width: "60vw",
                height: "75vh",
              }}
            >
              <Paper square className={classes.cueEditorContainer}>
                <VTTEditor refsArray={refsArray} ref={refsArray} />
              </Paper>
            </Resizable>

            <Resizable
              // style={resizableStyle}
              className={classes.resizableStyle}
              minWidth={200}
              minHeight={200}
              maxWidth={"98vw"}
              maxHeight={size.height - 80 - 150}
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
                <Player ref={playerRef} />
              </Paper>
            </Resizable>
          </div>
        </main>
        <div className={classes.vttTimeline}>
          <VttTimeline />
        </div>
      </div>
    </>
  );
};

export default withRoot(App);
