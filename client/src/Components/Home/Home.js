import React from "react";
import { Grid, Typography } from "@material-ui/core/";

import Layout from "../Layout/Layout";

const Home = () => {
  return <Layout Page={Page} />;
};

const Page = () => {
  return (
    <Grid container spacing={3}>
      <Typography variant="h1" component="h2" gutterBottom>
        HOME
      </Typography>
    </Grid>
  );
};

export default Home;
