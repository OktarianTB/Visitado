import React from "react";
import { Grid, Typography, Paper } from "@material-ui/core/";
import styles from "./ActivityPost.module.css";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { Link } from "react-router-dom";

const ActivityPost = ({
  username,
  date,
  title,
  location,
  activity,
  content,
  badge,
  profile_picture,
  images,
}) => {
  const url = `/profile/${username}`;
  const d = new Date(date);

  return (
    <Paper className={styles.paper}>
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <img
            src={`/${profile_picture}`}
            className={styles.postProfilePic}
            alt={username}
          />
        </Grid>
        <Grid item xs={8}>
          <Typography
            variant="overline"
            component={Link}
            to={url}
            className={styles.link}
          >
            @{username}
          </Typography>
          <Typography variant="h5">{title}</Typography>
          <Typography variant="caption">
            {location ? `📍 ${location} ` : ""}
            {location && activity ? `● ${activity}` : activity ? activity : ""}
          </Typography>
        </Grid>
        <Grid item xs={2} style={{ textAlign: "right" }}>
          <Typography variant="overline">
            {d.toLocaleDateString("en-US")}
          </Typography>
        </Grid>
      </Grid>
      <br />
      <br />
      <Typography variant="body1">{content}</Typography>
      <br />
      {images && <ImageGrid images={images} />}
      <br />
      {badge && (
        <div>
          <br />
          <Typography variant="body2">Badge Progress: {badge}</Typography>
        </div>
      )}
    </Paper>
  );
};

const ImageGrid = ({ images }) => {
  return (
    <div className={styles.root}>
      <GridList className={styles.gridList} cols={2.5}>
        {images.map((image, i) => (
          <GridListTile key={i}>
            <img src={image} alt={`image-${i}`} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default ActivityPost;
