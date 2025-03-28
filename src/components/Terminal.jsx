import { Code2, Terminal as TerminalIcon } from "lucide-react";

const Terminal = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
      <div className="relative w-full h-[90vh] mx-auto flex flex-col">
        {/* Blurred Shadow */}
        <div className="absolute inset-0 rounded-t-2xl bg-white opacity-10 blur-3xl"></div>

        {/* Gradient Background */}
        <div
          className="absolute -inset-3 rounded-t-[30px] bg-[rgba(255,255,255,0.1)] backdrop-blur-md"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.2)",
            borderLeft: "1px solid rgba(255,255,255,0.2)",
            borderRight: "1px solid rgba(255,255,255,0.2)",
            maskImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 0.1) 95%, rgba(0, 0, 0, 0) 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 0))",
          }}
        ></div>

        {/* Terminal */}
        <div
          className="relative bg-gradient-to-b from-zinc-800 to-zinc-900 text-white rounded-t-[30px] shadow-lg p-6 flex flex-col h-full"
          style={{
            width: "100%",
            borderTop: "2px solid rgba(255,255,255,0.2)",
            borderLeft: "2px solid rgba(255,255,255,0.2)",
            borderRight: "2px solid rgba(255,255,255,0.2)",
            maskImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 0.5) 97%, rgba(0, 0, 0, 0) 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 0.5) 97%, rgba(0, 0, 0, 0) 100%)",
          }}
        >
          {/* Title Bar */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full blur-xs"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full blur-xs"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full blur-xs"></div>
            </div>
            <div className="flex items-center text-xs text-gray-400">
              <TerminalIcon size={14} className="mr-2" />
              <span>divyansh@portfolio ~ %</span>
            </div>
          </div>

          {/* Main Content (Centered) */}
          <div className="flex flex-col justify-center items-center flex-grow text-center">
            <div className="flex items-center justify-center mb-6">
              <Code2 size={40} className="text-green-400 mr-3" />
              <h2 className="text-xl text-green-400 font-mono">$ whoami</h2>
            </div>
            <h1 className="text-5xl sm:text-5xl md:text-7xl font-bold mb-6">
              I build <span className="text-green-400">innovative</span> <br />
              web experiences &{" "}
              <span className="italic text-green-400">solutions.</span>
            </h1>
            <div className="mb-10 text-xl text-gray-300 max-w-2xl">
              Full Stack Developer passionate about creating elegant,
              user-focused applications with modern technologies.
            </div>
          </div>

          {/* Command Line Prompt */}
          <div className="hidden lg:absolute lg:bottom-20 lg:left-0 lg:right-0 lg:px-6">
            <div className="flex items-center text-green-400 font-mono text-sm">
              <span className="text-gray-400 mr-2">divyansh@portfolio ~ %</span>
              <span className="animate-pulse">_</span>
            </div>
          </div>

          {/* Down Arrow */}
          <div className="flex justify-center absolute bottom-20 left-0 right-0 animate-bounce">
            <div className="w-8 h-8 border-t-2 border-l-2 border-gray-400 rotate-[225deg] transform"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
