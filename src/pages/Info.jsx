import { MapPin, Code2, Briefcase, Calendar } from "lucide-react";
import GitHubHeatmap from "../components/github-heatmap";

const Info = () => {
  const experiences = [
    {
      id: 1,
      designation: "Cyber Security Trainee Intern",
      companyName: "DRDO",
      fullCompanyName: "Defence Research and Development Organisation",
      workMonths: "Jan 2024 – Mar 2024",
      workDescription: "Worked with honeypots and firewall configuration. Built a home network honeypot to detect malicious scans, visualized via Flask dashboard.",
    },
    {
      id: 2,
      designation: "Software Development Intern",
      companyName: "DSEU",
      fullCompanyName: "Delhi Skill and Entrepreneurship University",
      workMonths: "Dec 2024 – Feb 2025",
      workDescription: "Built a fatigue detection model using OpenCV and Python. Implemented blink detection and yawn frequency alerts for road safety.",
    },
  ];

  const skills = [
    "React", "Node.js", "TypeScript", "Python", "PostgreSQL", "MongoDB", "Docker", "AWS"
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Bento Grid Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 auto-rows-[180px]">
        
        {/* Main Intro Card - Spans 2 cols and 2 rows */}
        <div className="col-span-2 row-span-2 bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 rounded-3xl p-8 border border-white/10 flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">About me</span>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Hey, I&apos;m <span className="text-emerald-400">Divyansh</span>
            </h1>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              A computer science student who doesn&apos;t know anything other than computers. I build products end-to-end, 
              obsessing over both the architecture and the pixels.
            </p>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <MapPin size={14} />
            <span>New Delhi, India</span>
          </div>
        </div>

        {/* Photo Card 1 */}
        <div className="col-span-1 row-span-1 rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center">
          <img 
            src="https://ik.imagekit.io/divyansh04/WhatsApp%20Image%202025-09-02%20at%2013.30.33(1).jpeg?updatedAt=1772369294924" 
            alt="Divyansh" 
            className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500" 
          />
        </div>

        {/* Photo Card - Tall (spans 2 rows) */}
        <div className="col-span-1 row-span-2 rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center">
          <img 
            src="https://ik.imagekit.io/divyansh04/WhatsApp%20Image%202026-03-01%20at%2018.15.55.jpeg?updatedAt=1772369295358" 
            alt="Divyansh" 
            className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500" 
          />
        </div>

        {/* Photo Card 2 */}
        <div className="col-span-1 row-span-2 rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center">
          <img 
            src="https://ik.imagekit.io/divyansh04/WhatsApp%20Image%202025-09-02%20at%2013.26.33.jpeg?updatedAt=1772369294904" 
            alt="Divyansh" 
            className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500" 
          />
        </div>

        {/* Photo Card */}
        <div className="col-span-1 row-span-1 rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center">
          <img 
            src="https://ik.imagekit.io/divyansh04/WhatsApp%20Image%202025-09-02%20at%2013.30.34.jpeg?updatedAt=1772369294903" 
            alt="Divyansh" 
            className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500" 
          />
        </div>

        {/* Video Card */}
        <div className="col-span-1 row-span-2 rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center">
          <video 
            src="https://ik.imagekit.io/divyansh04/WhatsApp%20Video%202026-03-01%20at%2018.16.26.mp4?updatedAt=1772369298560" 
            className="w-full h-full object-cover object-center"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>

        {/* Photo Card 3 */}
        <div className="col-span-1 row-span-1 rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center">
          <img 
            src="https://ik.imagekit.io/divyansh04/IMG_20251101_124044673.jpg?updatedAt=1772369300198" 
            alt="Divyansh" 
            className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500" 
          />
        </div>

        {/* Video Card */}
        {/* <div className="col-span-2 row-span-1 rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center">
          <video 
            src="https://ik.imagekit.io/divyansh04/WhatsApp%20Video%202025-09-02%20at%2013.15.15.mp4?updatedAt=1772369300825" 
            className="w-full h-full object-cover object-center"
            autoPlay
            loop
            muted
            playsInline
          />
        </div> */}

        {/* Large Photo Card */}
        <div className="col-span-1 row-span-1 rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center">
          <img 
            src="https://ik.imagekit.io/divyansh04/IMG_20251101_085952800.jpg?updatedAt=1772369301310" 
            alt="Divyansh" 
            className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500" 
          />
        </div>

        {/* Photo Card 4 */}
        <div className="col-span-2 row-span-1 rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center">
          <img 
            src="https://ik.imagekit.io/divyansh04/IMG_20251101_115755981.jpg?updatedAt=1772369301317" 
            alt="Divyansh" 
            className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500" 
          />
        </div>

      </div>

      {/* Skills Section */}
      <div className="mb-16">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <Code2 size={20} className="text-emerald-400" />
          Tech Stack
        </h2>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill, idx) => (
            <span 
              key={idx} 
              className="px-4 py-2 bg-zinc-800/60 border border-white/10 rounded-full text-gray-300 text-sm hover:border-emerald-400/50 hover:text-emerald-400 transition-colors cursor-default"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Experience Section */}
      <div className="mb-16">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <Briefcase size={20} className="text-emerald-400" />
          Experience
        </h2>
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div 
              key={exp.id} 
              className="group bg-zinc-800/40 hover:bg-zinc-800/60 border border-white/10 hover:border-white/20 rounded-2xl p-6 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">
                    {exp.designation}
                  </h3>
                  <p className="text-gray-400 text-sm mb-2">
                    {exp.companyName} <span className="text-gray-600">• {exp.fullCompanyName}</span>
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {exp.workDescription}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm whitespace-nowrap">
                  <Calendar size={14} />
                  {exp.workMonths}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* GitHub Contributions */}
      <div className="mb-8">
        <GitHubHeatmap username={"divyanshraj0408"} />
      </div>

    </div>
  );
};

export default Info;
