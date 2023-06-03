import {Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Layout from "./ui/MainLayout";

function App() {
    return (
        <Router>
          <Switch>
              <Route path="/" component={Layout}></Route>
          </Switch>
        </Router>
    );
}

export default App;
