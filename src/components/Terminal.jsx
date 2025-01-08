import React from "react";

const Terminal = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
      <div className="relative max-w-4xl mx-auto">
        {/* Blurred Shadow */}
        <div className="absolute inset-0 rounded-t-2xl bg-white opacity-10 blur-2xl -z-5"></div>

        {/* Gradient Background */}
        <div
          className="absolute -inset-3 rounded-t-2xl bg-[rgba(255,255,255,0.1)] backdrop-blur-md -z-10"
          style={{
            borderTop: "2px solid rgba(255,255,255,0.2)",
            borderLeft: "2px solid rgba(255,255,255,0.2)",
            borderRight: "2px solid rgba(255,255,255,0.2)",
            maskImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 0.5) 95%, rgba(0, 0, 0, 0) 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 0))",
          }}
        ></div>

        {/* Terminal */}
        <div
          className="relative bg-gradient-to-b from-zinc-800 to-zinc-900 text-white rounded-t-xl shadow-lg p-6 z-10"
          style={{
            maskImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 0.5) 95%, rgba(0, 0, 0, 0) 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 0.5) 97%, rgba(0, 0, 0, 0) 100%)",
          }}
        >
          {/* Title Bar */}
          <div className="flex items-center justify-start space-x-2 mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full blur-xs"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full blur-xs"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full blur-xs"></div>
          </div>

          {/* Main Content */}
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              I craft products, <br />
              interactions & <span className="italic">stories.</span>
            </h1>
            <div className="mt-8 text-sm text-gray-400">
              Designer at Discord. Based in Toronto.
              <br />
              <span className="text-gray-500">Formerly at Google and RBC.</span>
            </div>
          </div>

          {/* Down Arrow */}
          <div className="flex justify-center mt-8">
            <div className="w-8 h-8 border-t-2 border-l-2 border-gray-400 rotate-[225deg] transform"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
