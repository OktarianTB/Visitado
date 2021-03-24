import React from "react";
import {
  Grid,
  Typography,
  Button,
  TextField,
  Container,
} from "@material-ui/core/";
import { useSnackbar } from "notistack";
import styles from "./Settings.module.css";
import Layout from "../Layout/Layout";

const Settings = () => {
  return <Layout Page={Page} />;
};

const Page = () => {
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    enqueueSnackbar("Changes saved!", {
      variant: "success",
      preventDuplicate: true,
      autoHideDuration: 2000,
    });
  };

  return (
    <Container component="main" maxWidth="sm">
      <div className={styles.main}>
        <Typography component="h1" variant="h5">
          Change Settings
        </Typography>
        <form className={styles.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Username"
                id="outlined-margin-normal"
                margin="normal"
                variant="outlined"
                value="@oktarian"
                disabled
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email Address"
                id="outlined-margin-normal"
                margin="normal"
                variant="outlined"
                value="oktotb@gmail.com"
                disabled
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Display Name"
                id="outlined-margin-normal"
                margin="normal"
                variant="outlined"
                value="Oktarian"
                fullWidth
              />
            </Grid>
          </Grid>
        </form>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={handleClick}
        >
          Save Changes
        </Button>
      </div>
    </Container>
  );
};

export default Settings;
