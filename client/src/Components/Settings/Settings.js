import React from "react";
import { Grid, Typography } from "@material-ui/core/";

import Layout from "../Layout/Layout";

const Settings = () => {
  return <Layout Page={Page} />;
};

const Page = () => {
  return (
    <Grid container spacing={3}>
      <Typography variant="h1" component="h2" gutterBottom>
        SETTINGS
      </Typography>
    </Grid>
  );
};

export default Settings;
