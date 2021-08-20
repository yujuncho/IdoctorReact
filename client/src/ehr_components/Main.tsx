import React, { Fragment, useEffect } from "react";
import Navigation from "./common_components/navigation";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import ReduxToastr, { reducer as toastrReducer } from "react-redux-toastr";

import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { Route, Switch, Redirect, useRouteMatch } from "react-router-dom";

import Search from "./search";
import History from "./history";
import Visit from "./visit";
import NewPatient from "./NewPatient";

export interface MainProps {}

const Main: React.FC<MainProps> = () => {
  const reducers = combineReducers({
    toastr: toastrReducer
  });
  const store = createStore(reducers);

  const { path } = useRouteMatch();

  return (
    <Fragment>
      <Navigation />
      <Provider store={store}>
        <div>
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
        </div>
      </Provider>

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
