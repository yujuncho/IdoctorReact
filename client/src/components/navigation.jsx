import React, { Component } from "react";

export class Navigation extends Component {
  render() {
    return (
      <nav
        id="menu"
        className="navbar navbar-default navbar-expand-sm navbar-light fixed-top"
      >
        <a className="navbar-brand page-scroll" href="#page-top">
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
          <ul className="navbar-nav ml-auto">
            <li className="nav-item  ">
              <a href="#features" className=" nav-link page-scroll">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a href="#about" className="nav-link page-scroll">
                About
              </a>
            </li>
            <li className="nav-item">
              <a href="#services" className="nav-link page-scroll">
                Services
              </a>
            </li>
            {/* <li className="nav-item">
              <a href="#portfolio" className="nav-link page-scroll">
                Gallery
              </a>
            </li> */}
            <li className="nav-item">
              <a href="#testimonials" className="nav-link page-scroll">
                Testimonials
              </a>
            </li>
            {/* <li className="nav-item">
              <a href="#team" className="nav-link page-scroll">
                Team
              </a>
            </li> */}
            <li className="nav-item">
              <a href="#contact" className=" nav-link page-scroll">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navigation;
