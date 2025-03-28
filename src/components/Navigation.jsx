import { ArrowUpRight, Github, Menu, X } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const [activeTab, setActiveTab] = useState("work");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="w-full text-on-bg-color p-6 mb-10 top-0 z-50 ">
      <div className="max-w-[100%] mx-auto flex justify-between items-center relative">
        {/* Left side - Name and title */}
        <div className="w-1/3">
          <a href="#" className="group">
            <h1 className="text-lg font-normal group-hover:text-green-400 transition-colors">
              Divyansh Raj
            </h1>
            <p className="text-sm text-gray-400">Just a try hard</p>
          </a>
        </div>

        {/* Center - Work/Info toggle (desktop) */}
        <div className="hidden md:block fixed left-1/2 -translate-x-1/2 z-10">
          <div className="flex items-center justify-between w-[150px] h-12 px-1.5 relative backdrop-blur-lg bg-white/5 rounded-3xl border border-white/10 transition-all duration-300 ease-in-out shadow-lg">
            <button
              className={`px-4 py-2 text-sm rounded-full transition-all ${
                activeTab === "work"
                  ? "text-white bg-zinc-800/90"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveTab("work")}
            >
              Work
            </button>
            <button
              className={`px-4 py-2 text-sm rounded-full transition-all ${
                activeTab === "info"
                  ? "text-white bg-zinc-800/90"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveTab("info")}
            >
              Info
            </button>
          </div>
        </div>

        {/* Right side - Links (desktop) */}
        <div className="hidden md:flex w-1/3 justify-end">
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/divyanshraj"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-gray-400 hover:text-green-400 transition-colors"
            >
              <Github size={16} className="mr-1" />
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/divyanshraj"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-gray-400 hover:text-green-400 transition-colors"
            >
              LinkedIn
              <ArrowUpRight size={16} />
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm px-4 py-2 backdrop-blur-lg bg-white/5 rounded-3xl border border-white/10 transition-colors"
            >
              Resume
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="p-2 text-gray-400 hover:text-white focus:outline-none"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-zinc-900/95 backdrop-blur-md border-b border-white/5 p-4">
          <div className="flex justify-center mb-4">
            <div className="flex items-center justify-between w-[150px] h-12 px-1.5 relative backdrop-blur-lg bg-white/5 rounded-3xl border border-white/10 transition-all duration-300 ease-in-out shadow-lg">
              <button
                className={`px-4 py-2 text-sm rounded-full transition-all ${
                  activeTab === "work"
                    ? "text-white bg-zinc-800/90"
                    : "text-gray-400 hover:text-white"
                }`}
                onClick={() => {
                  setActiveTab("work");
                  setMobileMenuOpen(false);
                }}
              >
                Work
              </button>
              <button
                className={`px-4 py-2 text-sm rounded-full transition-all ${
                  activeTab === "info"
                    ? "text-white bg-zinc-800/90"
                    : "text-gray-400 hover:text-white"
                }`}
                onClick={() => {
                  setActiveTab("info");
                  setMobileMenuOpen(false);
                }}
              >
                Info
              </button>
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <a
              href="https://github.com/divyanshraj"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-400 hover:text-green-400 transition-colors p-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Github size={16} className="mr-1" />
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/divyanshraj"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-400 hover:text-green-400 transition-colors p-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              LinkedIn
              <ArrowUpRight size={16} />
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1 text-sm px-4 py-2 bg-green-500 hover:bg-green-600 text-black rounded-full transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Resume
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
