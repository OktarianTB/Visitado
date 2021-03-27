import React from "react";
import { Grid, Typography, Paper } from "@material-ui/core/";
import styles from "./BadgePost.module.css";

const BadgePost = () => {
  return (
    <Paper className={styles.paper}>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <img src="/hiking.png" alt="hiking" className={styles.badgeImage} />
        </Grid>
        <Grid item xs={9}>
          <div className={styles.text}>
            <Typography variant="subtitle1">Baby Josch completed:</Typography>
            <Typography variant="h5">Hong Kong Hiking Badge</Typography>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BadgePost;
