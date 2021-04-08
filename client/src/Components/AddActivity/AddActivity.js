import React, { useState, useEffect, useContext } from "react";
import { Typography, Paper, TextField, Grid, Button } from "@material-ui/core/";
import styles from "./AddActivity.module.css";
import CreateIcon from "@material-ui/icons/Create";
import Layout from "../Layout/Layout";
import MapContainer from "../Maps/Map";
import mapSettings from "../Maps/MapSettings";
import UserContext from "../../Utils/UserContext";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";

const AddActivity = () => {
  return <Layout Page={Page} />;
};

const activities = [
  "Hiking",
  "City",
  "Beach",
  "Animals",
  "Bicycling",
  "Walk",
  "DIY",
  "Home",
  "Friends",
  "Family",
];

const useStyles = makeStyles(() => ({
  formControl: {
    width: "100%",
    marginBottom: 20,
    marginRight: 50,
  },
}));

const Page = () => {
  const classes = useStyles();
  const { userData } = useContext(UserContext);
  const [activity, setActivity] = useState("");
  const [badge, setBadge] = useState(null);
  const [badges, setBadges] = useState([]);
  const [postLocation, setPostLocation] = useState(null);
  const [locations, setLocations] = useState([]);
  const [finished, setFinished] = useState(false);

  const [postTitle, setPostTitle] = useState("");
  const [postTitleError, setPostTitleError] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postContentError, setPostContentError] = useState("");

  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const handleActivityChange = (event, value) => {
    setActivity(value);
  };

  const handleBadgeChange = (event, value) => {
    setBadge(value);
  };

  const handleLocationChange = (event, value) => {
    setPostLocation(value);
    console.log(value);
  };

  const onChangePostTitle = (e) => {
    const title = e.target.value;
    setPostTitle(title);
    setPostTitleError("");
  };

  const onChangePostContent = (e) => {
    const content = e.target.value;
    setPostContent(content);
    setPostContentError("");
  };

  const onAddedLocation = (response) => {
    const loc = {
      coordinates: response.data.data.location.coordinates,
      name: response.data.data.name,
      _id: response.data.data._id,
    };
    const newLocations = locations;
    newLocations.push(loc);
    setLocations(newLocations);
    setPostLocation(loc);
  };

  useEffect(() => {
    const getLocations = async () => {
      const url = `http://127.0.0.1:5000/user/location/${userData.user.username}`;
      await Axios.get(url)
        .then((response) => {
          setLocations(response.data.data);
        })
        .catch(() => {});

      setFinished(true);
    };

    const getBadges = async () => {
      const url = `http://127.0.0.1:5000/badge/all`;
      await Axios.get(url)
        .then((response) => {
          setBadges(response.data.data);
        })
        .catch(() => {});
    };

    getLocations();
    getBadges();
  }, []);

  const createPost = async (e) => {
    e.preventDefault();

    let errors = false;
    if (postTitle.length < 5 || postTitle.length > 100) {
      setPostTitleError("Title must be between 5 and 100 characters");
      errors = true;
    }
    if (postContent.length < 20 || postContent.length > 500) {
      setPostContentError("Content must be between 20 and 500 characters");
      errors = true;
    }

    if (errors) {
      return;
    }

    const badgeId = badge ? badge._id : null;
    const newPost = {
      activity,
      title: postTitle,
      content: postContent,
      location: postLocation ? postLocation._id : null,
      badge: badgeId,
    };
    const url = "http://127.0.0.1:5000/post";
    const headers = {
      "x-auth-token": userData.token,
    };

    await Axios.post(url, newPost, { headers })
      .then((response) => {
        enqueueSnackbar(`Added new post!`, {
          variant: "success",
          preventDuplicate: true,
          autoHideDuration: 2000,
        });
        history.push(`/profile/${userData.user.username}`);
      })
      .catch(() => {
        enqueueSnackbar(`Unable to add the post.`, {
          variant: "info",
          preventDuplicate: true,
          autoHideDuration: 2000,
        });
      });
  };

  return (
    <Paper className={styles.paper}>
      <div className={styles.title}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Add Activity <CreateIcon />
        </Typography>
      </div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Autocomplete
            id="combo-box-demo"
            openOnFocus
            options={activities}
            getOptionLabel={(act) => act}
            className={classes.formControl}
            onChange={handleActivityChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Activity"
                variant="outlined"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Autocomplete
            id="combo-box-demo"
            openOnFocus
            value={postLocation}
            options={locations}
            getOptionLabel={(loc) => loc.name}
            className={classes.formControl}
            onChange={handleLocationChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select one of my Locations"
                variant="outlined"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Autocomplete
            id="combo-box-demo"
            openOnFocus
            options={badges}
            getOptionLabel={(badge) => badge.title}
            className={classes.formControl}
            onChange={handleBadgeChange}
            renderInput={(params) => (
              <TextField {...params} label="Select Badge" variant="outlined" />
            )}
          />
        </Grid>
      </Grid>
      <Typography variant="subtitle1" align="center">
        or add a location on the map
      </Typography>
      <br />
      {finished ? (
        <MapContainer
          height={"30Vh"}
          settings={mapSettings(
            [{ color: "orange", locations, button: false }],
            true,
            2,
            [0, 40],
            onAddedLocation
          )}
        />
      ) : (
        <div></div>
      )}
      <br />
      <form onSubmit={createPost}>
        <TextField
          label="Post Title"
          id="outlined-margin-normal"
          margin="normal"
          variant="outlined"
          value={postTitle}
          onChange={onChangePostTitle}
          fullWidth
          className={styles.textfield}
          error={postTitleError ? true : false}
          helperText={postTitleError}
        />
        <TextField
          label="Post Content"
          id="outlined-margin-normal"
          multiline
          rows={3}
          margin="normal"
          variant="outlined"
          value={postContent}
          onChange={onChangePostContent}
          fullWidth
          error={postContentError ? true : false}
          helperText={postContentError}
        />

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <div className={styles.upload}>
              <Button variant="contained" component="label">
                Upload Images
                <input type="file" hidden />
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className={styles.submit}>
              <Button
                variant="contained"
                color="primary"
                disableElevation
                type="submit"
              >
                Post
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default AddActivity;
