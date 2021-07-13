import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./ehr_components/home";
import Main from "./ehr_components/main";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={Home} />
        <Route path="/main" component={Main} />
      </div>
    </Router>
  );
};

export default App;
