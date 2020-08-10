import React from "react";
import { BrowserRouter as HashRouter, Switch, Route } from "react-router-dom";

import "./App.css";

import Home from "./pages/home";

function App() {
  return (
    <div>
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
