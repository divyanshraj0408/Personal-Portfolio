import React from "react";
import "./home.css";
import divyanshPhoto from "../assets/divyanshraj.jpg";

function Maincontent() {
  return (
    <>
      <div className="About-me-section container">
        <div className="info">
          <h2 className="info-head">
            .readME 👽
            <span className="comments">// hey there, I am Divyansh Raj</span>
          </h2>
          <div className="row">
            <div className="info-img">
              <img className="divyansh_img" src={divyanshPhoto} alt="" />
            </div>
            <div className="info-text">
              <p>
                I am a student trying to learn and explore web development and
                programming by making projects and doing opensource
                contributions. Feel free to hit me up using the contact section
                or my socials. 🚀
              </p>
            </div>
          </div>
        </div>

        <div className="info">
          <h2 className="info-head">
            .education 🏫
            <span className="comments">
              // Pursuing electronics engineering and loving it
            </span>
          </h2>
          <div className="info-text">
            <p>
              Currnetly, I am pursuing high school diploma in the field of
              electronics and communication engineering at{" "}
              <a
                href="http://sliet.ac.in/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "white" }}
              >
                Sant Longowal Institute of engineering and technology
              </a>
              .
            </p>
          </div>
        </div>

        <div className="info">
          <h2 className="info-head">
            .skills 😎<span className="comments">// am a pro</span>
          </h2>
          <div className="info-text row">
            <ul className="skill_list">
              <li>
                <h2>WebDev</h2>
              </li>
              <li>javascript</li>
              <li>reactjs</li>
              <li>nodejs</li>
            </ul>
            <ul className="skill_list">
              <li>
                <h2>Languages</h2>
              </li>
              <li>java</li>
              <li>javascript</li>
            </ul>
            <ul className="skill_list">
              <li>
                <h2>Technologies</h2>
              </li>
              <li>git/github</li>
            </ul>
          </div>
        </div>

        <div className="info">
          <h2 className="info-head">
            .achievements 🏅<span className="comments">// sweat and tears</span>
          </h2>
          <div className="info-text row">
            <ul className="skill_list achievements">
              <li>
                <h2>OpenSource</h2>
              </li>
              <li style={{ textDecoration: "underline" }}>
                <a
                  href="https://twitter.com/divyanshraj04/status/1451410541759455232/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "white" }}
                >
                  Complted hacktoberfest 2021 and 2022
                </a>
              </li>
              <li style={{ textDecoration: "underline" }}>
                <a
                  href="https://github.com/Call-for-Code-for-Racial-Justice/Truth-Loop/pull/190"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "white" }}
                >
                  Contributed in IBM's Call for Code projects
                </a>
              </li>
            </ul>
            <ul className="skill_list achievements">
              <li>
                <h2>DSA</h2>
              </li>
              <li style={{ textDecoration: "underline" }}>
                <a
                  href="https://leetcode.com/divyanshraj0408/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "white" }}
                >
                  Leetccode : 80+ questions solved
                </a>
              </li>
              {/* <li style={{ textDecoration: "underline" }}><a href="https://www.codechef.com/users/divyanshraj" target="_blank" rel="noopener noreferrer" style={{ color: "white" }}>Codechef: rating 1125</a></li> */}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
export default Maincontent;
