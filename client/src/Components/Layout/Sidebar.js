import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import UserContext from "../../Utils/UserContext";
import { Link, useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  Divider,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core/";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExploreIcon from "@material-ui/icons/Explore";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";

const drawerWidth = 230;

const useStyles = makeStyles((theme) => ({
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 8px",
    backgroundColor: "#ffb74d",
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  title: {
    marginRight: 15,
  },
}));

const Sidebar = ({ profileUrl }) => {
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      open={true}
    >
      <div className={classes.toolbarIcon}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <img
            src="/logo-transparent.png"
            style={{ maxWidth: 40, maxHeight: 40, marginRight: 20 }}
          />
          <Typography
            component="h1"
            variant="h5"
            color="inherit"
            className={classes.title}
          >
            Visitado
          </Typography>
        </div>
      </div>
      <Divider key="divider1" />
      <DrawerMenu profileUrl={profileUrl} />
    </Drawer>
  );
};

const DrawerMenu = ({ profileUrl }) => {
  const path = useLocation().pathname.split("/")[1];
  const history = useHistory();
  const { setUserData } = useContext(UserContext);

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
    history.push("/login");
  };

  console.log(profileUrl);

  return (
    <div style={{ backgroundColor: "#ffcc80", height: "100%" }}>
      <List key="main">
        <ListItem
          key="home"
          button
          component={Link}
          to="/"
          style={{
            backgroundColor: path === "" ? "#f9bf72" : "",
            paddingLeft: 25,
          }}
        >
          <ListItemIcon key="homeicon">
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" key="hometext" />
        </ListItem>
        <ListItem
          key="profile"
          button
          component={Link}
          to={profileUrl}
          style={{
            backgroundColor: path === "profile" ? "#f9bf72" : "",
            paddingLeft: 25,
          }}
        >
          <ListItemIcon key="profileicon">
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" key="profiletext" />
        </ListItem>
        <ListItem
          key="explore"
          button
          component={Link}
          to="/explore"
          style={{
            backgroundColor: path === "explore" ? "#f9bf72" : "",
            paddingLeft: 25,
          }}
        >
          <ListItemIcon key="exploreicon">
            <ExploreIcon />
          </ListItemIcon>
          <ListItemText primary="Explore" key="exploretext" />
        </ListItem>
        <ListItem
          key="badges"
          button
          component={Link}
          to="/badges"
          style={{
            backgroundColor: path === "badges" ? "#f9bf72" : "",
            paddingLeft: 25,
          }}
        >
          <ListItemIcon key="badgeicon">
            <EmojiEventsIcon />
          </ListItemIcon>
          <ListItemText primary="Badges" key="badgetext" />
        </ListItem>
      </List>
      <Divider key="divider2" />
      <List key="second">
        <ListItem
          key="settings"
          button
          component={Link}
          to="/settings"
          style={{
            backgroundColor: path === "settings" ? "#f9bf72" : "",
            paddingLeft: 25,
          }}
        >
          <ListItemIcon key="settingsicon">
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" key="settingstext" />
        </ListItem>
        <ListItem
          key="logout"
          button
          onClick={logout}
          style={{ paddingLeft: 25 }}
        >
          <ListItemIcon key="logouticon">
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Log Out" key="logouttext" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
