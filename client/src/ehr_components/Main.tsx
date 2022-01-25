import React from "react";
import Navigation from "./common_components/navigation";

import ReduxToastr from "react-redux-toastr";

import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { Route, Switch, Redirect, useRouteMatch } from "react-router-dom";

import Search from "./Search";
import History from "./History";
import NewVisit from "./NewVisit";
import NewPatient from "./NewPatient";
import Visits from "./Visits/";
import Account from "./Account/";
import Reactivate from "./Reactivate";
import Reports from "./Reports/";

import useAuth from "../hooks/useAuth";

export interface MainProps {}

const Main: React.FC<MainProps> = () => {
  const auth = useAuth();
  const { path } = useRouteMatch();

  return (
    <>
      <Navigation />
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        position="top-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
        closeOnToastrClick
      />

      {auth.userData.isDeactivated ? (
        <Reactivate />
      ) : (
        <Switch>
          <Route path={`${path}/search`} component={Search} />
          <Route path={`${path}/history`} component={History} />
          <Route path={`${path}/visits`} component={Visits} />
          <Route path={`${path}/newVisit`} component={NewVisit} />
          <Route path={`${path}/newPatient`} component={NewPatient} />
          <Route path={`${path}/account`} component={Account} />
          <Route path={`${path}/reports`} component={Reports} />
          <Redirect to={`${path}/search`} />
        </Switch>
      )}
    </>
  );
};

export default Main;
