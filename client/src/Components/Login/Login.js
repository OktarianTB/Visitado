import React from "react";
import styles from "./Login.module.css";
import { Button, TextField, Link, Typography, Grid } from "@material-ui/core/";

const Login = () => {
  return (
    <Grid
      container
      spacing={3}
      direction="row"
      alignItems="center"
      justify="center"
      style={{ minHeight: "95vh" }}
    >
      <Grid xs={6}>
        <img src="koala.png" alt="koala logo" className={styles.logo} />
      </Grid>

      <Grid xs={6}>
        <div className={styles.login}>
          <Typography
            component="h1"
            variant="h5"
            style={{ width: "50%", textAlign: "center" }}
          >
            Log In
          </Typography>
          <LoginForm />
        </div>
      </Grid>
    </Grid>
  );
};

const LoginForm = () => {
  return (
    <form className={styles.form}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <Button
        type="submit"
        fullWidth
        disableElevation
        variant="contained"
        color="primary"
        className={styles.submit}
      >
        Sign In
      </Button>
      <Link href="/register" variant="body2">
        {"Don't have an account?"}
      </Link>
    </form>
  );
};

export default Login;
