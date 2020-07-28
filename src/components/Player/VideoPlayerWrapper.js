import React, { forwardRef } from "react";
import ReactResizeDetector from "react-resize-detector";
import { Paper } from "@material-ui/core";
import { Resizable } from "re-resizable";
import useWindowSize from "../../common/useWindowSize";
import VideoPlayer from "./VideoPlayer";

const HEADER_AND_TIMELINE_HEIGHT = 64 + 200;

const videoWrapperStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid rgb(221, 221, 221)",
  width: "100%",
  height: "100%",
  minWidth: "200px",
};

const VideoPlayerWrapper = forwardRef((props, ref) => {
  const size = useWindowSize();
  // let defaultHeight = size.height - HEADER_AND_TIMELINE_HEIGHT;

  // React.useEffect(() => {
  //   defaultHeight = size.height - HEADER_AND_TIMELINE_HEIGHT;
  // }, [size]);

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
        // height: "75vh",
        // height: size.height - 200 - 64,
        // height: defaultHeight
      }}
      maxHeight={size.height - HEADER_AND_TIMELINE_HEIGHT}
    >
      <Paper style={videoWrapperStyle}>
        <ReactResizeDetector handleWidth handleHeight>
          {({ width, height }) => (
            <div>
              <VideoPlayer
                width={width || 200}
                height={height || 200}
                ref={ref}
              />
            </div>
          )}
        </ReactResizeDetector>
      </Paper>
    </Resizable>
  );
});

export default VideoPlayerWrapper;
