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
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#ff1744",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
};

export default App;
