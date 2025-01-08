import React from "react";
import { ArrowUpRight } from "lucide-react";

const Navigation = () => {
  return (
    <nav className="w-full text-on-bg-color p-6 mb-20">
      <div className="max-w-7xl mx-auto flex justify-between items-center relative">
        {/* Left side - Name and title */}
        <div className="w-1/3">
          <h1 className="text-lg font-normal">Divyansh Raj</h1>
          <p className="text-sm text-gray-400">Software Engineer</p>
        </div>

        {/* Center - Work/Info toggle */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <div className="flex items-center justify-between w-[150px] h-12 px-1.5 relative backdrop-blur-lg bg-white/5 rounded-3xl border border-white/10 transition-all duration-1000 ease-in-out shadow-lg">
            <button className="px-4 py-2 text-sm text-white rounded-full bg-zinc-800/90">
              Work
            </button>
            <button className="px-4 py-2 text-sm text-gray-400">Info</button>
          </div>
        </div>

        {/* Right side - Links */}
        <div className="w-1/3 flex justify-end">
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="flex items-center gap-1 text-sm text-gray-400 hover:text-white"
            >
              LinkedIn
              <ArrowUpRight size={16} />
            </a>
            <a
              href="#"
              className="flex items-center gap-1 text-sm text-gray-400 hover:text-white"
            >
              Resume
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
