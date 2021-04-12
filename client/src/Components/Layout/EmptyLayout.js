import React from "react";
import { Paper, Typography } from "@material-ui/core/";

import Layout from "../Layout/Layout";

const EmptyLayout = () => {
  return <Layout Page={Page} />;
};

const Page = () => {
  console.log("here");
  return (
    <Paper>
      <Typography>Hello</Typography>
    </Paper>
  );
};

export default EmptyLayout;
