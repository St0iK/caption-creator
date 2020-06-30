import React, { forwardRef } from "react";
import ReactResizeDetector from "react-resize-detector";
import { Paper } from "@material-ui/core";
import { Resizable } from "re-resizable";
import useWindowSize from "../../common/useWindowSize";
import VideoPlayer from './VideoPlayer'

const HEADER_AND_TIMELINE_HEIGHT = -80 - 150;

const style2 = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid rgb(221, 221, 221)",
  background: "rgb(240, 240, 240)",
  width: "100%",
  height: "100%",
  minWidth: "200px",
};

const VideoPlayerWrapper = forwardRef((props, ref) => {
  const size = useWindowSize();

  return (
    <Resizable
      enable={{
        top: false,
        right: false,
        bottom: false,
        left: true,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
      maxWidth="65vw"
      minWidth={400}
      defaultSize={{
        width: "60vw",
        height: "75vh",
      }}
      maxHeight={size.height - HEADER_AND_TIMELINE_HEIGHT}
    >
      <Paper style={style2}>
        <ReactResizeDetector handleWidth handleHeight>
          {({ width, height }) => (
            <div>
              <VideoPlayer
                width={width || 200}
                height={height || 200}
              />
            </div>
          )}
        </ReactResizeDetector>
      </Paper>
    </Resizable>
  );
});

export default VideoPlayerWrapper;
