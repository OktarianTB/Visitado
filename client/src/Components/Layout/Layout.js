import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, CssBaseline } from "@material-ui/core/";
import { withRouter, useHistory } from "react-router-dom";
import UserContext from "../../Utils/UserContext";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Axios from "axios";
import Sidebar from "./Sidebar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingBottom: theme.spacing(4),
  },
}));

const Layout = ({ Page, location, match }) => {
  const classes = useStyles();
  const history = useHistory();
  const { userData, setUserData } = useContext(UserContext);
  const [profileUrl, setProfileUrl] = useState("/");

  const redirectToPage = () => {
    let path = "/add-activity";
    history.push(path);
  };

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

      const tokenIsValid = await Axios.post("/api/auth/validate", null, {
        headers,
      });

      if (tokenIsValid.data) {
        await Axios.get("/api/auth/user", { headers })
          .then((response) => {
            setUserData({
              token,
              user: response.data.data,
            });
            setProfileUrl(`/profile/${response.data.data.username}`);
          })
          .catch(() => {
            setUserData({ token: undefined, user: undefined });
          });
      } else {
        setUserData({ token: undefined, user: undefined });
      }
    };

    if (!userData.user) {
      checkLoggedIn();
    }
  }, []);

  return userData.user ? (
    <div className={classes.root}>
      <CssBaseline />
      <Sidebar profileUrl={profileUrl} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Page match={match} location={location} />
        </Container>
        <Fab
          color="primary"
          aria-label="add"
          size="large"
          style={{
            margin: 0,
            top: "auto",
            right: 50,
            bottom: 50,
            left: "auto",
            position: "fixed",
          }}
          onClick={redirectToPage}
        >
          <AddIcon />
        </Fab>
      </main>
    </div>
  ) : (
    <div></div>
  );
};

export default withRouter(Layout);
