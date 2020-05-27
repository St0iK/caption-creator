import React from "react";
import ReactPlayer from "react-player";
import { withResizeDetector } from "react-resize-detector";

const VideoPlayerWrapper = ({ width, height }) => {
  const W = width - 20;
  const H = height - 20;

  return (
    <ReactPlayer
      url="https://www.dropbox.com/s/8zw5wq5ysa7o3di/goodCatBadCat.mp4?dl=0"
      playing={false}
      controls={true}
      width={W || 200}
      height={H || 200}
    />
  );
};

export default withResizeDetector(VideoPlayerWrapper);
