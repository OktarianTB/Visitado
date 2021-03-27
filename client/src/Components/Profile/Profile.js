import React from "react";
import { Grid, Typography, Paper, Divider } from "@material-ui/core/";
import styles from "./Profile.module.css";
import Layout from "../Layout/Layout";
import MapContainer from "../Maps/Map";
import BadgePost from "../Posts/BadgePost";
import ActivityPost from "../Posts/ActivityPost";

const Profile = () => {
  return <Layout Page={Page} />;
};

const Page = () => {
  return (
    <div className={styles.content}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Sidebar />
        </Grid>
        <Grid item xs={8}>
          <Content />
        </Grid>
      </Grid>
    </div>
  );
};

const Sidebar = () => {
  return (
    <Paper className={styles.paper}>
      <img src="/avatar.png" className={styles.avatar} alt="profile" />
      <Typography variant="h4" gutterBottom>
        Baby Josch
      </Typography>
      <Typography variant="h6" gutterBottom>
        @baby_josch
      </Typography>
      <br />
      <Typography variant="body2" display="block">
        Hi! I'm Josch, a super cute human being! I love planes and traveling.
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
        <MapContainer />
      </Paper>
      <BadgePost />
      <ActivityPost />
    </div>
  );
};

export default Profile;
