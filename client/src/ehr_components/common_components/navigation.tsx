import { Link, useHistory } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

function Navigation() {
  const auth = useAuth();
  const history = useHistory();

  const logoutHandler = () => {
    auth.logout();
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

      {!auth.userData.isDeactivated && (
        <>
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
                <Link to="/main" className=" nav-link page-scroll">
                  Patients
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/main/reports" className="nav-link page-scroll">
                  Reports
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/main/account" className="nav-link page-scroll">
                  Account
                </Link>
              </li>
            </ul>
            <form
              className={`form-inline justify-content-center mt-2 mt-sm-0 ml-0 ml-sm-2`}
            >
              <button
                onClick={logoutHandler}
                className="btn btn-outline-secondary"
              >
                Log out
              </button>
            </form>
          </div>
        </>
      )}
      {auth.userData.isDeactivated && (
        <form className={`form-inline justify-content-center ml-auto`}>
          <button onClick={logoutHandler} className="btn btn-outline-secondary">
            Log out
          </button>
        </form>
      )}
    </nav>
  );
}

export default Navigation;
