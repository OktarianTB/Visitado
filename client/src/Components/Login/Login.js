import React from "react";
import styles from "./Login.module.css";
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Typography,
  Container,
} from "@material-ui/core/";

const Login = () => {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={styles.paper}>
        <img src="koala.png" alt="koala logo" className={styles.logo} />
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
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
      </div>
    </Container>
  );
};

export default Login;
