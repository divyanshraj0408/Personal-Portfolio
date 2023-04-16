import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
function navbar() {
  return (
    <div>
      <nav>
        <div class="navbar">
          <div class="nav-container container">
            <input class="checkbox" type="checkbox" name="" id="" />
            <div class="hamburger-lines">
              <span class="line line1"></span>
              <span class="line line2"></span>
              <span class="line line3"></span>
            </div>
            <div class="logo">
              <a href="/">
                <h1>@divyanshraj0408</h1>
              </a>
            </div>
            <div class="menu-items">
              <li>
                <a href="/home">./Home</a>
              </li>
              <li>
                <a href="/projects">../projects</a>
              </li>
              <li>
                <a href="https://drive.google.com/file/d/1IShU5OHCDkVJxyUaaPvCATX18QFJC__D/view?usp=sharing">
                  ../resume
                </a>
              </li>
              <li>
                <a href="/contact">../contact</a>
              </li>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default navbar;
