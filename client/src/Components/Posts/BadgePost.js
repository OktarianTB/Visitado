import React from "react";
import { Grid, Typography, Paper } from "@material-ui/core/";
import styles from "./BadgePost.module.css";

const BadgePost = ({ image, name, badge, date }) => {
  const image_url = `/${image}`;
  const d = new Date(date);

  return (
    <Paper className={styles.paper}>
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <img src={image_url} alt={name} className={styles.badgeImage} />
        </Grid>
        <Grid item xs={10}>
          <div className={styles.text}>
            <Typography variant="body1">
              {name} obtained the '{badge}' badge!
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              {d.toLocaleDateString("en-US")}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BadgePost;
