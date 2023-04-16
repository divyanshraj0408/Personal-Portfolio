import React from "react";
import Cards from "./cards";
import SaveTabs from "../assets/SaveTabs.png";
import Memegenerator from "../assets/Memegenerator.png";
function projects() {
  return (
    <div>
      <p className="container">
        <div className="cards">
          <div className="project-head-div">
            <h2 className="info-head project-head">
              .projects 🔥{" "}
              <span className="comments">// projects i have worked on</span>
            </h2>
          </div>
          <div className="projects-cards row">
            <Cards
              headline={"Save Tabs"}
              discription={"A chrome extension to save your tabs and links"}
              link={"https://github.com/divyanshraj0408/SaveTabs"}
              image={SaveTabs}
            />
            <Cards
              headline={"Meme Generator"}
              discription={
                "Generate random memes and give them your desired captions"
              }
              link={"https://github.com/divyanshraj0408/RandomMemeGenerator"}
              image={Memegenerator}
            />
          </div>
        </div>
      </p>
    </div>
  );
}
export default projects;
