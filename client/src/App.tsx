import React from "react";
import {Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Layout from "./ui/MainLayout";

function App() {
    return (
      <div className="App" style = {
        {
          backgroundColor: "#dae5ed",
          fontFamily: "Roboto Mono"
        }
      }>
        <Router>
          <Switch>
              <Route path="/" component={Layout}></Route>
          </Switch>
        </Router>
      </div>
    );
}

export default App;
