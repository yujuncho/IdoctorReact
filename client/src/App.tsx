import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Redirect,
  Switch
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Home from "./ehr_components/Home";
import Main from "./ehr_components/Main";
import Loader from "./ehr_components/ui/Loader";
import Auth from "./components/Auth";

import { AuthContextProvider } from "./store/auth-context";
import { useAuth } from "./hooks/auth-hook";

const App: React.FC = () => {
  const { userData, login, logout, checkedStorage } = useAuth();

  let routes;
  if (userData.token) {
    routes = (
      <Switch>
        <Route path="/" exact component={Home} />
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

  if (!checkedStorage) {
    return <Loader />;
  }

  return (
    <AuthContextProvider
      value={{ isLoggedIn: !!userData.token, ...userData, login, logout }}
    >
      <div className="App">
        <Router>{routes}</Router>
      </div>
    </AuthContextProvider>
  );
};

export default App;
