import React, { useEffect, useState } from "react";
import { Grid, Typography, Paper, Divider } from "@material-ui/core/";
import styles from "./Profile.module.css";
import Layout from "../Layout/Layout";
import MapContainer from "../Maps/Map";
import BadgePost from "../Posts/BadgePost";
import ActivityPost from "../Posts/ActivityPost";
import Axios from "axios";
import { useHistory } from "react-router-dom";

const Profile = () => {
  return <Layout Page={Page} />;
};

const Page = ({ match }) => {
  const {
    params: { username },
  } = match;
  const history = useHistory();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const url = `http://127.0.0.1:5000/user/${username}`;
      await Axios.get(url)
        .then((response) => {
          setUser(response.data.data);
        })
        .catch(() => {
          history.push("/404/");
        });
    };

    getUser();
  }, []);

  return user ? (
    <div className={styles.content}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Sidebar user={user} />
        </Grid>
        <Grid item xs={8}>
          <Content />
        </Grid>
      </Grid>
    </div>
  ) : (
    <div></div>
  );
};

const Sidebar = ({ user }) => {
  return (
    <Paper className={styles.paper}>
      <img
        src={`/${user.picture_url}`}
        className={styles.avatar}
        alt="profile"
      />
      <Typography variant="h4" gutterBottom>
        {user.displayName}
      </Typography>
      <Typography variant="h6" gutterBottom>
        @{user.username} ● 10 Friends
      </Typography>
      <br />
      <Typography variant="body2" display="block">
        {user.biography}
      </Typography>
      <br />
      <Typography variant="h6" display="block">
        📍 Hong Kong
      </Typography>
      <br />
      <Divider />
      <br />
      <Typography variant="h6" gutterBottom>
        Badges
      </Typography>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <img
            src="/skyscrapers.png"
            className={styles.badgeImage}
            alt="skyscrapers"
          />
        </Grid>
        <Grid item xs={6}>
          <img src="/noodles.png" className={styles.badgeImage} alt="food" />
        </Grid>
        <Grid item xs={6}>
          <img src="/hiking.png" className={styles.badgeImage} alt="hiking" />
        </Grid>
        <Grid item xs={6}>
          <img
            src="/laugh.png"
            className={styles.badgeImage}
            alt="activities"
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

const Content = () => {
  return (
    <div className={styles.contentDiv}>
      <Paper className={styles.paper}>
        <MapContainer height={"60Vh"} />
      </Paper>
      <BadgePost />
      <ActivityPost />
    </div>
  );
};

export default Profile;
