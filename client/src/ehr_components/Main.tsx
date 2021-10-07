import React, { Fragment, useMemo } from "react";
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

export interface MainProps {}

const Main: React.FC<MainProps> = () => {
  const { path } = useRouteMatch();

  return (
    <Fragment>
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

      <Switch>
        <Route path={`${path}/search`} component={Search} />
        <Route path={`${path}/history`} component={History} />
        <Route path={`${path}/visits`} component={Visits} />
        <Route path={`${path}/newVisit`} component={NewVisit} />
        <Route path={`${path}/newPatient`} component={NewPatient} />
        <Route path={`${path}/account`} component={Account} />
        <Redirect to={`${path}/search`} />
      </Switch>
    </Fragment>
  );
};

export default Main;
