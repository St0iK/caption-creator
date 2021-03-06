import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { formatSeconds } from "../../services/timing";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  ticks: {
    zIndex: 3,
    height: 20,
    boxShadow: "0 1px 5px rgba(0, 0, 0, 0.3)",
  },
  trackRoot: {
    position: "relative",
    flex: 1,
    minHeight: 0,
  },
  audioTrack: {
    zIndex: 1,
    height: "100%",
  },
  cueTrack: {
    zIndex: 2,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  timeTicks: {
    position: "absolute",
    top: 0,
    left: 0,
  },
});

TimeTicks.propTypes = {};

export default function TimeTicks() {
  const classes = useStyles();
  const cues = useSelector((state) => state.cues.cues);
  const [width, setWidth] = useState(0);

  // run when the cues change
  useEffect(() => {
    if (cues.length) {
      const lastCue = cues[cues.length - 1];
      setWidth(lastCue.endTime * 200);
    }
  }, [cues]);

  const height = 20;
  const pixelsPerTick = 200;
  return (
    <div className={classes.root}>
      <SvgSegment
        key="final"
        width={width}
        height={height}
        pixelsPerTick={pixelsPerTick}
      />
    </div>
  );

  function SvgSegment({ width, height, pixelsPerTick, ...props }) {
    // one tick per second, and add one so it overlaps with the starting tick of the next svg
    const numTicks = Math.ceil(width / pixelsPerTick) + 1;
    const ticks = [];

    for (let i = 0; i < numTicks; i++) {
      const x = i * pixelsPerTick;
      ticks.push(
        <Tick key={i} x={x} height={height} text={formatSeconds(i)} />
      );
    }

    return (
      <svg
        {...props}
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100%" height="100%" fill="#3f51b5" />
        {ticks}
      </svg>
    );
  }

  function Tick({ x, height, text }) {
    const textY = (height + 12) / 2;
    return (
      <React.Fragment>
        <line x1={x} x2={x} y1="0" y2={height} stroke="white" strokeWidth="2" />
        <text x={x + 4} y={textY} fontSize={12} textAnchor="start" fill="white">
          {text}
        </text>
      </React.Fragment>
    );
  }
}