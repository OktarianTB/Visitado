import React, { useState } from "react";
import styles from "./Register.module.css";
import {
  Grid,
  Link,
  Button,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core/";
import { useHistory } from "react-router-dom";
import Axios from "axios";

const Register = () => {
  return (
    <Grid
      container
      spacing={3}
      direction="row"
      alignItems="center"
      justify="center"
      style={{ minHeight: "95vh", maxWidth: "95vw" }}
    >
      <Grid item xs={6}>
        <img src="koala.png" alt="koala logo" className={styles.logo} />
      </Grid>

      <Grid item xs={6}>
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
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [displayNameError, setDisplayNameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const onChangeUsername = (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);

    if (newUsername.length < 4 || newUsername.length > 15) {
      setUsernameError("Username must be between 4 and 15 characters.");
    } else {
      setUsernameError("");
    }
  };

  const onChangeDisplayName = (e) => {
    const newDisplayName = e.target.value;
    setDisplayName(newDisplayName);

    if (newDisplayName.length < 4 || newDisplayName.length > 15) {
      setDisplayNameError("Display Name must be between 4 and 15 characters.");
    } else {
      setDisplayNameError("");
    }
  };

  const onChangePassword = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (newPassword.length < 6 || newPassword.length > 20) {
      setPasswordError("Password must be between 6 and 20 characters.");
    } else {
      setPasswordError("");
    }
  };

  const onChangeTerms = (e) => {
    setIsChecked(e.target.checked);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!usernameError && !passwordError && !displayNameError) {
      const url = "http://127.0.0.1:5000/auth/register";
      const newUser = { username, password, displayName };

      await Axios.post(url, newUser)
        .then(() => {
          history.push("/login");
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
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
            value={username}
            onChange={onChangeUsername}
            error={usernameError ? true : false}
            helperText={usernameError}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="displayname"
            label="Display Name"
            name="displayname"
            autoComplete="displayname"
            value={displayName}
            onChange={onChangeDisplayName}
            error={displayNameError ? true : false}
            helperText={displayNameError}
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
            value={password}
            onChange={onChangePassword}
            error={passwordError ? true : false}
            helperText={passwordError}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="primary" />}
            onChange={onChangeTerms}
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
        disabled={!isChecked}
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
