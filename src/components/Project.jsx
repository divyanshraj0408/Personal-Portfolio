import { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import PropTypes from "prop-types";

const Project = ({ image, title, description, tags, link }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [delayedPos, setDelayedPos] = useState({ x: 0, y: 0 });
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isTextVisible, setIsTextVisible] = useState(true);

  const buttonTexts = ["View Project", ...(tags || [])];

  // Smooth cursor following with delay
  useEffect(() => {
    let animationId;
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const animate = () => {
      setDelayedPos((prev) => ({
        x: lerp(prev.x, mousePos.x, 0.15),
        y: lerp(prev.y, mousePos.y, 0.15),
      }));
      animationId = requestAnimationFrame(animate);
    };

    if (isHovered) {
      animationId = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(animationId);
  }, [isHovered, mousePos]);

  useEffect(() => {
    if (!isHovered) {
      setCurrentTextIndex(0);
      setIsTextVisible(true);
      return;
    }

    const interval = setInterval(() => {
      setIsTextVisible(false);
      setTimeout(() => {
        setCurrentTextIndex((prev) => (prev + 1) % buttonTexts.length);
        setIsTextVisible(true);
      }, 200);
    }, 1500);

    return () => clearInterval(interval);
  }, [isHovered, buttonTexts.length]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setMousePos(pos);
    setDelayedPos(pos);
    setIsHovered(true);
  };

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col lg:flex-row gap-8 px-4 pb-16 sm:px-6 lg:px-8" id="projects">
      {/* Left Sidebar - Project Info */}
      <div className="flex flex-col gap-6 lg:w-2/5">
        {/* Header */}
        <header className="space-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-slate-400">
            Project
          </p>
          <h2 className="text-3xl font-semibold text-white">{title}</h2>
          <p className="text-slate-300">{description}</p>
        </header>

        {/* Stack */}
        {tags && tags.length > 0 && (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold text-white">Stack</h3>
            <ul className="mt-3 flex flex-wrap gap-2 text-xs text-slate-300">
              {tags.map((tag, index) => (
                <li
                  key={index}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Right Side - Project Image Preview */}
      <div className="lg:w-3/5">
        <div
          className="relative rounded-3xl border border-white/5 p-4 transition-all duration-300 hover:border-white/20"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => setIsHovered(false)}
          onMouseMove={handleMouseMove}
          style={{
            cursor: isHovered ? "none" : "auto",
            backgroundImage:
              "linear-gradient(to bottom, rgba(39,39,42,0.9), rgba(24,24,27,0.9)), url('/pics/noise.svg')",
            backgroundBlendMode: "overlay",
            backgroundSize: "cover",
            backgroundRepeat: "repeat",
          }}
        >
          {/* Custom Cursor Button */}
          {link && (
            <div
              className={`pointer-events-none absolute z-20 flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white/90 transition-opacity duration-200 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
              style={{
                left: delayedPos.x,
                top: delayedPos.y,
                transform: "translate(-50%, -50%)",
                background: "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.12) 100%)",
                backdropFilter: "blur(20px) saturate(180%)",
                WebkitBackdropFilter: "blur(20px) saturate(180%)",
                border: "1px solid rgba(255,255,255,0.25)",
                boxShadow: `
                  0 0 0 0.5px rgba(255,255,255,0.1),
                  0 2px 4px rgba(0,0,0,0.1),
                  0 8px 16px rgba(0,0,0,0.15),
                  0 16px 32px rgba(0,0,0,0.1),
                  inset 0 1px 0 rgba(255,255,255,0.35),
                  inset 0 -1px 0 rgba(255,255,255,0.1)
                `,
              }}
            >
              <span
                className={`transition-all duration-200 ease-in-out ${
                  isTextVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                }`}
              >
                {buttonTexts[currentTextIndex]}
              </span>
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </div>
          )}
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
            style={{ cursor: isHovered ? "none" : "pointer" }}
          >
            <img
              src={image}
              alt={title}
              className="w-full rounded-2xl object-cover transition-transform duration-300 hover:scale-[1.02]"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

Project.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  link: PropTypes.string,
};

Project.defaultProps = {
  tags: [],
  link: "",
};

export default Project;
