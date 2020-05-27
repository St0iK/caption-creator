import React from "react";
import GridLayout from "react-grid-layout";
import useWindowSize from "../common/useWindowSize";
import withRoot from "../withRoot";
import Header from "../components/Header";
import { Paper, makeStyles } from "@material-ui/core/";
import VTTEditor from "../components/Editor/VTTEditor";
import VttTimeline from "../components/Player/VttTimeline";
import Player from "../components/Player/VideoPlayerWrapper";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "calc(100vh - 64px)",
  },
  cueEditorContainer: {
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
});

const App = (props) => {
  const classes = useStyles();
  const size = useWindowSize();
  // layout is an array of objects, see the demo for more complete usage
  const initialLayout = [
    // { i: "cue-editor", x: 0, y: 0, w: 24, h: 1, maxH: 6.5 }, //stacked horizontally
    // { i: "player", x: 0, y: 1, w: 24, h: 5, maxH: 6.5 },     //stacked horizontally
    {
      i: "cue-editor",
      x: 0,
      y: 0,
      w: 14,
      h: 5,
      maxH: 6.2,
      minW: 8,
      // isDraggable: false,
    }, //split screen
    { i: "player", x: 14, y: 0, w: 10, h: 5, maxH: 6.2 }, //split screen
  ];

  const [layout, setLayout] = React.useState(initialLayout);

  const onResize = (layout, oldItem, newItem) => {
    layout.forEach((item) => {
      if (item.h + item.y > item.maxH) {
        console.log("!!!!!!!!something breaks");

        setLayout((prevState) => {
          return layout.map((item) =>
            item.i === newItem.i
              ? {
                  ...oldItem,
                  h:
                    oldItem.h > 1.5
                      ? oldItem.h - Math.random() * 0.0001
                      : oldItem.h + Math.random() * 0.0001,
                }
              : item
          );
        });
      }
    });
  };

  const handleDragStop = (layout, oldItem, newItem) => {
    layout.forEach((item) => {
      if (item.h + item.y > item.maxH) {
        console.log("!!!!!!!!something breaks");
        setLayout((prevState) => {
          return layout.map((item) =>
            item.i === oldItem.i
              ? {
                  ...oldItem,
                  h:
                    oldItem.h > 1.5
                      ? oldItem.h - Math.random() * 0.0001
                      : oldItem.h + Math.random() * 0.0001,
                }
              : item
          );
        });
      }
    });
  };

  const changeLayout = () => {
    /** THIS IS MADNESS!!!
     * I have absolutely no clue why this happens but if Math.random() is removed the layout will not be reset
     * even though the state changes, and the component updates the UI remains the same,
     * Most probable scenario is that the layout prop of <GridLayout/> from "react-grid-layout" under the hood
     * memoizes the values of the layout thus, preventing any 'unnecessary' rerenders
     */

    const resetedLayout = [
      {
        i: "cue-editor",
        x: 0,
        y: 0,
        w: 12 - Math.random() * 0.01,
        h: 2,
        maxH: 6.5,
        minW: 8,
      }, //split screen
      { i: "player", x: 12, y: 0, w: 12, h: 2, maxH: 6.5 }, //split screen
    ];
    setLayout([...resetedLayout]);
    // setLayout((pervState) => {
    //   return [...pervState];
    // });
  };

  React.useEffect(() => {
    console.log(layout);
  }, [layout]);

  return (
    <>
      <Header />
      <div
        className={classes.root}
        style={{
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <GridLayout
          // onLayoutChange={()=>{}} //use this event to save the layout in local storage
          onResizeStop={(layout, oldItem, newItem) =>
            onResize(layout, oldItem, newItem)
          }
          className="layout"
          layout={layout}
          cols={24}
          rowHeight={100}
          // compactType="horizontal"
          width={size.width - 20}
          onDragStop={(layout, oldItem, newItem) =>
            handleDragStop(layout, oldItem, newItem)
          }
        >
          <Paper key="cue-editor" square className={classes.cueEditorContainer}>
            <VTTEditor />
          </Paper>
          <Paper
            key="player"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Player />
          </Paper>
        </GridLayout>
        <div className={classes.vttTimeline}>
          <VttTimeline />
        </div>
      </div>
    </>
  );
};

export default withRoot(App);
