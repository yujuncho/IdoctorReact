import React, { Fragment } from "react";
import Navigation from "./common_components/navigation";

import ReduxToastr from "react-redux-toastr";

import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { Route, Switch, Redirect, useRouteMatch } from "react-router-dom";

import Search from "./Search";
import History from "./History";
import Visit from "./Visit";
import NewPatient from "./NewPatient";

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
        <Route path={`${path}/visit`} component={Visit} />
        <Route path={`${path}/newPatient`} component={NewPatient} />
        <Redirect to={`${path}/search`} />
      </Switch>
    </Fragment>
  );
};

export default Main;
