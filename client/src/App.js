import React, { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import {
  BadgeGroup,
  BadgeCategories,
  BadgeContent,
  Explore,
  Home,
  NotFound,
  Profile,
  Favorites,
  Settings,
  Login,
  Register,
  AddActivity,
  AddBadges,
} from "./Components";
import UserContext from "./Utils/UserContext";
import Axios from "axios";

const App = () => {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  const url = "https://visitado-server.herokuapp.com/";

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");

      if (token == null) {
        localStorage.setItem("auth-token", "");
        token = "";
        setUserData({ token: undefined, user: undefined });
        return;
      }

      const headers = {
        "x-auth-token": token,
      };

      const tokenIsValid = await Axios.post(url + "/auth/validate", null, {
        headers,
      });

      if (tokenIsValid.data) {
        await Axios.get(url + "/auth/user", { headers })
          .then((response) => {
            setUserData({
              token,
              user: response.data.data,
            });
          })
          .catch(() => {
            setUserData({ token: undefined, user: undefined });
          });
      } else {
        setUserData({ token: undefined, user: undefined });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <Router>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Switch>
          <PrivateRoute path="/" exact component={Home} />
          <PrivateRoute path="/badges" exact component={BadgeGroup} />
          <PrivateRoute
            path="/badges/:badgeGroup"
            exact
            component={BadgeCategories}
          />
          <PrivateRoute
            path="/badges/:badgeGroup/:badgeCategory"
            exact
            component={BadgeContent}
          />
          <PrivateRoute path="/explore" exact component={Explore} />
          <PrivateRoute path="/profile/:username" exact component={Profile} />
          <PrivateRoute path="/favorites" exact component={Favorites} />
          <PrivateRoute path="/settings" exact component={Settings} />
          <PrivateRoute path="/add-activity" exact component={AddActivity} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route component={NotFound} />
        </Switch>
      </UserContext.Provider>
    </Router>
  );
};

const PrivateRoute = ({ children, ...rest }) => {
  const { userData } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        userData.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default App;
