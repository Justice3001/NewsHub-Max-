// Navbar.js
import React from 'react';
import newsLogo from '../../img/vector-icon-newspaper-folded-two-260nw-1467310373 (1).jpg'; // Replace with the actual path to your news logo
import '../../styles/navbar.css'

const Navbar = ({ onTopicSelect }) => {
  const handleTopicClick = (topic) => {
    // Trigger the onTopicSelect callback with the selected topic
    onTopicSelect(topic);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="#">
        <img src={newsLogo} alt="News Logo" className="mr-2" /> NewsHub Max+
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a
              className="nav-link"
              href="#"
              onClick={() => handleTopicClick('general')}
            >
              General
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#"
              onClick={() => handleTopicClick('world')}
            >
              World
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#"
              onClick={() => handleTopicClick('nation')}
            >
              Nation
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#"
              onClick={() => handleTopicClick('business')}
            >
              Business
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#"
              onClick={() => handleTopicClick('technology')}
            >
              Technology
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#"
              onClick={() => handleTopicClick('entertainment')}
            >
              Entertainment
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#"
              onClick={() => handleTopicClick('sports')}
            >
              Sports
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#"
              onClick={() => handleTopicClick('science')}
            >
              Science
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#"
              onClick={() => handleTopicClick('health')}
            >
              Health
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
