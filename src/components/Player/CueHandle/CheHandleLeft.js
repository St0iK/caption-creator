import React from "react";
import clsx from "clsx";
import * as PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import useDragging from "../../../common/use-dragging.hook";
import { useDispatch } from "react-redux";
import { onDeltaChange } from "../../../store/actions/cueActions";

const useStyles = makeStyles({
  root: {
    "&:hover div": {
      backgroundColor: "orange",
    },
  },
  borderLine: {
    height: "100%",
    width: 4,
    margin: "auto",
    backgroundColor: "white",
  },
});

CueHandleLeft.propTypes = {
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

function CueHandleLeft({ onChange, className, cueIndex, cue }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [handleRef, setHandleRef] = React.useState();
  const pixelsPerSec = 200;

  const startPosRef = React.useRef(0);
  const prevPosRef = React.useRef(0);
  const dragThreshold = React.useRef(0);

  const onDragStart = React.useCallback(
    (e) => {
      startPosRef.current = e.clientX;
      prevPosRef.current = e.clientX;
      dragThreshold.current =
        -50 + e.clientX + (cue.endTime - cue.startTime) * pixelsPerSec;
    },
    [cue]
  );

  const onDragging = React.useCallback(
    (e) => {
      if (e.clientX >= dragThreshold.current) {
        onChange(0);
        prevPosRef.current = e.clientX;
      } else {
        onChange(e.clientX - prevPosRef.current);
        prevPosRef.current = e.clientX;
      }
    },
    [onChange]
  );

  const onDragEnd = React.useCallback(
    (e) => {
      const startDelta = (e.clientX - startPosRef.current) / pixelsPerSec;
      if (e.clientX < dragThreshold.current) {
        dispatch(onDeltaChange(startDelta, 0, cueIndex));
      } else {
        const threshold =
          (dragThreshold.current - startPosRef.current) / pixelsPerSec;
        dispatch(onDeltaChange(threshold, 0, cueIndex));
      }
    },
    [pixelsPerSec, onDeltaChange, cueIndex]
  );

  useDragging(handleRef, { onDragStart, onDragging, onDragEnd });

  return (
    <div ref={setHandleRef} className={clsx(classes.root, className)}>
      <div className={classes.borderLine} />
    </div>
  );
}

export default React.memo(CueHandleLeft);
