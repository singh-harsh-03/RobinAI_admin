import React from "react";

const TimestampList = ({ timestamps, updateTimestamp, deleteTimestamp }) => {
  return (
    <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-3 text-gray-900">Timestamps</h2>
      {timestamps.length === 0 ? (
        <p className="text-gray-600">No timestamps added yet.</p>
      ) : (
        <ul className="space-y-3">
          {timestamps.map((ts, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-3 bg-white rounded shadow"
            >
              <div className="flex items-center space-x-2">
                <span className="font-bold text-gray-900">{ts.time}s</span>
                <input
                  type="text"
                  value={ts.description}
                  onChange={(e) =>
                    updateTimestamp(index, "description", e.target.value)
                  }
                  placeholder="Enter description"
                  className="p-1 border border-gray-300 rounded"
                />
              </div>
              <button
                onClick={() => deleteTimestamp(index)}
                className="text-red-500 hover:text-red-700 transition"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TimestampList;
