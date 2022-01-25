import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Redirect,
  Switch
} from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { reducer as toastrReducer } from "react-redux-toastr";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Home from "./ehr_components/Home";
import Main from "./ehr_components/Main";
import Auth from "./components/Auth";

import { AuthProvider } from "./hooks/useAuth";
import ProtectedRoutes from "./ehr_components/ProtectedRoutes";
import UnprotectedRoutes from "./ehr_components/UnprotectedRoutes";

const App: React.FC = () => {
  const reducers = combineReducers({
    toastr: toastrReducer
  });
  const store = createStore(reducers);

  return (
    <ReduxProvider store={store}>
      <AuthProvider>
        <div className="App">
          <Router>
            <Switch>
              <Route
                path="/main"
                render={() => {
                  return (
                    <ProtectedRoutes>
                      <Main />
                    </ProtectedRoutes>
                  );
                }}
              />
              <Route
                path="/"
                render={() => {
                  return (
                    <UnprotectedRoutes>
                      <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/login" component={Auth} />
                        <Route path="/signup" component={Auth} />
                      </Switch>
                    </UnprotectedRoutes>
                  );
                }}
              />
              <Redirect to="/" />
            </Switch>
          </Router>
        </div>
      </AuthProvider>
    </ReduxProvider>
  );
};

export default App;
