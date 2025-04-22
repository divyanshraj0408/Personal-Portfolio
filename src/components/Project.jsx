import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import PropTypes from "prop-types";

const Project = ({ image, title, description, tags, link }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="relative max-w-[70vw] mx-auto mb-20 flex flex-col items-center justify-center"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Project Image (Scales on Hovering Over Whole Component) */}
        <div
          className={`mb-6 w-full transition-transform duration-500 ease-in-out ${
            hovered ? "scale-105" : "scale-100"
          }`}
        >
          <img src={image} alt={title} className="w-full rounded-xl" />
        </div>

        {/* Project Info */}
        <div className="px-4">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-2xl font-semibold text-white">{title}</h3>
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors"
              >
                View Project <ArrowUpRight size={16} />
              </a>
            )}
          </div>

          <p className="text-gray-400 mb-4">{description}</p>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs bg-zinc-800 text-gray-300 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Background Blur Effect */}
        <div
          className="absolute -inset-3 rounded-2xl backdrop-blur-md -z-10 transition-all duration-700"
          style={{
            background: hovered
              ? "linear-gradient(to right, rgba(59,130,246,0.5), rgba(147,197,253,0.5))"
              : "rgba(255,255,255,0.1)",
            borderTop: "2px solid rgba(255,255,255,0.2)",
            borderLeft: "2px solid rgba(255,255,255,0.2)",
            borderRight: "2px solid rgba(255,255,255,0.2)",
            borderBottom: "2px solid rgba(255,255,255,0.2)",
          }}
        ></div>
      </a>
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
