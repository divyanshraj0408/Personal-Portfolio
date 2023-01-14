import './App.css';
import React from "react";
import Nav from './components/navbar/navbar';
import Maincontent from './components/homepage/home';
import Footer from './components/footer/footer';
import Projects from './components/projects/projects';
import Contact from './components/contact/contact';
import {HashRouter as Router, Routes, Route} from 'react-router-dom';


function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Maincontent />} />
        <Route path="/home" element={<Maincontent />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
