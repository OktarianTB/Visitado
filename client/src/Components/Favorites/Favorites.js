import React from "react";
import { Grid, Typography } from "@material-ui/core/";

import Layout from "../Layout/Layout";

const Favorites = () => {
  return <Layout Page={Page} />;
};

const Page = () => {
  return (
    <Grid container spacing={3}>
      <Typography variant="h1" component="h2" gutterBottom>
        FAVORITES
      </Typography>
    </Grid>
  );
};

export default Favorites;
