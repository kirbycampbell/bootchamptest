import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="hero-foot border-top">
      <nav className="tabs">
        <div className="container">
          <ul>
            <li className="is-active">
              <Link to="/About">About BootChamp</Link>
            </li>
            <li>
              <a>Creators</a>
            </li>
            <li>
              <a href="https://github.com/kirbycampbell/bootchamptest/tree/master/bootchamp-test/src/server/routes/api/API_Docs">
                Documentation
              </a>
            </li>
            <li>
              <a href="https://github.com/kirbycampbell/bootchamptest/tree/master/bootchamp-test/src/server/routes/api">
                Endpoints
              </a>
            </li>
            <li>
              <a>Jobs</a>
            </li>
            <li>
              <span className="navbar-item">
                <a
                  href="https://github.com/kirbycampbell/bootchamptest/tree/master/bootchamp-test/src"
                  className="button is-primary "
                >
                  <span className="icon">
                    <i className="fab fa-github"></i>
                  </span>
                  <span>Source Code</span>
                </a>
              </span>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Footer;
