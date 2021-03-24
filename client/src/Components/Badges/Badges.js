import React, { useState, useEffect } from "react";
import {
  Typography,
  CardActionArea,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  MenuItem,
  Select,
  FormControl,
} from "@material-ui/core/";
import styles from "./Badges.module.css";
import Layout from "../Layout/Layout";

import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const Badges = () => {
  return <Layout Page={Page} />;
};

const Page = () => {
  const [location, setLocation] = useState("Hong Kong");

  const handleChange = (event) => {
    setLocation(event.target.value);
  };

  return (
    <div className={styles.main}>
      <FormControl variant="outlined">
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={location}
          onChange={handleChange}
        >
          <MenuItem value={"Hong Kong"}>
            <Typography variant="h4" component="h4">
              Hong Kong
            </Typography>
          </MenuItem>
          <MenuItem value={"France"}>
            <Typography variant="h4" component="h4">
              France
            </Typography>
          </MenuItem>
          <MenuItem value={"United States"}>
            <Typography variant="h4" component="h4">
              United States
            </Typography>
          </MenuItem>
        </Select>
      </FormControl>
      <Carousel />

      <Typography variant="h4" component="h4">
        World
      </Typography>
      <Carousel />
    </div>
  );
};

const Carousel = () => {
  const [index, setIndex] = useState(0);
  const numBadges = 6;
  const badgeList = [
    { title: "Hikes", completed: "0", total: "22" },
    { title: "Skyscrapers", completed: "5", total: "5" },
    { title: "Monuments", completed: "3", total: "3" },
    { title: "Food", completed: "1", total: "3" },
    { title: "Transport", completed: "0", total: "13" },
    { title: "Activities", completed: "10", total: "12" },
  ];
  const [currentBadges, setCurrentBadges] = useState([
    badgeList[0],
    badgeList[1],
    badgeList[2],
    badgeList[3],
  ]);

  const clickArrow = (direction) => {
    const increment = direction === "left" ? -1 : 1;
    const newIndex = (index + increment + numBadges) % numBadges;
    setIndex(newIndex);

    let newBadges = [];
    for (var i = newIndex; i < newIndex + 4; i++) {
      newBadges.push(badgeList[i % numBadges]);
    }
    
    setCurrentBadges(newBadges);
  };

  return (
    <div>
      <div className={styles.carousel}>
        <IconButton
          size="medium"
          color="inherit"
          onClick={() => clickArrow("left")}
        >
          <ChevronLeftIcon />
        </IconButton>

        {currentBadges.map((badge) => (
          <Badge
            key={badge.title}
            title={badge.title}
            completed={badge.completed}
            total={badge.total}
          />
        ))}

        <IconButton
          size="medium"
          color="inherit"
          onClick={() => clickArrow("right")}
        >
          <ChevronRightIcon />
        </IconButton>
      </div>
    </div>
  );
};

const Badge = ({ title, completed, total }) => {
  return (
    <Card className={styles.card}>
      <CardActionArea>
        <CardMedia
          className={styles.media}
          image="https://source.unsplash.com/random/800x600"
          title="Image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          {completed === total ? (
            <CheckCircleIcon style={{ float: "right", color: "#66bb6a" }} />
          ) : (
            <div></div>
          )}

          <Typography variant="subtitle1" color="textSecondary" component="p">
            {completed}/{total} Completed
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Badges;
