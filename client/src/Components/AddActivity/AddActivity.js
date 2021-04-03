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
  const [activity, setActivity] = useState("");
  const [badge, setBadge] = useState("");
  const [badges, setBadges] = useState([]);
  const [postLocation, setPostLocation] = useState("");
  const { userData } = useContext(UserContext);
  const [locations, setLocations] = useState([]);
  const [finished, setFinished] = useState(false);

  const handleActivityChange = (event, value) => {
    setActivity(value);
    console.log(value);
  };

  const handleBadgeChange = (event, value) => {
    setBadge(value);
    console.log(value);
  };

  const handleLocationChange = (event, value) => {
    setPostLocation(value);
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
            options={badges}
            getOptionLabel={(badge) => badge.title}
            className={classes.formControl}
            onChange={handleBadgeChange}
            renderInput={(params) => (
              <TextField {...params} label="Select Badge" variant="outlined" />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Autocomplete
            id="combo-box-demo"
            openOnFocus
            options={locations}
            getOptionLabel={(loc) => loc.name}
            className={classes.formControl}
            onChange={handleLocationChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select of my Locations"
                variant="outlined"
              />
            )}
          />
        </Grid>
      </Grid>
      <Typography variant="subtitle1" align="center">
        or add a location on the map
      </Typography>
      <br />
      {finished ? (
        <MapContainer height={"30Vh"} settings={mapSettings(locations, true)} />
      ) : (
        <div></div>
      )}
      <br />
      <TextField
        label="Post Title"
        id="outlined-margin-normal"
        margin="normal"
        variant="outlined"
        value="My Super Cool Trip"
        fullWidth
        className={styles.textfield}
      />
      <TextField
        label="Post Content"
        id="outlined-margin-normal"
        multiline
        rows={3}
        margin="normal"
        variant="outlined"
        value="Hi, I'm writing about my super cool trip!"
        fullWidth
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
            <Button variant="contained" color="primary" disableElevation>
              Post
            </Button>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AddActivity;
