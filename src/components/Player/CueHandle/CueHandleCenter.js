import * as React from "react";
import clsx from "clsx";
import * as PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { CueContext } from "../../../common/cue-context";
import useDragging from "../../../common/use-dragging.hook";

const useStyles = makeStyles({
  root: {
    opacity: 0,
    "&:hover": {
      opacity: 0.05,
    },
  },
});

CueHandleCenter.propTypes = {
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

function CueHandleCenter({ onChange, className }) {
  const classes = useStyles();
  const { onDeltaCue } = React.useContext(CueContext);
  const [handleRef, setHandleRef] = React.useState();
  const startPosRef = React.useRef(0);
  const prevPosRef = React.useRef(0);
  const pixelsPerSec = 200;

  const onDragStart = React.useCallback((e) => {
    startPosRef.current = e.clientX;
    prevPosRef.current = e.clientX;
  }, []);

  const onDragging = React.useCallback(
    (e) => {
      onChange(e.clientX - prevPosRef.current);
      prevPosRef.current = e.clientX;
    },
    [onChange]
  );

  const onDragEnd = React.useCallback(
    (e) => {
      const d = (e.clientX - startPosRef.current) / pixelsPerSec;
      onDeltaCue({ startDelta: d, endDelta: d });
    },
    [pixelsPerSec, onDeltaCue]
  );

  useDragging(handleRef, { onDragStart, onDragging, onDragEnd });

  return <div ref={setHandleRef} className={clsx(classes.root, className)} />;
}

export default React.memo(CueHandleCenter);
