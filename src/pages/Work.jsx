import Terminal from "../components/Terminal";
import Project from "../components/Project";
const Work = () => {
  
  const projects = [
    {
      id: 1,
      title: "EraCrux",
      description:
        "Canva for Data Analysis. A web application that allows users to create and collaborate on data analysis projects using a drag-and-drop interface.",
      image: "/pics/eracrux.svg",
      tags: ["ReactJS", "PostgreSQL", "Drizzle ORM", "Groq","Typescript"],
      link: "https://eracrux.com/",
    },
    {
      id: 2,
      title: "Pingo",
      description:
        "A platform for connecting like-minded individuals for collaborative projects and networking opportunities.",
      image: "/pics/meetmates.svg",
      tags: ["React", "Node.js", "PostgreSQL", "WebRTC", "Socket.io"],
      link: "https://www.meetmates.space/",
    },
    {
      id: 3,
      title: "ClassConnect",
      description:
        "An educational platform that bridges the gap between students and teachers with interactive virtual classrooms.",
      image: "/pics/classconnect.svg",
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
