import meetmatesImage from "../assets/meetmates.svg";
import classconnectImage from "../assets/classconnect.svg";
import Terminal from "../components/Terminal";
import Project from "../components/Project";
const Work = () => {
  const projects = [
    {
      id: 1,
      title: "MeetMates",
      description:
        "A platform for connecting like-minded individuals for collaborative projects and networking opportunities.",
      image: meetmatesImage,
      tags: ["React", "Node.js", "PostgreSQL", "WebRTC", "Socket.io"],
      link: "https://www.meetmates.space/",
    },
    {
      id: 2,
      title: "ClassConnect",
      description:
        "An educational platform that bridges the gap between students and teachers with interactive virtual classrooms.",
      image: classconnectImage,
      tags: ["React", "Node.js", "MongoDB"],
      link: "https://classconnect.onrender.com/",
    },
  ];
  return (
    <>
      <Terminal />
      <div className="py-10">
        {projects.map((project) => (
          <Project
            key={project.id}
            title={project.title}
            description={project.description}
            image={project.image}
            tags={project.tags}
            link={project.link}
          />
        ))}
      </div>
    </>
  );
};
export default Work;
