import React from "react";
import './footer.css';
import githubSvg from "../assets/github-filled.svg";
import linkedin from "../assets/linkedin-filled.svg";
import twitter from "../assets/twitter-filled.svg";
import instagram from "../assets/instagram-filled.svg"

function footer() {
    return (
        <>
        <footer className="footer">
        <div className="container footer-row">
        <div className="footer-text">
        <p>stalked enough? Let's connect :)</p>
    </div>
        <ul class="footer-link">
            <li><a href="https://github.com/divyanshraj0408" ><img className="footer-link-img" src={githubSvg} alt=""></img></a></li>
            <li><a href="https://www.linkedin.com/in/divyansh-raj/"><img className="footer-link-img" src={linkedin} alt=""></img></a></li>
            <li><a href="https://twitter.com/divyanshraj04"><img className="footer-link-img" src={twitter} alt=""></img></a></li>
            <li><a href="https://www.instagram.com/divy_ansh_raj/"><img className="footer-link-img" src={instagram} alt=""></img></a></li>
        </ul>
        <div className="footer-text footer-text-bottom">
            <span className="comments">// Made with ❤️ by me.</span>
        </div>
    </div>
    
    </footer>
        </>
    );
}
export default footer;