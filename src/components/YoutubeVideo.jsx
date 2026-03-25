import { Youtube, Play, Eye, ExternalLink } from "lucide-react";

// ── ADD YOUR VIDEOS HERE ──────────────────────────────────────────────────────
const videos = [
  {
    id: "7VWlc5JiZ7Q",
    title: "IBM Developer - Hacktoberfest: Demo Day",
    views: "286 views",
  },
  {
    id: "8_BVa1mtt24",
    title: "Web Development Bootcamp - Full Course for Beginners [2024]",
    views: "127 views",
  },
];

// Your YouTube channel URL
const CHANNEL_URL = "https://www.youtube.com/@YourChannelHandle";
// ─────────────────────────────────────────────────────────────────────────────

const getYouTubeThumbnail = (id) =>
  `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

const getYouTubeUrl = (video) =>
  video.url ?? `https://www.youtube.com/watch?v=${video.id}`;

const VideoCard = ({ video }) => {
  return (
    <a
      href={getYouTubeUrl(video)}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative bg-zinc-800/40 hover:bg-zinc-800/70 border border-white/10 hover:border-emerald-400/30 rounded-xl overflow-hidden transition-all duration-300 flex flex-row items-stretch"
    >
      {/* Thumbnail — fixed width, left side */}
      <div className="relative w-36 sm:w-44 shrink-0 overflow-hidden bg-zinc-900">
        <img
          src={getYouTubeThumbnail(video.id)}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src.includes("maxresdefault")) {
              target.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
            }
          }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-zinc-900/30 group-hover:bg-zinc-900/10 transition-colors duration-300" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-9 h-9 rounded-full bg-zinc-900/70 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 group-hover:border-emerald-400/50 backdrop-blur-sm">
            <Play size={14} className="text-emerald-400 fill-emerald-400 translate-x-0.5" />
          </div>
        </div>
      </div>

      {/* Info — right side */}
      <div className="p-3 flex flex-col justify-between flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-xs font-medium text-gray-200 group-hover:text-white leading-snug line-clamp-3 transition-colors duration-200">
            {video.title}
          </h3>
          {/* YouTube badge */}
          <div className="shrink-0 bg-zinc-900/80 border border-white/10 rounded-full px-1.5 py-0.5 flex items-center gap-1">
            <Youtube size={9} className="text-red-500 fill-red-500" />
            <span className="text-[9px] text-gray-500 font-medium">YT</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2">
          {video.views && (
            <div className="flex items-center gap-1 text-gray-500 text-[11px]">
              <Eye size={11} />
              <span>{video.views}</span>
            </div>
          )}
          <div className="flex items-center gap-1 text-emerald-400/50 text-[11px] group-hover:text-emerald-400 transition-colors duration-200 ml-auto">
            <span>Watch</span>
            <ExternalLink size={9} />
          </div>
        </div>
      </div>
    </a>
  );
};

const YouTubeVideos = () => {
  return (
    <div className="mb-16">
      {/* Section header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Youtube size={20} className="text-emerald-400" />
          More of Me
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default YouTubeVideos;