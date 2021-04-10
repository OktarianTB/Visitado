import React from "react";
import { Grid, Typography, Paper } from "@material-ui/core/";
import styles from "./BadgeCategoryPost.module.css";

const BadgeCategoryPost = ({ image, name, group, category }) => {
  const image_url = `/${image}`;
  return (
    <Paper className={styles.paper}>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <img src={image_url} alt={category} className={styles.badgeImage} />
        </Grid>
        <Grid item xs={9}>
          <div className={styles.text}>
            <Typography variant="subtitle1">{name} completed:</Typography>
            <Typography variant="h5">
              {group}: '{category}' Badge
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BadgeCategoryPost;
