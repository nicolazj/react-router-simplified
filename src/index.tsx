import * as React from "react";
import { render } from "react-dom";

import "./styles.css";

import { LocationProvider, Router, Route, Link } from "./router";

import { globalHistory } from "./router/history";
const Home = ({ location }) => {
  return (
    <div>
      Home
      <div>we are at {location.pathname}</div>
      <Link to="/about">to about</Link>
    </div>
  );
};
const About = ({ location }) => {
  return (
    <div>
      About
      <div>we are at {location.pathname}</div>
      <Link to="/">to home</Link>
    </div>
  );
};
function App() {
  return (
    <LocationProvider history={globalHistory}>
      <Router>
        <Route path="/" comp={Home} />
        <Route path="/about" comp={About} />
      </Router>
    </LocationProvider>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
