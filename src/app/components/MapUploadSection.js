import { useState } from "react";

export default function MapUploadSection() {
  const [selectedFile, setSelectedFile] = useState(null);

  // Handle file selection
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  // Handle drag-and-drop functionality
  const handleDragOver = (event) => event.preventDefault();

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 w-full">
      {/* Upload Box */}
      <div
        className="border-2 border-dashed border-gray-400 p-12 rounded-lg w-80 h-60 flex flex-col items-center justify-center cursor-pointer bg-gray-50 hover:border-gray-900 transition"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {!selectedFile ? (
          <>
            <span className="text-gray-600 text-lg font-semibold">📤 Drag & Drop your map</span>
            <span className="text-gray-500 text-sm">Formats: DWG, SVG, PNG, JPEG</span>

            {/* Hidden File Input */}
            <input type="file" accept=".dwg,.svg,.png,.jpeg" onChange={handleFileUpload} className="hidden" id="fileUpload" />
            <label htmlFor="fileUpload" className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-lg cursor-pointer hover:bg-gray-600 transition">
              Browse Files
            </label>
          </>
        ) : (
          <span className="text-green-600 font-semibold">{selectedFile.name}</span>
        )}
      </div>

      {/* "Create Your Own Map" - Smaller Version */}
      <div className="text-center bg-white shadow-md rounded-lg p-3 w-48">
        <h3 className="text-sm font-bold text-gray-700">🛠️ Create Your Own Map</h3>
        <button
          onClick={() => window.location.href = "https://path-navigato-ritorno.vercel.app/?position=v35"}
          className="mt-2 px-4 py-2 bg-pink-500 text-white rounded-lg text-sm cursor-pointer hover:bg-pink-600 transition"
        >
          ➕ Start Drawing
        </button>
      </div>
    </div>
  );
}
