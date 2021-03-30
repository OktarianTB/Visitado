import React, { useState } from "react";
import { Typography, Paper, TextField, Grid, Button } from "@material-ui/core/";
import styles from "./AddActivity.module.css";
import CreateIcon from "@material-ui/icons/Create";
import Layout from "../Layout/Layout";
import SelectForm from "../Forms/SelectForm";
import MapContainer from "../Maps/Map";

const AddActivity = () => {
  return <Layout Page={Page} />;
};

const activities = ["Hiking", "City", "Beach", "Animals", "Bicycling"];
const badges = ["IFC Tower", "ICC Tower", "HSBC Tower"];

const Page = () => {
  const [activity, setActivity] = useState("");
  const [badge, setBadge] = useState("");

  const handleActivityChange = (event) => {
    setActivity(event.target.value);
  };

  const handleBadgeChange = (event) => {
    setBadge(event.target.value);
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
          <SelectForm
            value={activity}
            handleChange={handleActivityChange}
            list={activities}
            title="Select Activity"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <SelectForm
            value={badge}
            handleChange={handleBadgeChange}
            list={badges}
            title="Select Badge"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <SelectForm
            value={badge}
            handleChange={handleBadgeChange}
            list={badges}
            title="Select of my Locations"
          />
        </Grid>
      </Grid>
      <Typography variant="subtitle1" align="center">
        or add a location on the map
      </Typography>
      <br />
      <MapContainer height={"30Vh"} />
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
