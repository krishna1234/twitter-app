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
    console.log(process.env)
    return(
      <Router basename={process.env.PUBLIC_URL}>      
        <Switch>
        <Route path={process.env.PUBLIC_URL + "/:q?"}  component={({ match }) => (
          <Home q={match.params.q} />
        )}/>
        </Switch>      
    </Router>      
    )
  }
}