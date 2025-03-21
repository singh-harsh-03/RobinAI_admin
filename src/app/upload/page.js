"use client";
import { useState, useRef } from "react";
import ReactPlayer from "react-player";
import db from "../../../src/db.json";

export default function UploadPage() {
  const [videoUrl, setVideoUrl] = useState(null);
  const [timestamps, setTimestamps] = useState([]);
  const [currentLocation, setCurrentLocation] = useState("");
  const [description, setDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const playerRef = useRef(null);

  // Handle video upload
  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
    }
  };

  // Save the current timestamp
  const handleAddTimestamp = () => {
    let timeToUse;

    // Check if a value is entered in currentTime
    if (currentTime && !isNaN(currentTime)) {
        timeToUse = currentTime; // Use the entered value
    } else if (playerRef.current) {
        timeToUse = playerRef.current.getCurrentTime(); // Use the video player's current time
    } else {
        return; // Exit if neither is available
    }

    // Add the timestamp
    setTimestamps([
        ...timestamps,
        { time: timeToUse, location: currentLocation, description },
    ]);

    // Reset the form fields
    setCurrentLocation("");
    setDescription("");
  };
  // Delete a timestamp
  const handleDeleteTimestamp = (index) => {
    setTimestamps(timestamps.filter((_, i) => i !== index));
  };

  const handleAIAnalyze = () => {
    if (!playerRef.current) return;

    const duration = playerRef.current.getDuration(); // Get total video length
    const generatedTimestamps = [];
    const objects = db.objects;
    

    setIsAnalyzing(true);

    // Generate timestamps at every 8-second interval
    for (let i = 0; i < duration; i += 8) {
      const obj = objects[i%objects.length];
      generatedTimestamps.push({ time: i, location: obj.name, description: obj.desc });
    }

    // Simulate AI processing delay
    setTimeout(() => {
      setTimestamps(generatedTimestamps);
      setIsAnalyzing(false);
    }, 5000);
  };

  return (
    <div className="bg-gray-50 flex flex-col lg:flex-row p-8 gap-8 w-full">
      
      {/* Left Panel - Video Player */}
      <div className="lg:w-3/5 w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">📹 Upload & Tag Video</h1>

        {/* Upload Button */}
        {!videoUrl && (
          <label className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-400 p-6 rounded-lg hover:border-blue-500 transition">
            <span className="text-gray-600 text-lg font-semibold">📤 Click to Upload a Video</span>
            <input type="file" accept="video/*" onChange={handleVideoUpload} className="hidden" />
          </label>
        )}

        {/* Video Player */}
        {videoUrl && (
          <div className="mb-6">
            <ReactPlayer ref={playerRef} url={videoUrl} controls width="100%" height="400px" className="rounded-lg shadow" />
          </div>
        )}

        {/* Buttons */}
        {videoUrl && (
          <div className="flex gap-4">
            <button
              onClick={handleAddTimestamp}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:scale-105 transform transition"
            >
              🔖 Add Timestamp
            </button>
            <button
              onClick={handleAIAnalyze}
              className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-3 rounded-lg shadow hover:scale-105 transform transition"
            >
              🤖 AI Analyze
            </button>
          </div>
        )}
      </div>

      {/* Right Panel - Timestamp Section */}
      {videoUrl && (
        <div className="lg:w-2/5 w-full bg-white shadow-md rounded-lg p-6">
          
          {/* AI Analysis Loader */}
          {isAnalyzing && (
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
              <span className="mt-2 text-blue-500 font-semibold">Analyzing the video...</span>
            </div>
          )}

          {/* Timestamp Form */}
          <div className="p-4 border rounded-lg bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-800">📍 Tag a Timestamp</h2>
            <input 
                type="number"
                placeholder="Enter time (in seconds)"
                value={currentTime}
                onChange={(e) => setCurrentTime(parseFloat(e.target.value))}
                className="border p-2 rounded-lg w-full my-2 focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-gray-900"
            />
            <input
              type="text"
              placeholder="Enter location"
              value={currentLocation}
              onChange={(e) => setCurrentLocation(e.target.value)}
              className="border p-2 rounded-lg w-full my-2 focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-gray-900"
            />
            <input
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 rounded-lg w-full my-2 focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-gray-900"
            />
          </div>

          {/* Timestamp List with Scrollbar */}
          {timestamps.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">📌 Tagged Timestamps</h2>
              <div className="max-h-60 overflow-y-auto border p-2 rounded-lg bg-gray-50">
                <ul className="space-y-2">
                {timestamps.map((ts, index) => (
                    <li key={index} className="border p-2 rounded w-full my-1">
                        <div>
                        <label className="block font-medium text-blue-600 text-sm">⏱ Time:</label>
                        <input
                            type="number"
                            value={ts.time}
                            onChange={(e) => handleEditTimestamp(index, "time", parseFloat(e.target.value))}
                            className="border p-1 rounded w-full my-1 text-sm focus:ring-1 focus:ring-blue-500 placeholder-gray-400 text-gray-800"
                        />
                        <label className="block font-medium text-green-600 text-sm">📍 Location:</label>
                        <input
                            type="text"
                            value={ts.location}
                            onChange={(e) => handleEditTimestamp(index, "location", e.target.value)}
                            className="border p-1 rounded w-full my-1 text-sm focus:ring-1 focus:ring-blue-500 placeholder-gray-400 text-gray-800"
                        />
                        <label className="block font-medium text-gray-700 text-sm">📝 Description:</label>
                        <input
                            type="text"
                            value={ts.description || ""}
                            onChange={(e) => handleEditTimestamp(index, "description", e.target.value)}
                            className="border p-1 rounded w-full my-1 text-sm focus:ring-1 focus:ring-blue-500 placeholder-gray-400 text-gray-800"
                        /> 
                        </div>
                        {/* Bin Button */}
                        <button
                        onClick={() => handleDeleteTimestamp(index)}
                        className="text-gray-500 hover:text-red-600 text-sm mt-1"
                        >
                        🗑️ Delete
                        </button>
                    </li>
                    ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
