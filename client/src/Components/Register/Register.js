import React from "react";
import { Grid, Typography } from "@material-ui/core/";

const Register = () => {
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
        Register
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Work In Progress...
      </Typography>
    </Grid>
  );
};

export default Register;
