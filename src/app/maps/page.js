"use client";

export default function MapsPage() {
  return (
    <div className="h-screen flex flex-col">
      <h1 className="text-2xl font-bold text-center p-4">Navigation Map</h1>
      <iframe
        src="https://path-navigato-ritorno.vercel.app/?position=v35"
        className="w-full flex-grow"
        style={{ height: "90vh", border: "none" }}
      />
    </div>
  );
}
