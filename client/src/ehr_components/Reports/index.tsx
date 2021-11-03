import { useRouteMatch, useLocation } from "react-router";
import { Link, Switch, Route, Redirect } from "react-router-dom";

import PatientVisits from "./PatientVisits";
import Patients from "./Patients";

export default function Reports() {
  const { path } = useRouteMatch();
  const { pathname } = useLocation();

  const getActiveStatus = (destination: string) => {
    return `${path}/${destination}` === pathname
      ? "active border-bottom border-dark"
      : "";
  };

  return (
    <div className="container pb-5">
      <div className="row">
        <div className="col-12 offset-0 col-md-10 offset-md-1">
          <h1 className="text-left w-100 mb-3">Reports</h1>
          <nav className="navbar navbar-expand navbar-light p-0 border-bottom">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  to={`${path}/patients`}
                  className={`nav-link page-scroll ${getActiveStatus(
                    "patients"
                  )}`}
                >
                  Patients
                </Link>
              </li>
              <li className="nav-item  ">
                <Link
                  to={`${path}/visits`}
                  className={`nav-link page-scroll ${getActiveStatus(
                    "visits"
                  )}`}
                >
                  Visits
                </Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path={`${path}/patients`} component={Patients} />
            <Route path={`${path}/visits`} component={PatientVisits} />
            <Redirect to={`${path}/patients`} />
          </Switch>
        </div>
      </div>
    </div>
  );
}
