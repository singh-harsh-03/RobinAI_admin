"use client";
import React, { useState, useRef } from "react";
import VideoPlayer from "./VideoPlayer";
import TimestampList from "./TimestampList";
import Controls from "./Controls";

function Video() {
  const [videoUrl, setVideoUrl] = useState(null);
  const [timestamps, setTimestamps] = useState([]);
  const playerRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
    }
  };

  const addTimestamp = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      setTimestamps([
        ...timestamps,
        { time: currentTime.toFixed(2), description: "" },
      ]);
    }
  };

  const updateTimestamp = (index, field, value) => {
    setTimestamps((prevTimestamps) =>
      prevTimestamps.map((ts, i) =>
        i === index ? { ...ts, [field]: value } : ts
      )
    );
  };

  const deleteTimestamp = (index) => {
    setTimestamps((prevTimestamps) =>
      prevTimestamps.filter((_, i) => i !== index)
    );
  };

  const sendDataToBackend = async () => {
    const payload = { timestamps };

    try {
      const response = await fetch("/api/process-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("Backend Response:", data);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div className="flex flex-col items-center my-10 mx-10">
      <input
        type="file"
        accept="video/*"
        onChange={handleFileUpload}
        className="mb-6 p-2 border border-gray-300 rounded-lg"
      />
      {videoUrl && (
        <div className="w-full max-w-3xl p-6 rounded-lg shadow-lg bg-white">
          <VideoPlayer ref={playerRef} videoUrl={videoUrl} />
          <Controls
            addTimestamp={addTimestamp}
            sendDataToBackend={sendDataToBackend}
          />
          <TimestampList
            timestamps={timestamps}
            updateTimestamp={updateTimestamp}
            deleteTimestamp={deleteTimestamp}
          />
        </div>
      )}
    </div>
  );
}

export default Video;
