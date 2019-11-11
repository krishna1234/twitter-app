import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from "./Home";
import "./App.css";

export default class App extends React.Component {
  render() {
    return(
      <Router>      
        <Switch>
        <Route path="/:q?" component={({ match }) => (
          <Home q={match.params.q} />
        )}/>
        </Switch>      
    </Router>      
    )
  }
}