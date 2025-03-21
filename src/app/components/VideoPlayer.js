import React, { forwardRef } from "react";
import ReactPlayer from "react-player";

const VideoPlayer = forwardRef(({ videoUrl }, ref) => {
  return (
    <div className="w-full rounded-lg overflow-hidden shadow-md">
      <ReactPlayer
        ref={ref}
        url={videoUrl}
        controls
        width="100%"
        height="500px"
      />
    </div>
  );
});

export default VideoPlayer;
