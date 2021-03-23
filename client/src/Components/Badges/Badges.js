import React from "react";
import clsx from "clsx";
import {
  Grid,
  Typography,
  CardActionArea,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Paper,
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
  return (
    <div className={styles.main}>
      <Carousel name="Hong Kong" />
      <Carousel name="World" />
    </div>
  );
};

const Carousel = ({ name }) => {
  return (
    <div>
      <Typography variant="h4" component="h4">
        {name}
      </Typography>

      <div className={styles.carousel}>
        <IconButton size="medium" color="inherit">
          <ChevronLeftIcon />
        </IconButton>

        <Badge title="Hikes" completed="0" total="22" />
        <Badge title="Skyscrapers" completed="5" total="5" />
        <Badge title="Monuments" completed="3" total="7" />
        <Badge title="Food" completed="6" total="7" />

        <IconButton size="medium" color="inherit">
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
