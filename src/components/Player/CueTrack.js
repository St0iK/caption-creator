import * as React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import { CuesContext } from "../../common/cues-context";
import { CueProvider } from "../../common/cue-context";
import CueEditor from "../Editor/Cue/CueEditor";
import CueHandle from "./CueHandle";

const useStyles = makeStyles({
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
});

CueTrack.propTypes = {};

export default function CueTrack() {
  const { cues } = React.useContext(CuesContext);
  const classes = useStyles();

  return (
    <div className={classes.cueContainer}>
      {cues.map((cue, index) => (
        <CueProvider cue={cue} cueIndex={index}>
          <CueHandle key={index}>
            <div className={classes.cueContent}>
              <Typography color="inherit" variant="h5" noWrap>
                {cue.text}
              </Typography>
            </div>
          </CueHandle>
        </CueProvider>
      ))}
    </div>
  );
}
