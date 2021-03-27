import React from "react";
import styles from "./Register.module.css";
import {
  Grid,
  Link,
  Button,
  Typography,
  CssBaseline,
  Container,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core/";

const Register = () => {
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
        <div className={styles.register}>
          <Typography
            component="h1"
            variant="h5"
            style={{ width: "50%", textAlign: "center", marginBottom: 20 }}
          >
            Register
          </Typography>
          <RegisterForm />
        </div>
      </Grid>
    </Grid>
  );
};

const RegisterForm = () => {
  return (
    <form className={styles.form}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="primary" />}
            label={
              <Link href="/terms.txt">
                I agree to the terms and conditions.
              </Link>
            }
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={styles.submit}
      >
        Register
      </Button>
      <Link href="/login" variant="body2">
        {"Already have an account?"}
      </Link>
    </form>
  );
};

export default Register;
