import React from "react";

const Terminal = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-4xl mx-auto">
        {/* Blurred Shadow */}
        <div className="absolute inset-0 rounded-2xl bg-white opacity-10 blur-2xl -z-5"></div>

        {/* Gradient Background */}
        <div className="absolute -inset-4 rounded-2xl bg-[rgba(255,255,255,0.1)] backdrop-blur-md border border-[rgba(255,255,255,0.2)] -z-10"></div>

        {/* Terminal */}
        <div className="relative bg-custom-gradient text-white rounded-xl shadow-lg p-6 z-10 ">
          {/* Title Bar */}
          <div className="flex items-center justify-start space-x-2 mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>

          {/* Main Content */}
          <div className="text-center">
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
              Crafting APIs, <br />
              <span className="text-gray-300">Products</span> &{" "}
              <span className="italic text-gray-100">stories.</span>
            </p>
          </div>
          <div className="flex justify-center mt-8">
            <div className="w-8 h-8 border-t-2 border-l-2 border-gray-400 rotate-[225deg] transform"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
