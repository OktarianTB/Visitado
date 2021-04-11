import React, { useState, useContext } from "react";
import { Button, TextField, Typography, Paper } from "@material-ui/core/";
import UserContext from "../../Utils/UserContext";
import Axios from "axios";
import styles from "./AddBadges.module.css";

const AddBadges = () => {
  const { userData } = useContext(UserContext);

  const [badgeCategory, setBadgeCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [wikipedia, setWikipedia] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");

  const onChangeBadgeCategory = (e) => {
    setBadgeCategory(e.target.value);
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const onChangeWikipedia = (e) => {
    setWikipedia(e.target.value);
  };

  const onChangeLongitude = (e) => {
    setLongitude(parseFloat(e.target.value));
  };

  const onChangeLatitude = (e) => {
    setLatitude(parseFloat(e.target.value));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const urlLocation = "https://visitado-server.herokuapp.com/user/location";
    const urlBadge = "https://visitado-server.herokuapp.com/badge/items";
    const newLocation = {
      name: title,
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
    };
    const headers = {
      "x-auth-token": userData.token,
    };

    if (latitude === "" || longitude === "") {
      const badge = {
        title,
        badge_category: badgeCategory,
        description,
        wikipedia_url: wikipedia,
      };

      await Axios.post(urlBadge, badge, { headers })
        .then((res) => {
          console.log(`Added badge: ${res.data.data.title}`);
          resetTextboxes();
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      await Axios.post(urlLocation, newLocation, { headers })
        .then(async (response) => {
          console.log(`Added location: ${response.data.data.name}`);

          const badge = {
            title,
            badge_category: badgeCategory,
            description,
            wikipedia_url: wikipedia,
            location: response.data.data._id,
          };

          await Axios.post(urlBadge, badge, { headers })
            .then((res) => {
              console.log(`Added badge: ${res.data.data.title}`);
              resetTextboxes();
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const resetTextboxes = () => {
    setTitle("");
    setDescription("");
    setWikipedia("");
    setLatitude("");
    setLongitude("");
  };

  return (
    <Paper className={styles.paper}>
      <Typography variant="h5" align="center">
        Add a Badge
      </Typography>
      <form onSubmit={onSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="badgecategory"
          label="Badge Category"
          name="badgecategory"
          value={badgeCategory}
          onChange={onChangeBadgeCategory}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="title"
          label="Title"
          name="title"
          value={title}
          onChange={onChangeTitle}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="description"
          label="Description"
          name="description"
          value={description}
          onChange={onChangeDescription}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="wikipedia"
          label="Wikipedia URL"
          name="wikipedia"
          value={wikipedia}
          onChange={onChangeWikipedia}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="longitude"
          label="Longitude"
          name="longitude"
          value={longitude}
          onChange={onChangeLongitude}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="latitude"
          label="Latitude"
          name="latitude"
          value={latitude}
          onChange={onChangeLatitude}
        />
        <br />
        <Button
          type="submit"
          fullWidth
          disableElevation
          variant="contained"
          color="primary"
          style={{ marginTop: 30 }}
        >
          Add
        </Button>
      </form>
    </Paper>
  );
};

export default AddBadges;
