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
    backgroundColor: "#ffcc80",
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  title: {},
}));

const Sidebar = () => {
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
        <Typography
          component="h1"
          variant="h5"
          color="inherit"
          className={classes.title}
        >
          Visitado
        </Typography>
      </div>
      <Divider />
      <DrawerMenu />
    </Drawer>
  );
};

const DrawerMenu = () => {
  const path = useLocation().pathname.split("/")[1];
  const history = useHistory();
  const { userData, setUserData } = useContext(UserContext);

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
    history.push("/login");
  };

  return (
    <div>
      <List>
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
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem
          key="profile"
          button
          component={Link}
          to={`/profile/${userData.user.username}`}
          style={{
            backgroundColor: path === "profile" ? "#f9bf72" : "",
            paddingLeft: 25,
          }}
        >
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
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
          <ListItemIcon>
            <ExploreIcon />
          </ListItemIcon>
          <ListItemText primary="Explore" />
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
          <ListItemIcon>
            <EmojiEventsIcon />
          </ListItemIcon>
          <ListItemText primary="Badges" />
        </ListItem>
      </List>
      <Divider />
      <List>
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
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem
          key="logout"
          button
          onClick={logout}
          style={{ paddingLeft: 25 }}
        >
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Log Out" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
