import React from "react";

const Controls = ({ addTimestamp, sendDataToBackend }) => {
  return (
    <div className="flex justify-center space-x-4 mt-6">
      <button
        onClick={addTimestamp}
        className="px-6 py-2 bg-pink-600 text-white rounded-lg shadow hover:bg-pink-700 transition"
      >
        Add Timestamp
      </button>
      <button
        onClick={sendDataToBackend}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        Save
      </button>
    </div>
  );
};

export default Controls;
