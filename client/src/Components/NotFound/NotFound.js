import React from "react";
import { Grid, Typography } from "@material-ui/core/";

const NotFound = () => {
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
        404
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Sorry, the page you are looking for does not exist.
      </Typography>
    </Grid>
  );
};

export default NotFound;
