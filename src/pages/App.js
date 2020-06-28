import React, { useEffect, useRef, createRef, useCallback } from "react";
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
  const refsArray = useRef([]);
  refsArray.current = cues.map(() => createRef());
  useEffect(() => console.log("re-render"));
  let currentCueIndex = useRef(undefined);
  const vttTimelineRef = useRef();

  /** Cue AUTO-SCROLL: */
  let keepTime = useRef();
  const validateScroll = () => {
    console.log("Validating Scroll...");
    //run only if cue.lenght > 0 or if currentCueIndex !== cues.lenth -1
    let currentTime = playerRef.current.currentTime;
    // if (!currentCueIndex.current) currentCueIndex.current = 0;
    findCurrentCueIndex();
    if (!currentCueIndex.current) return;
    if (
      cues.length > 0 &&
      currentTime >= cues[currentCueIndex.current].startTime &&
      currentTime <= cues[currentCueIndex.current].endTime
    ) {
      scrollCues();
      if (currentCueIndex.current < cues.length - 1) currentCueIndex.current++;
    }
  };

  const onPlay = () => {
    // https://stackoverflow.com/questions/6685396/execute-the-setinterval-function-without-delay-the-first-time
    validateScroll();
    keepTime.current = setInterval(validateScroll, 1000);
  };

  const findCurrentCueIndex = () => {
    // Να βάλω το onSeek να παιρνει την scrollPositioν κατευθειαν απο το videoPlayerRef.current.currentTime;
    // και το ίδιο και στο onPlay (*φυσικά μονο για το οριζόντιο σκρολλ)
    if (cues.length > 0) {
      let minIndex = 0;
      let maxIndex = cues.length - 1;
      let midIndex = Math.floor((maxIndex - minIndex) / 2);
      let currentTime = playerRef.current.currentTime;
      currentCueIndex.current = undefined;
      console.log(`findCurrentCueIndex: ${currentTime}`);
      if (
        currentTime >= cues[minIndex].startTime &&
        currentTime <= cues[minIndex].endTime
      ) {
        currentCueIndex.current = minIndex;
        scrollCues();
        return;
      } else if (
        currentTime >= cues[maxIndex].startTime &&
        currentTime <= cues[maxIndex].endTime
      ) {
        currentCueIndex.current = maxIndex;
        scrollCues();
        return;
      }

      do {
        if (cues[midIndex].startTime >= currentTime) {
          maxIndex = midIndex;
          midIndex = minIndex + Math.floor((maxIndex - minIndex) / 2);
        } else {
          minIndex = midIndex;
          midIndex = minIndex + Math.floor((maxIndex - minIndex) / 2);
        }
      } while (maxIndex - minIndex > 3);

      for (let i = minIndex; i < maxIndex; i++) {
        if (
          currentTime >= cues[i].startTime &&
          currentTime <= cues[i].endTime
        ) {
          currentCueIndex.current = i;
        }
      }
      if (currentCueIndex.current) {
        scrollCues();
      }
    }
  };

  const scrollCues = () => {
    refsArray.current[currentCueIndex.current].current.scrollIntoView();
    let SCROLLPOSITION = cues[currentCueIndex.current].startTime * 200;
    vttTimelineRef.current.scrollTo({
      top: 0,
      left: SCROLLPOSITION,
      behavior: "smooth",
    });
  };

  const onSeek = () => findCurrentCueIndex();

  const onPause = () => {
    clearInterval(keepTime.current);
  };

  useEffect(
    (e) => {
      playerRef.current.addEventListener("seeked", onSeek);
      playerRef.current.addEventListener("play", onPlay);
      playerRef.current.addEventListener("pause", onPause);
      return () => {
        playerRef.current.removeEventListener("seeked", onSeek);
        playerRef.current.removeEventListener("play", onPlay);
        playerRef.current.removeEventListener("pause", onPause);
        if (!playerRef.current.paused) {
          onPause();
          // clearInterval(keepTime.current);
          onPlay();
        }
      };
    },
    [cues, onSeek, onPlay, onPause]
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
        <div className={classes.vttTimeline} ref={vttTimelineRef}>
          <VttTimeline />
        </div>
      </div>
    </>
  );
};

export default withRoot(App);

// fix:
// while onPlay is active a seek event is triggered -> scroll breaks (probably onplays fault)
// the above breaks if the user seeks on odd numbers eg 00:07 -> startTime:6 endTime:8 currentTime:8.93048
// that happens cause onPlay has a 1second timeout so when it executes the currentCueIndex is outdated

// debounce on vtteditor
// smth breaks if no cues exist
// useCallback on PlayFunk and SeekFuck
// variable naming handleScroll() keepTime -> timer
// refactor the for loop in the onSeek to a breakable loop
// with each new cue the whole thing re-renders making everything suuuuuuuuper slow

// Δεν μου αρέσει που εχω τοσο logic inside App.js , should I abstract it as a hook?
// There is a lot of Bloat in JSX some of it (Paper,Resizable) should be moved in the component
// WHAT THE HELL ARE THE MAGIC NUMBERS IN RESIZABLE
// Rename on Seek to something like getCurrentCueIndex ?
// onPlay disable addCue
// add redux devtools
