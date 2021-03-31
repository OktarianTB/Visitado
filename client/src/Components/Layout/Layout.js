import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Container } from "@material-ui/core/";
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";
import UserContext from "../../Utils/UserContext";

import Navbar from "./Navbar";
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
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const Layout = ({ Page, location, match }) => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(true);
  const { userData } = useContext(UserContext);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  if (!userData.user) {
    history.push("/login");
  }

  return userData.user ? (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar handleDrawerOpen={handleDrawerOpen} open={open} />
      <Sidebar
        handleDrawerClose={handleDrawerClose}
        open={open}
        path={location.pathname}
      />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Page match={match} location={location} />
        </Container>
      </main>
    </div>
  ) : (
    <div></div>
  );
};

export default withRouter(Layout);
