import projectImage from "../assets/meetmates.svg";
import Box from "./Box";
const Project = () => {
  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="relative max-w-4xl mx-auto mb-20">
          <div className="relative ">
            <img src={projectImage} alt="" />
          </div>
          <div
            className="absolute -inset-3 rounded-2xl bg-[rgba(255,255,255,0.1)] backdrop-blur-md -z-10"
            style={{
              borderTop: "2px solid rgba(255,255,255,0.2)",
              borderLeft: "2px solid rgba(255,255,255,0.2)",
              borderRight: "2px solid rgba(255,255,255,0.2)",
              borderBottom: "2px solid rgba(255,255,255,0.2)",
            }}
          ></div>
        </div>
      </div>
    </>
  );
};
export default Project;
