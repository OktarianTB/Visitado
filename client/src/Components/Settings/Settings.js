import React, { useState, useContext } from "react";
import {
  Grid,
  Typography,
  Button,
  TextField,
  Container,
} from "@material-ui/core/";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useSnackbar } from "notistack";
import styles from "./Settings.module.css";
import Layout from "../Layout/Layout";
import UserContext from "../../Utils/UserContext";
import Axios from "axios";

const Settings = () => {
  return <Layout Page={Page} />;
};

const Page = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { userData } = useContext(UserContext);
  const [displayName, setDisplayName] = useState(userData.user.displayName);
  const [displayNameError, setDisplayNameError] = useState("");
  const [biography, setBiography] = useState(userData.user.biography);
  const [locationName, setLocationName] = useState(userData.user.location);
  const [locationError, setLocationError] = useState("");
  const [profilePicture, setProfilePicture] = useState({
    name: `Profile Picture ${userData.user.picture_url.slice(7, 8)}`,
    url: userData.user.picture_url,
  });

  const handleClick = () => {
    enqueueSnackbar("Changes saved!", {
      variant: "success",
      preventDuplicate: true,
      autoHideDuration: 2000,
    });
  };

  const onChangeBiography = (e) => {
    const newBiography = e.target.value;
    setBiography(newBiography);
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

  const onChangeLocation = (e) => {
    const newLocation = e.target.value;
    setLocationName(newLocation);

    if (newLocation.length < 4 || newLocation.length > 20) {
      setLocationError("Location must be between 4 and 20 characters.");
    } else {
      setLocationError("");
    }
  };

  const onChangeProfilePicture = (event, value) => {
    setProfilePicture(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!locationError && !displayNameError) {
      const url = "http://127.0.0.1:5000/user/update";
      const headers = {
        "x-auth-token": userData.token,
      };
      const newUserInfo = {
        displayName,
        biography,
        location: locationName,
        picture_url: profilePicture.url,
      };

      await Axios.post(url, newUserInfo, { headers })
        .then((response) => {
          window.location.reload();
        })
        .catch(() => {});
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <div className={styles.main}>
        <Typography component="h1" variant="h5">
          Change Settings
        </Typography>
        <form className={styles.form} onSubmit={onSubmit}>
          <Grid container spacing={2} justify="center">
            <Grid item xs={12}>
              <TextField
                label="Username"
                id="outlined-margin-normal"
                margin="normal"
                variant="outlined"
                value={`@${userData.user.username}`}
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
                value={displayName}
                fullWidth
                onChange={onChangeDisplayName}
                error={displayNameError ? true : false}
                helperText={displayNameError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Location"
                id="outlined-margin-normal"
                margin="normal"
                variant="outlined"
                value={locationName}
                fullWidth
                onChange={onChangeLocation}
                error={locationError ? true : false}
                helperText={locationError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Biography"
                id="outlined-margin-normal"
                multiline
                rows={3}
                margin="normal"
                variant="outlined"
                value={biography}
                fullWidth
                onChange={onChangeBiography}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                id="combo-box-demo"
                openOnFocus
                options={profile_pictures}
                getOptionLabel={(pp) => pp.name}
                onChange={onChangeProfilePicture}
                style={{ marginTop: 10 }}
                value={profilePicture}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Profile Picture"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Typography align="center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disableElevation
                onClick={handleClick}
                className={styles.submit}
              >
                Save Changes
              </Button>
            </Typography>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

const profile_pictures = [
  { name: "Profile Picture 0", url: "profile0.png" },
  { name: "Profile Picture 1", url: "profile1.png" },
  { name: "Profile Picture 2", url: "profile2.png" },
  { name: "Profile Picture 3", url: "profile3.png" },
  { name: "Profile Picture 4", url: "profile4.png" },
  { name: "Profile Picture 5", url: "profile5.png" },
  { name: "Profile Picture 6", url: "profile6.png" },
  { name: "Profile Picture 7", url: "profile7.png" },
  { name: "Profile Picture 8", url: "profile8.png" },
  { name: "Profile Picture 9", url: "profile9.png" },
];

export default Settings;
