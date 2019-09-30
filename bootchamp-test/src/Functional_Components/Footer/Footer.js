import React from 'react';
import './Footer.css';
import {Link} from 'react-router-dom';

const Footer = () => {
  return (
    <div className="Outer-Footer">
      <nav className="Inner-Footer">
        {' '}
        <div className="Footer-Link-Wrap">
          <Link to="/About" className="indiv-link">
            About BootChamp
          </Link>
        </div>
        <div className="Footer-Link-Wrap">
          <a href="github.com/kirbycampbell" className="indiv-link">
            Creators
          </a>
        </div>
        <div className="Footer-Link-Wrap">
          <a
            className="indiv-link"
            href="https://github.com/kirbycampbell/bootchamptest/tree/master/bootchamp-test/src/server/routes/api/API_Docs"
          >
            Documentation
          </a>{' '}
        </div>
        <div className="Footer-Link-Wrap">
          <a
            className="indiv-link"
            href="https://github.com/kirbycampbell/bootchamptest/tree/master/bootchamp-test/src/server/routes/api"
          >
            Endpoints
          </a>{' '}
        </div>
        <div className="Footer-Link-Wrap">
          <a href="github.com/kirbycampbell" className="indiv-link">
            Jobs
          </a>{' '}
        </div>
        <span className="navbar-item" className="indiv-link">
          <a
            href="https://github.com/kirbycampbell/bootchamptest/tree/master/bootchamp-test/src"
            className="button is-primary "
          >
            <span className="icon" className="indiv-link">
              <i className="fab fa-github"></i>
            </span>
            <span>Source Code</span>
          </a>
        </span>
      </nav>
    </div>
  );
};

export default Footer;
