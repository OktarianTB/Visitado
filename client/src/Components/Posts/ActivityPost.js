import React from "react";
import { Grid, Typography, Paper } from "@material-ui/core/";
import styles from "./ActivityPost.module.css";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

const ActivityPost = () => {
  return (
    <Paper className={styles.paper}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Typography variant="h6">📍 The Peak, Hong Kong</Typography>
        </Grid>
        <Grid item xs={6} style={{ textAlign: "right" }}>
          <Typography variant="overline">27/03/2021</Typography>
        </Grid>
      </Grid>
      <br />
      <Typography variant="body1">
        I just got back from a wonderful trip with my boyfriend. We had some
        wonderful views. Check these pictures out:
      </Typography>
      <br />
      <ImageGrid />
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
