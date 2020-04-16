import * as React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import { CuesContext } from "../../common/cues-context";
import { CueProvider } from "../../common/cue-context";
import CueHandle from "./CueHandle";

const useStyles = makeStyles({
  root: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: '#616161',
  },
  cueContainer: {
    position: "relative",
    height: "100%",
    color: "white",
  },
  cueContent: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    padding: 30,
    userSelect: "none",
  },
  content: {
    height: '100%',
  },
  scrollContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

CueTrack.propTypes = {};

export default function CueTrack() {
  const classes = useStyles();
  const { cues } = React.useContext(CuesContext);
  const getCueDuration = (cues) => {
    if (cues && cues.length) {
      return cues[cues.length - 1].endTime;
    }
  }

  const duration = getCueDuration(cues);
  const [pixelsPerSec] = React.useState(200);
  const [zoomContainerRef, setZoomContainerRef] = React.useState();
  const [zoomContainerRect, setZoomContainerRect] = React.useState({});
  const width = Number.isFinite(duration) ? Math.round(pixelsPerSec * duration) : '100%';

  React.useLayoutEffect(() => {
    if (zoomContainerRef) {
      setZoomContainerRect(zoomContainerRef.getBoundingClientRect());
    }
  }, [zoomContainerRef, width]);

  return (
    <div className={classes.root}>
      <div className={classes.scrollContainer}>
        <div ref={setZoomContainerRef} className={classes.container} style={{ width }}>
          <div className={classes.cueContainer}>
            {cues.map((cue, index) => (
              <CueProvider cue={cue} cueIndex={index}>
                <CueHandle key={index} pixelsPerSec={pixelsPerSec} zoomContainerRect={zoomContainerRect}>
                  <div className={classes.cueContent}>
                    <Typography color="inherit" variant="h5" noWrap>
                      {cue.text}
                    </Typography>
                  </div>
                </CueHandle>
              </CueProvider>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
