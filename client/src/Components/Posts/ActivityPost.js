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
}) => {
  const url = `/profile/${username}`;
  const d = new Date(date);

  return (
    <Paper className={styles.paper}>
      <Grid container spacing={1}>
        <Grid item xs={10}>
          <Typography
            variant="overline"
            component={Link}
            to={url}
            className={styles.link}
          >
            @{username}
          </Typography>
        </Grid>
        <Grid item xs={2} style={{ textAlign: "right" }}>
          <Typography variant="overline">
            {d.toLocaleDateString("en-US")}
          </Typography>
        </Grid>
      </Grid>
      <Typography variant="h5">{title}</Typography>
      <Typography variant="caption">
        {location ? `📍 ${location} ` : ""}
        {location && activity ? `● ${activity}` : activity ? activity : ""}
      </Typography>
      <br />
      <br />
      <Typography variant="body1">{content}</Typography>

      {badge ? (
        <div>
          <br />
          <Typography variant="body2">Badge Progress: {badge}</Typography>
        </div>
      ) : (
        <div></div>
      )}
    </Paper>
  );
};

const ImageGrid = () => {
  return (
    <div className={styles.root}>
      <GridList className={styles.gridList} cols={2.5}>
        {tileData.map((tile) => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

const tileData = [
  {
    img: "/hike1.jpg",
    title: "Image",
    author: "author",
  },
  {
    img: "/hike2.jpg",
    title: "Image",
    author: "author",
  },
  {
    img: "/hike3.jpg",
    title: "Image",
    author: "author",
  },
];

export default ActivityPost;
