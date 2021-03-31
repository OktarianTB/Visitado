import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import styles from "./Login.module.css";
import { Button, TextField, Link, Typography, Grid } from "@material-ui/core/";
import UserContext from "../../Utils/UserContext";
import Axios from "axios";

const Login = () => {
  const history = useHistory();
  const { userData } = useContext(UserContext);

  if (userData.user) {
    history.push("/");
  }

  return userData ? (
    <div></div>
  ) : (
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
  const history = useHistory();
  const { setUserData } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
    setUsernameError("");
    setPasswordError("");
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
    setUsernameError("");
    setPasswordError("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const url = "http://127.0.0.1:5000/auth/login";
    const user = { username, password };
    console.log(user);

    await Axios.post(url, user)
      .then((response) => {
        console.log(response);
        setUserData({
          token: response.data.token,
          user: response.data.user,
        });
        localStorage.setItem("auth-token", response.data.token);
        history.push("/");
      })
      .catch(() => {
        setUsernameError("Invalid credentials. Please try again.");
        setPasswordError("Invalid credentials. Please try again.");
      });
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <TextField
        variant="outlined"
        margin="normal"
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
        value={password}
        onChange={onChangePassword}
        error={passwordError ? true : false}
        helperText={passwordError}
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
