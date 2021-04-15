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
import useStorage from "../../Firebase/useStorage";

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
  "Vacation",
  "Watersports",
  "Climbing",
  "Food",
];

const useStyles = makeStyles(() => ({
  formControl: {
    width: "100%",
    marginBottom: 20,
    marginRight: 50,
  },
  buttonColor: {
    backgroundColor: "#ffb74d",
    "&:hover": {
      background: "#ffa726",
    },
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

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);

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

  const onChangeImage = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles) {
      setFiles(files.concat(selectedFiles));
    }
  };

  useEffect(() => {
    const getLocations = async () => {
      const url = `/api/user/location/${userData.user.username}`;
      await Axios.get(url)
        .then((response) => {
          setLocations(response.data.data);
        })
        .catch(() => {});

      setFinished(true);
    };

    const getBadges = async () => {
      const url = `/api/badge/all`;
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
      images,
    };
    const url = `/api/post`;
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
    <div>
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
                <TextField
                  {...params}
                  label="Select Badge"
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
                  <input
                    type="file"
                    hidden
                    onChange={onChangeImage}
                    multiple="multiple"
                    accept="image/*"
                  />
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className={styles.submit}>
                <Button
                  variant="contained"
                  disableElevation
                  type="submit"
                  className={classes.buttonColor}
                >
                  Post
                </Button>
              </div>
            </Grid>
            {files.map((file, i) => (
              <UploadImage
                file={file}
                images={images}
                setImages={setImages}
                uploadedFiles={uploadedFiles}
                setUploadedFiles={setUploadedFiles}
                key={`${file.name}${i}`}
              />
            ))}
          </Grid>
        </form>
      </Paper>
      <br />
      <br />
    </div>
  );
};

const UploadImage = ({
  file,
  images,
  setImages,
  uploadedFiles,
  setUploadedFiles,
}) => {
  const { progress, url } = useStorage(file, uploadedFiles);

  useEffect(() => {
    if (url) {
      const allImages = images;
      allImages.push(url);
      setImages(allImages);

      const allNames = uploadedFiles;
      allNames.push(file.name);
      setUploadedFiles(allNames);
    }
  }, [url]);

  return (
    <Grid item xs={12} key={file.name}>
      <Typography variant="subtitle1">{file.name}</Typography>
      <div
        className={styles.progressBar}
        style={{ width: progress + "%" }}
      ></div>
    </Grid>
  );
};

export default AddActivity;
