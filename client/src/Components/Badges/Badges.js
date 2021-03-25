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
import useWindowDimensions from "../../Utils/WindowSize";

import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const Badges = () => {
  return <Layout Page={Page} />;
};

const getNumBadges = (width) => {
  let num = 4;
  if (width < 900) num = 1;
  else if (width < 1200) num = 2;
  else if (width < 1400) num = 3;
  return num;
};

const Page = () => {
  const { width } = useWindowDimensions();
  const [location, setLocation] = useState("Hong Kong");
  const [badgesOnScreen, setBadgesOnScreen] = useState(getNumBadges(width));

  const handleChange = (event) => {
    setLocation(event.target.value);
  };

  useEffect(() => {
    console.log(width, getNumBadges(width));
    setBadgesOnScreen(getNumBadges(width));
  }, [width]);

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
      <Carousel badgesOnScreen={badgesOnScreen} />

      <Typography variant="h4" component="h4">
        World
      </Typography>
      <Carousel badgesOnScreen={badgesOnScreen} />
      <br />
      <Typography variant="caption" display="block" gutterBottom align="center">
        Icons made by{" "}
        <a href="https://www.freepik.com" title="Freepik">
          Freepik
        </a>{" "}
        and{" "}
        <a
          href="https://www.flaticon.com/authors/smashicons"
          title="Smashicons"
        >
          Smashicons
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          Flaticon
        </a>
        .
      </Typography>
    </div>
  );
};

const Carousel = ({ badgesOnScreen }) => {
  const [index, setIndex] = useState(0);
  const numBadges = 6;
  const badgeList = [
    {
      title: "Hikes",
      completed: "0",
      total: "22",
      image: "hiking.png",
      backgroundColor: "red",
    },
    {
      title: "Skyscrapers",
      completed: "5",
      total: "5",
      image: "skyscrapers.png",
      backgroundColor: "red",
    },
    {
      title: "Monuments",
      completed: "3",
      total: "3",
      image: "ship.png",
      backgroundColor: "red",
    },
    {
      title: "Food",
      completed: "1",
      total: "3",
      image: "noodles.png",
      backgroundColor: "red",
    },
    {
      title: "Transport",
      completed: "0",
      total: "13",
      image: "train.png",
      backgroundColor: "red",
    },
    {
      title: "Activities",
      completed: "10",
      total: "12",
      image: "laugh.png",
      backgroundColor: "red",
    },
  ];

  const [currentBadges, setCurrentBadges] = useState(
    badgeList.slice(0, badgesOnScreen)
  );

  useEffect(() => {
    let newBadges = [];
    for (var i = index; i < index + badgesOnScreen; i++) {
      newBadges.push(badgeList[i % numBadges]);
    }
    setCurrentBadges(newBadges);
    // eslint-disable-next-line
  }, [badgesOnScreen]);

  const clickArrow = (direction) => {
    const increment = direction === "right" ? -1 : 1;
    const newIndex = (index + increment + numBadges) % numBadges;
    setIndex(newIndex);

    let newBadges = [];
    for (var i = newIndex; i < newIndex + badgesOnScreen; i++) {
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
            image={badge.image}
            backgroundColor={badge.backgroundColor}
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

const Badge = ({ title, completed, total, image, backgroundColor }) => {
  return (
    <Card className={styles.card}>
      <CardActionArea>
        <CardMedia
          className={styles.media}
          style={{ backgroundColor: "#eeeeee" }}
        >
          <img src={image} className={styles.badgeImage} alt={title} />
        </CardMedia>
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
