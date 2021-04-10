import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, CssBaseline } from "@material-ui/core/";
import { withRouter, useHistory } from "react-router-dom";
import UserContext from "../../Utils/UserContext";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

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
  const { userData } = useContext(UserContext);

  const redirectToPage = () => {
    let path = "/add-activity";
    history.push(path);
  };

  if (!userData.user) {
    history.push("/login");
  }

  return userData.user ? (
    <div className={classes.root}>
      <CssBaseline />
      <Sidebar />
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
