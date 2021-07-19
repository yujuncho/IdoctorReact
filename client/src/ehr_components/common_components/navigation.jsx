import React, { Component } from "react";

export class Navigation extends Component {
  render() {
    return (
      <nav
        id="menu"
        className="navbar  navbar-expand-sm navbar-light bg-light  "
      >
        <a className="navbar-brand page-scroll" href="/">
          IDoctor
        </a>
        <button
          className="navbar-toggler collapsed"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto pr-3">
            <li className="nav-item  ">
              <a href="/main" className=" nav-link page-scroll">
                Patients
              </a>
            </li>
            <li className="nav-item">
              <a href="#about" className="nav-link page-scroll">
                Reports
              </a>
            </li>
            <li className="nav-item">
              <a href="#services" className="nav-link page-scroll">
                Account
              </a>
            </li>
            <li className="nav-item">
              <a href="#portfolio" className="nav-link page-scroll">
                Help
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navigation;
