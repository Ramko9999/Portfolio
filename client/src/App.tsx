import React from "react";
import {Route, Router, Switch } from "react-router-dom";
import history from "./History";
import Layout from "./ui/MainLayout";


function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
            <Route path="/" component={Layout}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;