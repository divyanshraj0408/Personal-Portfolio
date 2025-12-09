import NoiseBox from "../components/NoiseBox";
import GitHubHeatmap from "../components/github-heatmap";
const Info = () => {
  const experiences = [
    {
      id: 1,
      designation: "Cyber Security Trainee Intern",
      companyName: "DRDO (Defence Research and Development Organisation)",
      workMonths: "January 2024 – March 2024",
      workDescription: "Gained hands-on experience with honeypots and firewall configuration. Developed a home network honeypot to detect malicious scans and intrusion attempts, visualized via a custom Flask dashboard.",
      workImgSrc: "/pics/drdocertf.png", // Replace with your actual image path

    },
    {
      id: 2,
      designation: "Software Development Intern",
      companyName: "DSEU (Delhi Skill and Entrepreneurship University)",
      workMonths: "December 2024 – February 2025",
      workDescription: "Worked on building a fatigue detection model using OpenCV and Python. Implemented a system that alerts users based on blink detection and yawn frequency, aimed at improving road safety.",
      workImgSrc: "/pics/dseucertf.jpeg", // Replace with your actual image path
    },
  ];


  return <>
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
      <h2 className="text-3xl font-bold text-white mb-6">How  I work</h2>
      <p className="text-gray-400 mb-4">
        I like to put my heart and soul into my work, creating projects that not only solve problems but also bring joy to users. My journey in web development has been fueled by a passion for learning and a desire to make a positive impact through technology.
      </p>
      <p className="text-gray-400 mb-4">
        I thrive in collaborative environments and enjoy working with teams to bring ideas to life. My goal is to continuously improve my skills and contribute to projects that make a difference.
      </p>

    </div>
    {experiences.map((experience) => (
      <NoiseBox
        key={experience.id}
        designation={experience.designation}
        companyName={experience.companyName}
        workMonths={experience.workMonths}
        workdescription={experience.workDescription}
        workImgSrc={experience.workImgSrc}
      />
    ))}

    {/* <GitHubHeatmap username={"divyanshraj0408"}/> */}
    {/* <NoiseBox designation companyName workMonths workdescription workImgSrc /> */}
  </>;
};
export default Info;
