import React from "react";
import { Grid, Typography } from "@material-ui/core/";

const Favorites = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "70vh" }}
    >
      <Typography variant="h1" component="h2" gutterBottom>
        Favorites
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Work In Progress...
      </Typography>
    </Grid>
  );
};

export default Favorites;
