import React, { Fragment, useState, useContext } from "react";
import Navigation from "./common_components/navigation";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import ReduxToastr, {
  reducer as toastrReducer,
  toastr
} from "react-redux-toastr";

import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
import Search from "./search";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Link,
  Redirect,
  useRouteMatch
} from "react-router-dom";
import History from "./history";
import Visit from "./visit";
import NewPatient from "./NewPatient";

// import ".././App.css";

export interface MainProps {}

const Main: React.FC<MainProps> = () => {
  const reducers = combineReducers({
    toastr: toastrReducer
  });
  const store = createStore(reducers);
  let { path } = useRouteMatch();
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
            //  getState={state => state.toastr} // This is the default
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar
            closeOnToastrClick
          />
        </div>
      </Provider>

      {/* <p> Main Page</p> */}

      <Router>
        <Switch>
          <Route path="/main/search" component={Search} />
          <Route path="/main/history" component={History} />
          <Route path="/main/visit" component={Visit} />
          <Route path="/main/newPatient" component={NewPatient} />
          <Redirect to="/main/search" />
        </Switch>
      </Router>
    </Fragment>
  );
};

export default Main;
