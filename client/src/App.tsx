import React, { useState, useCallback } from "react";
import {
  Route,
  BrowserRouter as Router,
  Redirect,
  Switch
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Home from "./ehr_components/home";
import Main from "./ehr_components/Main";
import Auth from "./components/Auth";

import { AuthContextProvider } from "./ehr_components/store/auth-context";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;
  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/main" component={Main} />
        <Redirect to="/main" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Auth} />
        <Route path="/signup" component={Auth} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContextProvider value={{ isLoggedIn, login, logout }}>
      <div className="App">
        <Router>{routes}</Router>
      </div>
    </AuthContextProvider>
  );
};

export default App;
