import React from "react";
import "./projects.css";
function Cards({ headline, discription, image, link }) {
  return (
    <div className="card" style={{ backgroundImage: "url(" + image + ")" }}>
      <div className="card-content">
        <h1 className="card-title">{headline}</h1>
        <p className="card-body">
          {discription}
        </p>
        <a
          href={link}
          className="button"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}
export default Cards;