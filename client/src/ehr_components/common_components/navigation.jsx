import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import { AuthContext } from "../store/auth-context";

function Navigation() {
  const authContext = useContext(AuthContext);
  const history = useHistory();

  const logoutHandler = () => {
    authContext.logout();
    history.push("/");
  };

  return (
    <nav
      id="menu"
      className="navbar  navbar-expand-sm navbar-light bg-light mb-5"
    >
      <Link className="navbar-brand page-scroll" to="/">
        IDoctor
      </Link>
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
            <Link to="/main" className=" nav-link page-scroll">
              Patients
            </Link>
          </li>
          <li className="nav-item">
            <Link to="#about" className="nav-link page-scroll">
              Reports
            </Link>
          </li>
          <li className="nav-item">
            <Link to="#services" className="nav-link page-scroll">
              Account
            </Link>
          </li>
          <li className="nav-item">
            <Link to="#portfolio" className="nav-link page-scroll">
              Help
            </Link>
          </li>
        </ul>
        <form className="form-inline">
          <button onClick={logoutHandler} className="btn btn-outline-secondary">
            Log out
          </button>
        </form>
      </div>
    </nav>
  );
}

export default Navigation;
