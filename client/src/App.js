import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  Badges,
  Explore,
  Home,
  NotFound,
  Profile,
  Favorites,
  Settings,
  Login,
  Register,
} from "./Components";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/badges" exact component={Badges} />
        <Route path="/explore" exact component={Explore} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/favorites" exact component={Favorites} />
        <Route path="/settings" exact component={Settings} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
